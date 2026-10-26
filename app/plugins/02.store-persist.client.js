// Persists parts of the Pinia stores to localStorage under the SAME key and paths the Nuxt 2 vuex-persistedstate
// used (`persistDataStorage`), so returning visitors keep their cart, wishlist, filters and bundle.
const PERSIST_KEY = 'persistDataStorage'
const MAIN_PATHS = [
  'compareList', 'wishList', 'diamondsFilters', 'userData', 'authenticated', 'address', 'productAttribute',
  'cartItems', 'loggedInWishList', 'wishListData', 'viewMode', 'phoneNumber', 'attributeConfig',
  'ordered_items', 'countryList', 'usStateList', 'comparePairList',
]

export default defineNuxtPlugin(() => {
  const main = useMainStore()
  const bundle = useBundleStore()

  try {
    const saved = JSON.parse(localStorage.getItem(PERSIST_KEY) || 'null')
    if (saved) {
      MAIN_PATHS.forEach((path) => { if (saved[path] !== undefined) main[path] = saved[path] })
      if (saved.bundle) bundle.$patch(saved.bundle)
    }
  } catch (e) {
    console.error('Failed to restore persisted state', e)
  }

  let timer = null
  const persist = () => {
    clearTimeout(timer)
    timer = setTimeout(() => {
      try {
        const out = Object.fromEntries(MAIN_PATHS.map((path) => [path, main[path]]))
        out.bundle = { ring: bundle.ring, earring: bundle.earring, necklace: bundle.necklace }
        localStorage.setItem(PERSIST_KEY, JSON.stringify(out))
      } catch (e) {
        console.error('Failed to persist state', e)
      }
    }, 50)
  }
  main.$subscribe(persist, { detached: true })
  bundle.$subscribe(persist, { detached: true })
})
