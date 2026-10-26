// Was `asyncData` in pages/thankyou.vue: without a completed order go back to the homepage.
import { STATIC_ROUTES } from '~/utils/staticRoutes'

export default defineNuxtRouteMiddleware(() => {
  if (import.meta.server) return
  const { $store } = useNuxtApp()
  if (!$store.getters.getOrderedData) return navigateTo(STATIC_ROUTES.HOME, { replace: true })
})
