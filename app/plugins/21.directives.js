// v-click-outside (Vue 3 directive API). Call sites pass a method reference: v-click-outside="onClickOutside".
// Non-function values (e.g. an inline assignment) are ignored instead of throwing.
export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive('click-outside', {
    beforeMount(el, binding) {
      el.clickOutsideEvent = (event) => {
        if (el === event.target || el.contains(event.target)) return
        if (typeof binding.value === 'function') binding.value(event)
      }
      document.body.addEventListener('click', el.clickOutsideEvent)
    },
    unmounted(el) {
      document.body.removeEventListener('click', el.clickOutsideEvent)
    },
  })
})
