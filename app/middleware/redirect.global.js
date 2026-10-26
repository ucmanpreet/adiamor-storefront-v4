// Was middleware/redirect.js: 301-style redirects from the legacy URL map (utils/menu.js).
import { redirectUrls } from '~/utils/menu.js'

export default defineNuxtRouteMiddleware((to) => {
  const path = to.fullPath
  const normalizedPath = path !== '/' && path.endsWith('/') ? path.slice(0, -1) : path

  if (normalizedPath === '/education/glossary') {
    return navigateTo('/education/glossary/a/', { redirectCode: 301, replace: true })
  }
  if (redirectUrls && redirectUrls[normalizedPath]) {
    return navigateTo(redirectUrls[normalizedPath], { redirectCode: 301, replace: true })
  }
})
