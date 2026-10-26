// GTM script/noscript injection and session events (was gtm.js, gtmframe.js, gtm-session.client.js).
export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig().public
  const store = useMainStore()

  if (config.gtmUrl) {
    const insertScriptAtTopOfHead = () => {
      const head = document.head
      const gtmScript = document.createElement('script')
      gtmScript.async = true
      gtmScript.src = config.gtmUrl
      if (head.firstChild) head.insertBefore(gtmScript, head.firstChild)
      else head.appendChild(gtmScript)
    }
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', insertScriptAtTopOfHead)
    else insertScriptAtTopOfHead()
  }

  if (config.gtmIframeUrl) {
    const insertNoscript = () => {
      const noscript = document.createElement('noscript')
      const iframe = document.createElement('iframe')
      iframe.src = config.gtmIframeUrl
      iframe.height = '0'
      iframe.width = '0'
      iframe.style.display = 'none'
      iframe.style.visibility = 'hidden'
      noscript.appendChild(iframe)
      document.body.insertBefore(noscript, document.body.firstChild)
    }
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', insertNoscript)
    else insertNoscript()
  }

  const fireSessionEvents = () => {
    store.runGtmEvent({ action_type: 'begin_session' })
    store.runGtmEvent({ action_type: 'provided_cookie_consent' })
  }
  nuxtApp.provide('fireSessionEvents', fireSessionEvents)
  fireSessionEvents()

  document.addEventListener('click', (e) => {
    if (!e.target.closest('a[href^="tel:"]')) return
    try {
      store.runGtmEvent({ action_type: 'begin_call' })
    } catch (err) {
      console.error('GTM tel click error:', err)
    }
  })
})
