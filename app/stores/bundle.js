// "Design Your Own" builder state. Call sites: `const bundle = useBundleStore()`; `bundle.getRing`,
// `bundle.updateRing(payload)`, `bundle.clearData({ type, category })`.
import { defineStore } from 'pinia'

const emptyCategory = () => ({ setting: null, diamond: null })

const updateCategory = (state, category, payload) => {
  const { type, ...data } = payload
  if (type === 'configurable') state[category].setting = { ...data, type }
  else state[category].diamond = { ...data, type }
}

export const useBundleStore = defineStore('bundle', {
  state: () => ({
    ring: emptyCategory(),
    earring: emptyCategory(),
    necklace: emptyCategory(),
  }),
  getters: {
    getRing: (state) => state.ring,
    getEarring: (state) => state.earring,
    getNecklace: (state) => state.necklace,
  },
  actions: {
    updateRing(payload) { updateCategory(this, 'ring', payload) },
    updateEarring(payload) { updateCategory(this, 'earring', payload) },
    updateNecklace(payload) { updateCategory(this, 'necklace', payload) },
    clearAll() {
      this.ring = emptyCategory()
      this.earring = emptyCategory()
      this.necklace = emptyCategory()
    },
    clearData({ type, category }) {
      if (!this[category]) return
      // configurable -> clear the setting, simple -> clear the diamond
      if (type === 'configurable') this[category].setting = null
      else if (type === 'simple') this[category].diamond = null
    },
  },
})
