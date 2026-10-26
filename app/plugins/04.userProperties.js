// $userProperties (GTM identity) + $getVisitorCode.
export default defineNuxtPlugin((nuxtApp) => {
  const store = useMainStore()
  const visitorCookie = useCookie('visitorCode')
  const email = store.userData?.email || null
  const phone = store.userData?.phone || null
  const source = import.meta.client ? window.location.href : 'server'
  const stamp = () => new Date().toISOString()

  nuxtApp.provide('userProperties', {
    external_id: import.meta.client ? visitorCookie.value : null,
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
    visitorCookie.value
    || store.getResponse?.data?.visitor_code
    || store.visitorCode
    || ''
  ))
})
