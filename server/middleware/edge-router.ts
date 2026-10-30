// Port of public/_worker.js (the Cloudflare Pages edge router) into Nitro, so one Nuxt Worker does it all.
// Order matters and follows the old worker: sitemap, your-setting slash, blog proxy, KV redirects, junk URLs,
// dynamic redirects from the API, lowercase canonical redirect, removed-diamond redirect.
// SEO meta injection (HTMLRewriter) is gone on purpose: product/search/landing pages render their own meta during SSR.

const CATEGORY_PREFIXES = [
  '/lab-diamonds/', '/diamonds/', '/engagement-rings/', '/wedding-rings/', '/earrings/',
  '/pendants/', '/bracelets/', '/jewelry/', '/necklaces/', '/gifts/',
]
const DIAMOND_PREFIXES = ['/lab-diamonds/', '/diamonds/']
const JUNK_EXTENSIONS = /\.(html|htm|aspx|php|jsp|cgi)$/i
const JUNK_PREFIXES = ['/query/', '/home/detailredirect', '/pdfview/', '/diamond/imagerequest']
// Build output, dev server and framework internals: never rewritten or redirected
const SKIP_PREFIXES = ['/_nuxt', '/_ipx', '/_payload', '/__', '/@', '/node_modules', '/.well-known']

const S3_SITEMAP_ORIGIN = 'https://adiamor-sitemap-prod.s3.us-west-2.amazonaws.com'
const BLOG_ORIGIN = 'https://wordpress-blog-origin.adiamor.com'
const BLOG_PREFIX = '/blog'
const REDIRECT_API_URL = 'https://afd.adiamor.com/api/redirect-lookup'

// The old worker asked the API once per request; keep answers for a few minutes per isolate to spare it
const REDIRECT_CACHE_TTL = 5 * 60 * 1000
const redirectCache = new Map<string, { at: number, value: { to: string, status: number } | null }>()

const hopByHop = ['connection', 'keep-alive', 'proxy-authenticate', 'proxy-authorization', 'te', 'trailer', 'transfer-encoding', 'upgrade']

function withSecurityHeaders(res: Response) {
  const out = new Response(res.body, res)
  out.headers.set('X-Frame-Options', 'SAMEORIGIN')
  out.headers.set('Content-Security-Policy', "frame-ancestors 'self'")
  return out
}

function redirect(location: string, status = 301) {
  return new Response(null, { status, headers: { Location: location } })
}

// Removed diamond (SEO API 404) -> category search page filtered by what the slug says
function buildDiamondSearchRedirect(path: string) {
  const prefix = DIAMOND_PREFIXES.find((p) => path.startsWith(p))
  if (!prefix) return null
  const slugPart = path.substring(prefix.length).split('/')[0]
  const match = slugPart.match(/^(?:([\d.]+)-ct-)?([\w])-([\w]+)-([\w-]+)-cut-([\w]+)-diamond$/i)
  if (!match) return null
  const [, carat, color, clarity, cut, shape] = match
  const params = new URLSearchParams({
    diamond_shape: shape.toLowerCase(),
    diamond_color_grade: color.toLowerCase(),
    diamond_clarity_grade: clarity.toLowerCase(),
    diamond_cut_grade: cut.toLowerCase(),
  })
  if (carat) {
    const n = parseFloat(carat)
    if (!isNaN(n)) {
      const min = Math.max(0.01, Math.floor(n * 0.8 * 100) / 100)
      const max = Math.ceil(n * 1.2 * 100) / 100
      params.set('diamond_carat_weight', JSON.stringify({ min, max }))
    }
  }
  const searchPath = prefix === '/lab-diamonds/' ? '/diamonds/search/lab-grown' : '/diamonds/search'
  return `${searchPath}?${params.toString()}`
}

async function lookupDynamicRedirect(path: string) {
  const normalized = path.replace(/^\/+|\/+$/g, '')
  const lastSegment = normalized.split('/').pop()
  const variants = Array.from(new Set([normalized, '/' + normalized, lastSegment, '/' + lastSegment]))
  for (const urlKey of variants) {
    if (!urlKey) continue
    const cached = redirectCache.get(urlKey)
    if (cached && Date.now() - cached.at < REDIRECT_CACHE_TTL) {
      if (cached.value) return cached.value
      continue
    }
    let value: { to: string, status: number } | null = null
    try {
      const res = await fetch(REDIRECT_API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ url_key: urlKey }),
      })
      if (!res.ok) continue // errors (429 etc.) are not cached
      const data: any = await res.json()
      if (data?.action === 'redirect' && data.redirectTo) value = { to: data.redirectTo, status: data.status || 301 }
    } catch (e) {
      console.error('Error in URL resolver:', e)
      continue
    }
    redirectCache.set(urlKey, { at: Date.now(), value })
    if (value) return value
  }
  return null
}

export default defineEventHandler(async (event) => {
  const method = event.method
  const url = getRequestURL(event)
  const path = url.pathname

  if (SKIP_PREFIXES.some((p) => path.startsWith(p))) return
  // Every page response, whatever it turns out to be, may not be framed by other sites
  setResponseHeaders(event, { 'X-Frame-Options': 'SAMEORIGIN', 'Content-Security-Policy': "frame-ancestors 'self'" })

  const cfEnv: any = (event.context as any).cloudflare?.env || {}

  // 1. Sitemaps are plain files on S3
  if (path.startsWith('/sitemap.xml') || path.startsWith('/sitemaps')) {
    return fetch(S3_SITEMAP_ORIGIN + path)
  }

  // Force trailing slash for your-setting, keeping the query
  if (path === '/your-setting') return redirect(`/your-setting/${url.search}`)

  // 2. /blog is the WordPress origin
  if (path === BLOG_PREFIX || path.startsWith(BLOG_PREFIX + '/')) {
    const target = new URL(BLOG_ORIGIN)
    target.pathname = path.slice(BLOG_PREFIX.length) || '/'
    target.search = url.search
    const headers = new Headers(getRequestHeaders(event) as Record<string, string>)
    headers.set('X-Origin-Key', cfEnv.CADDY_ORIGIN_SECRET || process.env.CADDY_ORIGIN_SECRET || '')
    headers.set('X-Forwarded-Host', url.host)
    headers.set('X-Forwarded-Proto', 'https')
    headers.delete('host')
    const init: RequestInit = { method, headers, redirect: 'manual' }
    if (method !== 'GET' && method !== 'HEAD') init.body = await readRawBody(event, false)
    const origin = await fetch(target.toString(), init)
    const res = new Response(origin.body, origin)
    hopByHop.forEach((h) => res.headers.delete(h))
    res.headers.delete('X-Origin-Key') // never leak the shared secret
    return withSecurityHeaders(res)
  }

  if (method !== 'GET' && method !== 'HEAD') return

  // 3. Legacy URL -> new URL map in Cloudflare KV (binding REDIRECTS; absent locally, so skipped there)
  if (cfEnv.REDIRECTS) {
    let newPath: string | null = await cfEnv.REDIRECTS.get(path)
    if (newPath) {
      const dirty = /^\/?products?\//i
      if (dirty.test(newPath)) {
        newPath = newPath.replace(dirty, '')
        if (!newPath.startsWith('/')) newPath = '/' + newPath
      }
      const target = new URL(newPath, url.origin)
      target.search = url.search
      target.hash = url.hash
      if (path + url.search !== target.pathname + target.search) return redirect(target.toString())
      console.warn(`Skipping KV self-redirect loop for: ${path}`)
    }
  }

  // 3b. Junk/spam URLs can never be pages
  const lower = path.toLowerCase()
  if (JUNK_EXTENSIONS.test(path) || JUNK_PREFIXES.some((p) => lower.startsWith(p))) {
    setResponseStatus(event, 404)
    setResponseHeader(event, 'X-Robots-Tag', 'noindex')
    return 'Not Found'
  }

  // 4. Simple products with a configurable parent are redirected to the parent (decided by the API)
  const category = CATEGORY_PREFIXES.find((p) => path.startsWith(p))
  const isProductLike = !!category && !path.includes('/search') && path.length > category.length
  if (isProductLike) {
    const hit = await lookupDynamicRedirect(path)
    if (hit) return redirect(hit.to, hit.status)
  }

  // 5. Mixed-case legacy URLs collapse to the lowercase canonical one (after KV/dynamic so mixed-case keys still resolve)
  if (path !== lower) {
    const canonical = new URL(url.toString())
    canonical.pathname = lower
    return redirect(canonical.toString())
  }

  // 6. A removed diamond sends visitors to a filtered search instead of a dead page
  if (isProductLike && DIAMOND_PREFIXES.some((p) => path.startsWith(p))) {
    const base = useRuntimeConfig(event).public.baseUrl as string
    const slug = path.replace(/^\/+|\/+$/g, '')
    try {
      const res = await fetch(`${base}products-seo/?${new URLSearchParams({ ...Object.fromEntries(url.searchParams), slug })}`)
      if (res.status === 404) {
        const target = buildDiamondSearchRedirect(path)
        if (target) return redirect(new URL(target, url.origin).toString())
      }
    } catch (e) {
      console.error('Removed-product check failed:', e)
    }
  }
})
