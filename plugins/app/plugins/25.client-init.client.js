// Was plugins/client-init.js: kicks off idle-time prefetch (attribute config / diamond filters).
export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.$store.dispatch('nuxtClientInit', nuxtApp.context).catch((err) => {
    console.error('Client initialization error:', err)
  })
})
