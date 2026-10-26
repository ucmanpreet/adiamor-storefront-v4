<template>
  <div ref="widget" class="g-recaptcha-v2" />
</template>

<script setup>
// reCAPTCHA v2 checkbox (replacement for the @nuxtjs/recaptcha `<recaptcha />` component).
// Same API: `getResponse()` and `reset()` (also exposed globally as `this.$recaptcha`).
import { setActiveRecaptcha } from '~/utils/recaptcha.js'

const config = useRuntimeConfig().public;

const widget = ref(null)
const widgetId = ref(null)

function waitForApi() {
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
}
function getResponse() {
  return widgetId.value === null ? '' : window.grecaptcha.getResponse(widgetId.value)
}
function reset() {
  if (widgetId.value !== null) window.grecaptcha.reset(widgetId.value)
}

// Registered with utils/recaptcha.js (identity is used by setActiveRecaptcha(null, only))
const instance = { getResponse, reset }

onMounted(async () => {
  const grecaptcha = await waitForApi()
  if (!grecaptcha || !widget.value) return
  widgetId.value = grecaptcha.render(widget.value, { sitekey: config.recaptcha.siteKey })
  setActiveRecaptcha(instance)
})

onBeforeUnmount(() => {
  setActiveRecaptcha(null, instance)
})

defineExpose({ getResponse, reset })
</script>
