import { computed, reactive } from 'vue'
import { defineStore } from 'pinia'
import { actions, extraState, getters as getterDefs, mutations } from './definitions.js'
import { useBundleStore } from './bundle.js'

/**
 * Main Pinia store.
 * State, getters, mutations and actions are the original Nuxt 2 Vuex definitions (same names, same logic),
 * executed through `commit` / `dispatch` so every existing call site keeps working via the `$store` facade
 * (see plugins/10.store.js). New code should call `useMainStore()` directly.
 */
export const useMainStore = defineStore('main', () => {
  const nuxtApp = useNuxtApp()
  const state = reactive({ ...extraState, bundleUrl: undefined })

  const getters = {}
  Object.keys(getterDefs).forEach((name) => {
    getters[name] = computed(() => getterDefs[name](state))
  })
  const gettersProxy = new Proxy(getters, {
    get: (target, key) => {
      if (typeof key === 'string' && key.startsWith('bundle/')) return useBundleStore().gettersProxy[key.slice(7)]
      return target[key]?.value
    },
  })

  // `this` for mutations/actions: what Nuxt 2 injected into the Vuex store ($axios, $cookies, $config, ...)
  const ctx = {
    get $axios() { return nuxtApp.$axios },
    get $cookies() { return nuxtApp.$cookies },
    get $config() { return nuxtApp.$config },
    get $userProperties() { return nuxtApp.$userProperties },
    get $isMobile() { return nuxtApp.$isMobile },
  }

  function commit(name, payload) {
    if (name.includes('/')) return useBundleStore().commit(name.split('/')[1], payload)
    const mutation = mutations[name]
    if (!mutation) return console.error(`[store] unknown mutation: ${name}`)
    return mutation.call(ctx, state, payload)
  }

  function dispatch(name, payload) {
    if (name.includes('/')) return useBundleStore().dispatch(name.split('/')[1], payload)
    const action = actions[name]
    if (!action) {
      console.error(`[store] unknown action: ${name}`)
      return Promise.resolve()
    }
    return Promise.resolve(action.call(ctx, { commit, dispatch, state, getters: gettersProxy, rootState: state }, payload))
  }

  return { state, getters, gettersProxy, commit, dispatch }
})
