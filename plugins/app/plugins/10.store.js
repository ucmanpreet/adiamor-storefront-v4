// Pinia <-> legacy `$store` bridge + persistence + `$nuxt.context`.
// - `$store` keeps the Vuex surface (state/getters/commit/dispatch/watch) so 66 components work unchanged.
// - Persistence uses the SAME localStorage key and paths as vuex-persistedstate, so returning visitors keep
//   their cart, wishlist, filters and bundle after the release.
import { watch } from 'vue'
import { useMainStore } from '~/stores/main.js'
import { useBundleStore } from '~/stores/bundle.js'

const PERSIST_KEY = 'persistDataStorage'
const PERSIST_PATHS = [
  'compareList', 'wishList', 'diamondsFilters', 'userData', 'authenticated', 'address', 'productAttribute',
  'cartItems', 'loggedInWishList', 'wishListData', 'viewMode', 'phoneNumber', 'bundle', 'attributeConfig',
  'ordered_items', 'countryList', 'usStateList', 'comparePairList',
]

export default defineNuxtPlugin((nuxtApp) => {
  const main = useMainStore()
  const bundle = useBundleStore()

  const state = new Proxy(main.state, {
    get: (target, key) => (key === 'bundle' ? bundle.state : target[key]),
    has: (target, key) => key === 'bundle' || key in target,
  })

  const store = {
    state,
    getters: main.gettersProxy,
    commit: main.commit,
    dispatch: main.dispatch,
    watch: (getter, cb, options) => watch(() => getter(state, main.gettersProxy), cb, options),
  }

  nuxtApp.provide('store', store)

  // Nuxt 2 `this.$nuxt.context` (used by dispatch('getCart', ...)); `route` must be the plain route object.
  const router = useRouter()
  nuxtApp.context = {
    store,
    app: nuxtApp,
    get $axios() { return nuxtApp.$axios },
    get $cookies() { return nuxtApp.$cookies },
    get $config() { return nuxtApp.$config },
    get route() { return router.currentRoute.value },
    get query() { return router.currentRoute.value.query },
    get params() { return router.currentRoute.value.params },
    redirect: (...args) => router.push(typeof args[0] === 'number' ? args[1] : args[0]),
  }

  if (import.meta.client) {
    // rehydrate (before other plugins read the store, e.g. $userProperties)
    try {
      const saved = JSON.parse(localStorage.getItem(PERSIST_KEY) || 'null')
      if (saved) {
        PERSIST_PATHS.forEach((path) => {
          if (saved[path] === undefined) return
          if (path === 'bundle') Object.assign(bundle.state, saved.bundle)
          else main.state[path] = saved[path]
        })
      }
    } catch (e) {
      console.error('Failed to restore persisted state', e)
    }

    let timer = null
    const persist = () => {
      clearTimeout(timer)
      timer = setTimeout(() => {
        try {
          const out = {}
          PERSIST_PATHS.forEach((path) => {
            out[path] = path === 'bundle' ? bundle.state : main.state[path]
          })
          localStorage.setItem(PERSIST_KEY, JSON.stringify(out))
        } catch (e) {
          console.error('Failed to persist state', e)
        }
      }, 50)
    }
    watch(() => PERSIST_PATHS.map((p) => (p === 'bundle' ? bundle.state : main.state[p])), persist, { deep: true })
  }
})
