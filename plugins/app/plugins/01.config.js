// Nuxt 2 `this.$config` (publicRuntimeConfig) + event bus replacing `$root.$on/$emit` and `$nuxt.$on/$emit`.
import mitt from 'mitt'
import { ref } from 'vue'

export default defineNuxtPlugin((nuxtApp) => {
  // NOTE: Nuxt 4 already exposes `this.$config` as the full runtime config, so Nuxt 2 `this.$config.x`
  // became `this.$config.public.x` (codemod applied to all call sites).

  // `$hydrated` flips to true after the first client render. Vue 3 does not patch mismatched attributes during
  // hydration (Vue 2 did), so templates that depend on cookies/localStorage render the server value first via this flag.
  const hydrated = ref(false)
  if (import.meta.client) nuxtApp.hook('app:mounted', () => { hydrated.value = true })
  Object.defineProperty(nuxtApp.vueApp.config.globalProperties, '$hydrated', { get: () => hydrated.value })

  // Vue 3 removed $on/$off/$once. One shared emitter keeps every existing event name working
  // (aria-announce, ModalCloseEvent, paymentResponse, addToCartResponse, ...).
  const bus = mitt()
  // Vue 2 `$off(name)` without handler removed all listeners of that event; mitt does the same when handler is omitted.
  nuxtApp.provide('bus', bus)
  // Callbacks outside component context (e.g. PayPal/Bolt SDK handlers) used the Nuxt 2 global `$nuxt`
  if (import.meta.client) window.$bus = bus
})
