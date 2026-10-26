// Nuxt 2 `router.trailingSlash: true`: every page URL ends with "/" (canonical form used in sitemaps and links).
// Client navigations are normalised here; the real HTTP 301 for direct hits is generated into `_redirects`
// (see nuxt.config.ts) and the Cloudflare Worker.
export default defineNuxtRouteMiddleware((to) => {
  const path = to.path
  if (path === '/' || path.endsWith('/')) return
  if (path.split('/').pop().includes('.')) return // file-like URLs (.xml, .txt, images...)
  return navigateTo({ path: `${path}/`, query: to.query, hash: to.hash }, { redirectCode: 301, replace: true })
})
