// Was router.scrollBehavior in nuxt.config.js (same rules, vue-router 4 syntax).
const isMobileUA = () => import.meta.client && /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent)

export default {
  scrollBehavior(to, from, savedPosition) {
    if (to.name === from.name && to.name === 'searchPage') {
      return isMobileUA() ? { left: 0, top: 0 } : false
    }
    if (to.path !== from.path) return { left: 0, top: 0 }
    if (savedPosition) return savedPosition
    return false
  },
}
