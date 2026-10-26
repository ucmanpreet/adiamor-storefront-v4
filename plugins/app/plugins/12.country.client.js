// Delays GET requests until the visitor country is known (was part of plugins/currencyFilter.js),
// so currency/locale query params are correct on first load. Gives up after 3 s.
export default defineNuxtPlugin((nuxtApp) => {
  const store = nuxtApp.$store
  let countryReadyPromise = null

  const getCountryReady = () => {
    if (countryReadyPromise) return countryReadyPromise

    countryReadyPromise = new Promise((resolve) => {
      if (nuxtApp.$cookies.get('countryData')?.code) return resolve()

      const unwatch = store.watch(
        (state) => state.countryReady,
        (val) => { if (val) { unwatch(); resolve() } },
      )
      setTimeout(() => { unwatch(); resolve() }, 3000)
    })
    return countryReadyPromise
  }

  nuxtApp.$axios.onRequest(async (config) => {
    if (config.method?.toLowerCase() === 'get') await getCountryReady()
    return config
  })

  nuxtApp.provide('waitForCountry', getCountryReady)
})
