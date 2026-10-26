// Small global helpers that were separate Nuxt 2 plugins:
// $formatPrice/$getCurrencySymbol/$waitForCountry (currencyFilter.js), $sanitize (dompurify.js),
// $getVisitorCode (visitorCode.js), $getLocation (ipGeolocation.js), $isMobile/$isTabAndMobile (mobile-detect.js).
import DOMPurify from 'isomorphic-dompurify'
import MobileDetect from 'mobile-detect'
import KEYS from '~/utils/constant.js'
import { assetUrl } from '~/utils/assetUrl.js'

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig().public
  const cookies = nuxtApp.$cookies

  const getCurrency = () => cookies.get('countryData')?.currency || KEYS.CURRENCY

  nuxtApp.provide('formatPrice', (value, isShowDecimals) => {
    if (typeof value === 'string') value = parseFloat(value.replace(/[^0-9.-]/g, ''))
    if (typeof value !== 'number' || isNaN(value)) return ''
    const opts = { style: 'currency', currency: getCurrency(), maximumFractionDigits: 0 }
    if (isShowDecimals) delete opts.maximumFractionDigits
    return new Intl.NumberFormat('en-US', opts).format(value)
  })

  nuxtApp.provide('getCurrencySymbol', () => {
    const symbol = new Intl.NumberFormat('en-US', { style: 'currency', currency: getCurrency() })
      .formatToParts(1234)
      .find((part) => part.type === 'currency')?.value
    return symbol || ''
  })

  // Vue 3 ignores string event handlers (`onclick="helpDesk.click()"`), so those inline handlers call these helpers
  nuxtApp.provide('openHelpDesk', () => window.helpDesk?.click())
  nuxtApp.provide('callGlobal', (name, ...args) => window[name]?.(...args))
  nuxtApp.provide('openWindow', (url, name, features) => {
    const win = window.open(url, name, features)
    win?.focus()
  })
  nuxtApp.provide('asset', assetUrl)
  nuxtApp.provide('sanitize', (html) => (html ? DOMPurify.sanitize(html) : ''))

  nuxtApp.provide('getLocation', async () => {
    try {
      const res = await fetch(config.ipGeolocationUrl, { cache: 'no-store' })
      return await res.json()
    } catch (e) {
      return null
    }
  })

  const ua = import.meta.client ? navigator.userAgent : ''
  const md = new MobileDetect(ua)
  nuxtApp.provide('isMobile', Boolean(md.phone()))
  nuxtApp.provide('isTabAndMobile', Boolean(md.mobile()))
})
