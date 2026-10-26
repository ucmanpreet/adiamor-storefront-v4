// Hydration flag + app-wide event bus (Vue 3 removed `$on/$off/$once`).
import mitt from 'mitt'
import { nextTick, ref } from 'vue'

export default defineNuxtPlugin((nuxtApp) => {
  // `$hydrated` flips to true once the client tree is hydrated. Vue 3 does not patch mismatched attributes during
  // hydration (Vue 2 did), so templates that depend on cookies/localStorage render the server value first via this flag.
  // Not `app:mounted`: `vueApp.mount()` returns before async (Suspense) subtrees such as the layout footer are hydrated,
  // so the flag flipped too early and those subtrees rendered cookie values into a server-rendered empty DOM.
  const hydrated = ref(false)
  if (import.meta.client) nuxtApp.hook('app:suspense:resolve', () => { nextTick(() => { hydrated.value = true }) })
  Object.defineProperty(nuxtApp.vueApp.config.globalProperties, '$hydrated', { get: () => hydrated.value })

  // Vue 3 removed $on/$off/$once. One shared emitter keeps every existing event name working
  // (aria-announce, ModalCloseEvent, paymentResponse, addToCartResponse, ...).
  const bus = mitt()
  // Vue 2 `$off(name)` without handler removed all listeners of that event; mitt does the same when handler is omitted.
  nuxtApp.provide('bus', bus)
  // Callbacks outside component context (e.g. PayPal/Bolt SDK handlers) used the Nuxt 2 global `$nuxt`
  if (import.meta.client) window.$bus = bus
})
