const state = {
  main: 0
}

const getters = {
  storeGetMain (state) {
    return state.main
  }
}

const mutations = {
  storeDecrement (state) {
    state.main--
  },
  
  storeIncrement (state) {
    state.main++
  }
}

const actions = {
  someAsyncTask ({ commit }) {
    // do something async
    commit('INCREMENT_MAIN_COUNTER')
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
