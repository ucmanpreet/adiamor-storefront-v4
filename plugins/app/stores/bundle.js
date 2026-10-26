import { computed, reactive } from 'vue'
import { defineStore } from 'pinia'
import bundleModule from './bundleDefinitions.js'

/** "Design Your Own" builder state (Vuex `bundle` module, same mutations/actions/getters). */
export const useBundleStore = defineStore('bundle', () => {
  const state = reactive(bundleModule.state())
  const getters = {}
  Object.keys(bundleModule.getters).forEach((name) => {
    getters[name] = computed(() => bundleModule.getters[name](state))
  })
  const gettersProxy = new Proxy(getters, { get: (target, key) => target[key]?.value })

  function commit(name, payload) {
    return bundleModule.mutations[name](state, payload)
  }
  function dispatch(name, payload) {
    return Promise.resolve(bundleModule.actions[name]({ commit, state }, payload))
  }
  return { state, getters, gettersProxy, commit, dispatch }
})
