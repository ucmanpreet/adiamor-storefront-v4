// Was plugins/router.js: back-navigation flag, blocking/non-blocking page meta fetch, cart rule, chunk recovery.
import { STATIC_ROUTES } from '~/utils/staticRoutes'

export default defineNuxtPlugin((nuxtApp) => {
  const router = useRouter()
  const store = useMainStore()
  let isBackNavigation = false

  // vue-router 3 `router.history._startLocation`: URL the visit started at (summary page checks for 'review')
  nuxtApp.provide('startLocation', window.location.pathname + window.location.search + window.location.hash)

  if (!window.__popstateAdded) {
    window.__popstateAdded = true
    window.addEventListener('popstate', () => { isBackNavigation = true })
  }

  // Chunk load failure after a new deploy -> reload to get fresh assets
  nuxtApp.hook('app:chunkError', () => { window.location.reload() })
  window.addEventListener('vite:preloadError', () => { window.location.reload() })

  // vue-router 3 kept the current path for `router.push({ query })`. vue-router 4 rebuilds the path from the
  // route params, which percent-encodes slashes of wildcard params (`/diamonds/search/round/` -> `round%2F`)
  // and drops the trailing slash. Keep the current path for query-only navigations.
  ;['push', 'replace'].forEach((method) => {
    const original = router[method].bind(router)
    router[method] = (to) => {
      if (to && typeof to === 'object' && !to.path && !to.name) to = { ...to, path: router.currentRoute.value.path }
      return original(to)
    }
  })

  router.beforeEach(async (to, from) => {
    to.meta.isBack = isBackNavigation
    isBackNavigation = false

    try {
      if (store.metaPath !== to.path) {
        if (to.meta?.requiresMeta) await store.fetchDynamicMeta(to)
        else store.fetchDynamicMeta(to)
      }
    } catch (e) {
      console.error('Meta fetch failed:', e)
    }

    // Cart edge case: after the thank-you page never go back into the cart
    if ((from.path.includes('/cart') || to.path.includes('/cart')) && from.path === '/thankyou') {
      return STATIC_ROUTES.HOME
    }
  })
})
