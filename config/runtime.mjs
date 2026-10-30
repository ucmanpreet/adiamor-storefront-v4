
// runtimeConfig.public defaults come from .env.
// Cloudflare can override these at runtime using matching NUXT_PUBLIC_* variables.

export const runtimePublic = {
  recaptcha: {
    siteKey: process.env.RECAPTCHA_SITE_KEY || '',
    version: 2,
  },

  baseUrl: process.env.VITE_BASE_REST_URL || process.env.BASE_REST_URL || '',
  gtmUrl: process.env.GTM_SCRIPT_URL || '',
  countryCode: process.env.COUNTRY_CODE || '',
  gtmIframeUrl: process.env.GTM_FRAME_URL || '',
  ipGeolocationUrl: process.env.IP_GEOLOCATION_URL || '',

  affirmCdnProduction: process.env.AFFIRM_CDN_PRODUCTION || '',
  affirmPublicApikeyProduction: process.env.AFFIRM_PUBLIC_API_KEY_PRODUCTION || '',
  affirmCdn: process.env.AFFIRM_CDN || '',
  affirmPublicApiKey: process.env.AFFIRM_PUBLIC_API_KEY || '',
  locale: process.env.LOCALE || '',
  affirmCountryCode: process.env.AFFIRM_COUNTRY_CODE || '',
  affirmUserConfirmationURL: process.env.AFFIRM_USER_CONFIRMATION_URL || '',
  affirmMerchantName: process.env.AFFIRM_MERCHANT_NAME || '',
  affirmUserCancelURL: process.env.AFFIRM_USER_CANCEL_URL || '',

  currency: process.env.CURRENCY || '',

  boltDataPublishableKey: process.env.BOLT_DATA_PUBLISHABLE_KEY || '',
  boltConnectCDN: process.env.BOLT_CONNECT_CDN || '',
  boltTrackCDN: process.env.BOLT_TRACK_CDN || '',
  boltCheckoutObj: process.env.BOLT_CHECKOUT_OBJECT || '',

  paypalClientId: process.env.PAYPAL_CLIENT_ID || '',
  paypalCdn: process.env.PAYPAL_CDN || '',
  paypalIntent: process.env.PAYPAL_INTENT || '',
  paypalDisableFunding: process.env.PAYPAL_DISABLE_FUNDING || '',

  searchRecaptchaSiteKey: process.env.SEARCH_RECAPTCHA_SITE_KEY || '',
  googleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY || '',

  adiamorHomeURL: process.env.ADIAMOR_HOME_URL || '',
  storeFrontHomeURL: process.env.STORE_FRONT_HOME_URL || '',

  iubendaSiteID: process.env.IUBENDA_SITE_ID || '',
  iubendaCookiePolicyID: process.env.IUBENDA_COOKIE_POLICY_ID || '',
  iubendaPersonalCookiePolicyID: process.env.IUBENDA_PERSONAL_COOKIE_POLICY_ID || '',

  cdnPrefix: process.env.CDN_PREFIX || 'https://cdn.adiamor.com/',
  staticPrefix: process.env.STATIC_PREFIX || 'https://static.adiamor.com/',

  yotpoSiteKey: process.env.YOTPO_SITE_KEY || '',
}
