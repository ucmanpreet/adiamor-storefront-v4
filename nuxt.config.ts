import { resolve } from 'node:path'
import svgLoader from 'vite-svg-loader'
import customRoutes from './routes.js'
import { writeFile } from 'node:fs/promises'
import { STATIC_ROUTES } from './app/utils/staticRoutes.js'
import { redirectUrls } from './app/utils/menu.js'
import { head } from './config/head.mjs'
import { runtimePublic } from './config/runtime.mjs'

const withSlash = (p: string) => (p === '/' || p.endsWith('/') ? p : `${p}/`)
const noSlash = (p: string) => (p === '/' ? p : p.replace(/\/+$/, ''))
// legacy URL -> new URL (utils/menu.js). Real 301s: routeRules (pre-rendered redirect pages) + `_redirects` file
const redirectMap: Record<string, string> = Object.fromEntries(Object.entries(redirectUrls).map(([from, to]) => [noSlash(from), to as string]))
// Redirect only the bare URL (Nuxt 2 middleware compared `fullPath`): `/your-setting/?setting=..&diamond=..` is the
// bundle review page. routeRules and `_redirects` match the path regardless of the query, so these stay out of them
// and are handled by route middleware `redirect.global.js` alone.
const queryAwareRedirects = ['/your-setting']
const pathRedirectMap = Object.fromEntries(Object.entries(redirectMap).filter(([from]) => !queryAwareRedirects.includes(from)))
const staticPaths: string[] = customRoutes.map((r: any) => r.path).filter((p: string) => !/[:*]/.test(p))

export default defineNuxtConfig({
  compatibilityDate: '2026-10-01',
  ssr: true, // static target: pre-rendered by `nuxt generate`
  devtools: { enabled: false },
  srcDir: 'app',
  devServer: { host: '0.0.0.0', port: 3000 },

  modules: ['@pinia/nuxt', '@nuxtjs/tailwindcss', '@nuxt/image'],
  // Components are imported explicitly in the source (no directory auto-import)
  components: { dirs: [] },
  // <model-viewer> (Google web component, loaded from CDN)
  vue: { compilerOptions: { isCustomElement: (tag: string) => tag === 'model-viewer' } },
  css: ['~/assets/css/main.css'],

  // third-party scripts whose env var is unset (no `src`/inline code) are skipped
  app: { head: { ...head, script: head.script.filter((s) => s.src || s.innerHTML) } },

  runtimeConfig: { public: runtimePublic },

  tailwindcss: { configPath: '~~/tailwind.config.js' },

  image: {
    providers: {
      cdn: { provider: '~~/providers/cdn.js', options: { baseURL: 'https://cdn.adiamor.com' } },
    },
  },

  vite: {
    vue: {
      template: {
        // Vue's default also rewrites `srcset`, which splits CDN URLs on the comma in `?tr=w-1,h-2` and breaks the build.
        // `src` is still processed.
        transformAssetUrls: { video: ['src', 'poster'], source: ['src'], img: ['src'], image: ['xlink:href', 'href'], use: ['xlink:href', 'href'] },
      },
    },
    plugins: [// keep viewBox: svgo's default preset strips it and icons stop scaling (nuxt-svg-loader kept it)
      svgLoader({ defaultImport: 'component', svgoConfig: { plugins: [{ name: 'preset-default', params: { overrides: { removeViewBox: false } } }] } })],
    // Nuxt 2: terser `drop_console` in production
    esbuild: { drop: process.env.NODE_ENV === 'production' ? ['console', 'debugger'] : [] },
  },

  hooks: {
    // `_redirects` (Cloudflare Pages / Netlify format): real 301s for the legacy URL map (utils/menu.js).
    // Missing trailing slashes: static hosts already redirect `/page` -> `/page/` for pre-rendered folders
    // (a explicit `/page /page/` rule would be flagged as a loop on Cloudflare Pages); other hosts -> Worker;
    // client-side navigation -> route middleware `00.trailing-slash.global.js`.
    'nitro:init'(nitro: any) {
      nitro.hooks.hook('prerender:done', async () => {
        const lines = [
          ...Object.entries(pathRedirectMap).flatMap(([from, to]) => [`${from} ${to} 301`, `${withSlash(from)} ${to} 301`]),
        ]
        await writeFile(`${nitro.options.output.publicDir}/_redirects`, `${lines.join('\n')}\n`)
      })
    },
    // routes.js stays the single source of truth for routes (file-based routing is discarded, as in Nuxt 2)
    'pages:extend'(pages) {
      pages.splice(0)
      // prototype page for the virtual-scroller tests (dev/test only)
      if (process.env.NODE_ENV !== 'production') {
        pages.push({ name: 'protoVirtualScroller', path: '/proto/virtual-scroller', file: resolve(import.meta.dirname, 'app/pages/proto/virtual-scroller.vue') })
      }
      customRoutes.forEach((route: any) => {
        const page: any = {
          name: route.name,
          path: route.path === '*' ? '/:pathMatch(.*)*' : route.path,
          file: resolve(import.meta.dirname, 'app', route.component),
          meta: route.name === 'searchPage' ? { ...(route.meta || {}), requiresMeta: true } : route.meta,
        }
        // Nuxt 2 `asyncData` redirect guard for the thank-you page -> route middleware
        if (route.name === 'thankyouPage') page.middleware = ['thankyou']
        if (route.alias) page.alias = Array.isArray(route.alias) ? route.alias : [route.alias]
        pages.push(page)
      })
    },
  },

  // Cart, account and auth pages are fully client-state driven (persisted cart, cookies, token) and not indexable:
  // render them client-side only. Vue 3 does not patch mismatched attributes on hydration like Vue 2 did.
  routeRules: {
    ...Object.fromEntries(Object.entries(pathRedirectMap).flatMap(([from, to]) => [
      [from, { redirect: { to, statusCode: 301 } }],
      [withSlash(from), { redirect: { to, statusCode: 301 } }],
    ])),
    '/cart/**': { ssr: false },
    '/auth/**': { ssr: false },
    '/my-account/**': { ssr: false },
    '/wishlist/**': { ssr: false },
    '/thankyou/**': { ssr: false },
    // Dynamic URLs are served from the SPA fallback (200.html) in production, never pre-rendered
    '/search/**': { ssr: false },
    ...Object.fromEntries(
      [...new Set(Object.values(STATIC_ROUTES).map((u: any) => String(u).match(/^\/([\w-]+)\/search\//i)?.[1]).filter(Boolean))].map((seg) => [`/${(seg as string).toLowerCase()}/search/**`, { ssr: false }]),
    ),
  },

  nitro: {
    // Same as Nuxt 2 `generate`: every explicit static route is pre-rendered, dynamic URLs fall back to the SPA shell (200.html)
    prerender: {
      routes: staticPaths.map(withSlash).filter((p: string) => !(noSlash(p) in redirectMap)),
      crawlLinks: false,
      failOnError: false,
    },
  },
})
