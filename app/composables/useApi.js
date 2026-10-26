// REST client for the storefront API (replaces @nuxtjs/axios). Built on Nuxt's `$fetch` (ofetch):
//   const api = useApi()
//   const body = await api.get('page-information', { query: { type } })      // response body
//   const { status, data } = await api.request('post', 'customer/login', { body })   // status + body
// Errors are ofetch `FetchError`s: `error.status`, `error.data` (response body), `error.message`.
import { STATIC_ROUTES } from '~/utils/staticRoutes.js'
import { createSwalAlert } from '~/composables/useAlert.js'

let countryReadyPromise = null

// Delays GET requests until the visitor country is known, so currency/locale params are right on first load.
// Gives up after 3 s.
const waitForCountry = () => {
  if (countryReadyPromise) return countryReadyPromise
  countryReadyPromise = new Promise((resolve) => {
    if (useCookie('countryData').value?.code) return resolve()
    const store = useMainStore()
    const stop = watch(() => store.countryReady, (ready) => { if (ready) { stop(); resolve() } })
    setTimeout(() => { stop(); resolve() }, 3000)
  })
  return countryReadyPromise
}

export const useApi = () => {
  const nuxtApp = useNuxtApp()
  if (nuxtApp._api) return nuxtApp._api

  const client = $fetch.create({
    baseURL: useRuntimeConfig().public.baseUrl,
    async onRequest({ options }) {
      if (import.meta.client && (options.method || 'GET').toUpperCase() === 'GET') await waitForCountry()
    },
    onResponseError({ response, error }) {
      if (!import.meta.client) return
      // 429 / network failure handling
      const home = STATIC_ROUTES.HOME || '/'
      if (response?.status === 429 && !window.__rateLimitHandled) {
        window.__rateLimitHandled = true
        createSwalAlert('Too many requests or connection problem. Please try again shortly.', 'error', true)
        if (window.location.pathname !== home) setTimeout(() => { window.location.href = home }, 2000)
        else window.__rateLimitHandled = false
      }
    },
    onRequestError() {
      if (!import.meta.client || window.__rateLimitHandled) return
      window.__rateLimitHandled = true
      createSwalAlert('Too many requests or connection problem. Please try again shortly.', 'error', true)
      if (window.location.pathname !== (STATIC_ROUTES.HOME || '/')) setTimeout(() => { window.location.href = STATIC_ROUTES.HOME || '/' }, 2000)
      else window.__rateLimitHandled = false
    },
  })

  const request = async (method, url, opts = {}) => {
    const res = await client.raw(url, { method: method.toUpperCase(), ...opts })
    return { status: res.status, data: res._data, headers: res.headers }
  }
  const body = (method) => (url, opts) => client(url, { method: method.toUpperCase(), ...opts })
  const withBody = (method) => (url, payload, opts) => client(url, { method: method.toUpperCase(), body: payload, ...opts })

  return (nuxtApp._api = {
    request,
    get: body('get'),
    delete: body('delete'),
    post: withBody('post'),
    put: withBody('put'),
    patch: withBody('patch'),
  })
}
