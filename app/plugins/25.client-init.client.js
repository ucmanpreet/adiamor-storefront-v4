// Kicks off idle-time prefetch (attribute config / diamond filters).
export default defineNuxtPlugin(() => {
  useMainStore().nuxtClientInit().catch((err) => {
    console.error('Client initialization error:', err)
  })
})
