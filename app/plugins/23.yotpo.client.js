// Re-initialises Yotpo widgets on every route change (same timing/retry logic as the Nuxt 2 plugin).
export default defineNuxtPlugin((nuxtApp) => {
  const router = useRouter()
  const store = useMainStore()

  const initWidgets = () => {
    setTimeout(() => {
      initYotpoWidgets()
      initLegacyWidgets()
    }, 500)
  }

  const waitForProductAndDOM = () => new Promise((resolve) => {
    const interval = setInterval(() => {
      const productReady = !!store.product
      const domReady = !!document.querySelector('.yotpo.bottomLine')
      if (productReady && domReady) {
        clearInterval(interval)
        resolve()
      }
    }, 100)
  })

  router.afterEach(async (to, from) => {
    // Product pages all share the route name 'all', so compare paths: product -> product must re-init too
    if (to.path === from.path) return
    if (to.name === 'all') {
      await waitForProductAndDOM()
      initWidgets()
    } else {
      initWidgets()
    }
  })

  const initial = () => {
    if (router.currentRoute.value.name === 'all') waitForProductAndDOM().then(initWidgets)
    else initWidgets()
  }
  if (document.readyState === 'loading') window.addEventListener('DOMContentLoaded', initial)
  else initial()
})

function initYotpoWidgets(maxRetries = 10, interval = 1000) {
  let attempts = 0
  const intervalId = setInterval(() => {
    const yotpo = window?.yotpo
    const legacy = window?.yotpoWidgetsContainer
    const yotpoReady = typeof yotpo?.initWidgets === 'function'
    const legacyReady = typeof legacy?.initWidgets === 'function'

    if (yotpoReady) yotpo.initWidgets()
    if (legacyReady) legacy.initWidgets()
    if (yotpoReady || legacyReady) clearInterval(intervalId)

    attempts++
    if (attempts >= maxRetries) {
      console.warn('[Yotpo] Widget init failed after max retries')
      clearInterval(intervalId)
    }
  }, interval)
}

function initLegacyWidgets() {
  if (typeof window.yotpo !== 'undefined' && window.yotpo && window.yotpo.initialized) {
    try {
      new window.Yotpo.API(window.yotpo).refreshWidgets()
    } catch (e) {
      console.warn('[Yotpo] Legacy widget refresh failed', e)
    }
  }
}
