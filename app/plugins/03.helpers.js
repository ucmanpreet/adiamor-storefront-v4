// Small global helpers that were separate Nuxt 2 plugins:
// $formatPrice/$getCurrencySymbol (currencyFilter.js), $sanitize (dompurify.js),
// $getVisitorCode (visitorCode.js), $getLocation (ipGeolocation.js), $isMobile/$isTabAndMobile (mobile-detect.js).
import sanitizeHtml from 'sanitize-html' // works on the server (Cloudflare Workers have no DOM, so DOMPurify cannot run there)
import MobileDetect from 'mobile-detect'
import KEYS from '~/utils/constant.js'
import { assetUrl } from '~/utils/assetUrl.js'

// DOMPurify's defaults keep most formatting tags plus img/a, so allow the same here
const SANITIZE_OPTIONS = {
  allowedTags: sanitizeHtml.defaults.allowedTags.concat(['img', 'h1', 'h2', 'span', 'u', 'figure', 'figcaption', 'iframe']),
  allowedAttributes: { '*': ['class', 'style', 'id'], a: ['href', 'target', 'rel', 'name'], img: ['src', 'srcset', 'alt', 'width', 'height', 'loading'], iframe: ['src', 'width', 'height', 'allowfullscreen'] },
  allowedIframeHostnames: ['www.youtube.com', 'player.vimeo.com'],
}

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig().public
  const countryData = useCookie('countryData')

  const getCurrency = () => countryData.value?.currency || KEYS.CURRENCY

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
  nuxtApp.provide('sanitize', (html) => (html ? sanitizeHtml(html, SANITIZE_OPTIONS) : ''))

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
