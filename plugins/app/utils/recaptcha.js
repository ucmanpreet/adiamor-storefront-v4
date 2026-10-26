// Holds the currently mounted <Recaptcha> so `this.$recaptcha.getResponse()/reset()` keep working (Nuxt 2 module API).
let active = null

export const setActiveRecaptcha = (instance, only) => {
  if (instance === null && only && active !== only) return
  active = instance
}

export const recaptchaApi = {
  getResponse: async () => (active ? active.getResponse() : ''),
  reset: async () => { if (active) active.reset() },
}
