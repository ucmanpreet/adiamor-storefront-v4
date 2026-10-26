import Recaptcha from '~/components/common/Recaptcha.vue'
import { recaptchaApi } from '~/utils/recaptcha.js'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.component('recaptcha', Recaptcha)
  nuxtApp.provide('recaptcha', recaptchaApi)
})
