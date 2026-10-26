// Bundle (Design Your Own) module - ported verbatim from store/modules/bundle.js
const updateCategory = (state, category, payload) => {
    const { type, ...data } = payload;
  
    if (type === 'configurable') {
      state[category].setting = { ...data, type };
    } else {
      state[category].diamond = { ...data, type };
    }
  };
  
  export default {
    state: () => ({
      ring: {
        setting: null,
        diamond: null,
      },
      earring: {
        setting: null,
        diamond: null,
      },
      necklace: {
        setting: null,
        diamond: null,
      }
    }),
    mutations: {
      SET_RING(state, payload) {
        updateCategory(state, 'ring', payload);
      },
      SET_EARRING(state, payload) {
        updateCategory(state, 'earring', payload);
      },
      SET_NECKLACE(state, payload) {
        updateCategory(state, 'necklace', payload);
      },
      CLEAR_ALL(state) {
        state.ring = { setting: null, diamond: null };
        state.earring = { setting: null, diamond: null };
        state.necklace = { setting: null, diamond: null };
      },
      CLEAR_DATA(state, { type, category }) {
        if (state[category]) {
          if (type === 'configurable') {
            // Clear setting for configurable type
            state[category].setting = null;
          } else if (type === 'simple') {
            // Clear diamond for simple type
            state[category].diamond = null;
          }
        }
      },
    },
    actions: {
      updateRing({ commit }, payload) {
        commit('SET_RING', payload);
      },
      updateEarring({ commit }, payload) {
        commit('SET_EARRING', payload);
      },
      updateNecklace({ commit }, payload) {
        commit('SET_NECKLACE', payload);
      },
      clearAll({ commit }) {
        commit('CLEAR_ALL');
      },
      clearData({ commit }, { type, category }) {
        commit('CLEAR_DATA', { type, category });
      }
    },
    getters: {
      getRing: (state) => state.ring,
      getEarring: (state) => state.earring,
      getNecklace: (state) => state.necklace,
    }
  };
  