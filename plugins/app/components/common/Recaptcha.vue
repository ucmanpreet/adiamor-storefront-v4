<template>
  <div ref="widget" class="g-recaptcha-v2" />
</template>

<script>
// reCAPTCHA v2 checkbox (replacement for the @nuxtjs/recaptcha `<recaptcha />` component).
// Same API: `getResponse()` and `reset()` (also exposed globally as `this.$recaptcha`).
import { setActiveRecaptcha } from '~/utils/recaptcha.js'

export default {
  name: 'Recaptcha',
  data() {
    return { widgetId: null }
  },
  async mounted() {
    const grecaptcha = await this.waitForApi()
    if (!grecaptcha || !this.$refs.widget) return
    this.widgetId = grecaptcha.render(this.$refs.widget, { sitekey: this.$config.public.recaptcha.siteKey })
    setActiveRecaptcha(this)
  },
  beforeUnmount() {
    setActiveRecaptcha(null, this)
  },
  methods: {
    waitForApi() {
      return new Promise((resolve) => {
        let tries = 0
        const timer = setInterval(() => {
          if (window.grecaptcha?.render) {
            clearInterval(timer)
            window.grecaptcha.ready(() => resolve(window.grecaptcha))
          } else if (++tries > 100) {
            clearInterval(timer)
            resolve(null)
          }
        }, 100)
      })
    },
    getResponse() {
      return this.widgetId === null ? '' : window.grecaptcha.getResponse(this.widgetId)
    },
    reset() {
      if (this.widgetId !== null) window.grecaptcha.reset(this.widgetId)
    },
  },
}
</script>
