// $userProperties (GTM identity). Must run after 10.store.js has rehydrated the store.
export default defineNuxtPlugin((nuxtApp) => {
  const store = nuxtApp.$store
  const visitorCode = import.meta.client ? nuxtApp.$cookies.get('visitorCode') : null
  const email = store.state.userData?.email || null
  const phone = store.state.userData?.phone || null
  const source = import.meta.client ? window.location.href : 'server'
  const stamp = () => new Date().toISOString()

  nuxtApp.provide('userProperties', {
    external_id: visitorCode,
    email_address: email,
    phone_number: phone,
    currency: 'USD',
    consent: {
      cookie: { provided: true, source, timestamp: stamp() },
      email: { optin: !!email, source, timestamp: stamp() },
      phone: { optin: !!phone, source, timestamp: stamp() },
    },
  })

  nuxtApp.provide('getVisitorCode', () => (
    nuxtApp.$cookies.get('visitorCode')
    || store.getters.getResponse?.data?.visitor_code
    || store.state.visitorCode
    || ''
  ))
})
