// Replacement for @nuxtjs/axios: same instance API used across the app
// ($axios.get/post/delete, $axios.$get convenience helpers, onRequest/onError) so call sites stay unchanged.
import axios from 'axios'
import mixin from '~/mixin/sweetAlert.js'
import { STATIC_ROUTES } from '~/utils/staticRoutes.js'

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig().public
  const instance = axios.create({ baseURL: config.baseUrl })

  ;['get', 'delete', 'head', 'options', 'post', 'put', 'patch'].forEach((method) => {
    instance[`$${method}`] = (...args) => instance[method](...args).then((res) => res && res.data)
  })
  instance.onRequest = (fn) => instance.interceptors.request.use((cfg) => fn(cfg) || cfg)
  instance.onResponse = (fn) => instance.interceptors.response.use((res) => fn(res) || res)
  instance.onError = (fn) => instance.interceptors.response.use(undefined, (err) => fn(err))

  if (import.meta.client) {
    // 429 / network failure handling (was plugins/axiosRequest.js)
    instance.onError((error) => {
      const home = STATIC_ROUTES.HOME || '/'
      const status = error.response?.status
      const probablyRateLimited = status === 429 || (error.message === 'Network Error' && !error.response)

      if (probablyRateLimited && !window.__rateLimitHandled) {
        window.__rateLimitHandled = true
        mixin.methods.createSwalAlert('Too many requests or connection problem. Please try again shortly.', 'error', true)
        if (window.location.pathname !== home) {
          setTimeout(() => { window.location.href = home }, 2000)
        } else {
          window.__rateLimitHandled = false
        }
      }
      return Promise.reject(error)
    })
  }

  nuxtApp.provide('axios', instance)
})
