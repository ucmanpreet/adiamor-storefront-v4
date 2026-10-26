// Storefront REST helpers on top of `useApi()` (native `$fetch`, no axios instance argument).
// Contract kept from the Nuxt 2 client: failures resolve to `{ data: { message, success: false } }` instead of
// throwing, 401 shows "Session expired" and redirects to login, and GETs/cart writes carry the visitor's currency/locale.
import { useApi } from '~/composables/useApi.js'
import { createSwalAlert } from '~/composables/useAlert.js'
import { STATIC_ROUTES } from '~/utils/staticRoutes.js'

const JSON_HEADERS = { 'Content-Type': 'application/json' }

const countryParams = () => {
  const country = useCookie('countryData').value || { currency: 'USD', locale: 'en-US' }
  return `currency=${country?.currency || 'USD'}&locale=${country?.locale || 'en-US'}`
}

const handleUnauthorizedError = () => {
  createSwalAlert('Session expired. Please log in again.', 'error')
  window.location.href = STATIC_ROUTES.LOGIN
}

const errorMessage = (error) => error?.data?.error || error?.data?.message || error?.message

// GET with currency/locale appended to the URL
const getRequest = async (URL, { headers } = {}) => {
  try {
    const sep = URL.includes('?') ? '&' : '?'
    const { data } = await useApi().request('get', `${URL}${sep}${countryParams()}`, { headers: { ...JSON_HEADERS, ...headers } })
    return { data }
  } catch (error) {
    if (error.status === 401) handleUnauthorizedError()
    else createSwalAlert(error.message || 'Internal Server Error', 'error')
    return { data: { message: error.message, success: false } }
  }
}

// POST; 401/403/422 keep their message + code so the caller can show field-level feedback
const postRequest = async (URL, body = {}, { headers } = {}) => {
  try {
    const { data, status } = await useApi().request('post', URL, { body, headers: { ...JSON_HEADERS, ...headers } })
    return { data, status }
  } catch (error) {
    const status = error.status
    if (status === 401 || status === 422 || status === 403) {
      return { data: { message: errorMessage(error) || 'Internal Server Error', success: false, status, code: error.data?.code || null } }
    }
    return { data: { message: error.message ?? error, success: false } }
  }
}

const putRequest = async (URL, body = {}, { headers } = {}) => {
  try {
    const { data, status } = await useApi().request('put', URL, { body, headers: { ...JSON_HEADERS, ...headers } })
    return { data, status }
  } catch (error) {
    if (error.status === 401) {
      return { data: { message: error.data?.error || 'Internal Server Error', success: false } }
    }
    createSwalAlert(error.message || 'Internal Server Error', 'error')
    return { data: { message: error.message, success: false } }
  }
}

// Cart writes also send the visitor's currency/locale in the body
const updateCartItem = async (URL, body = {}) => {
  const country = useCookie('countryData').value || { currency: 'USD', locale: 'en-US' }
  const payload = { ...body, currency: country?.currency || 'USD', locale: country?.locale || 'en-US' }
  try {
    const { data, status } = await useApi().request('post', URL, { body: payload, headers: JSON_HEADERS })
    return { data, status }
  } catch (error) {
    if (error.status === 401) return handleUnauthorizedError()
    if (error.status === 404) return { data: { message: error.message, success: false } }
    createSwalAlert(error.message || 'Internal Server Error', 'error')
    return { data: { message: error.message, success: false } }
  }
}

const getProductFitlerList = async (params) => {
  try {
    const { data } = await useApi().request('get', `product-search?${params}&${countryParams()}`)
    return { data }
  } catch (error) {
    if (error.status === 401) handleUnauthorizedError()
    else createSwalAlert(error.message || 'Internal Server Error', 'error')
    return { data: { message: error.message, success: false } }
  }
}

// Filtered listing; an aborted request resolves to `{ aborted: true }` (no toast)
const getFitleredProductList = async (apiUrl, params, signal = null) => {
  try {
    const { data } = await useApi().request('get', `${apiUrl}?${params}&${countryParams()}`, { signal })
    return { data }
  } catch (error) {
    if (error.name === 'AbortError' || error.name === 'CanceledError' || error.code === 'ERR_CANCELED' || signal?.aborted) {
      return { aborted: true }
    }
    if (error.status === 401) handleUnauthorizedError()
    else createSwalAlert(error.message || 'Internal Server Error', 'error')
    return { data: { message: error.message, success: false } }
  }
}

export default { getRequest, updateCartItem, postRequest, getProductFitlerList, putRequest, getFitleredProductList }
