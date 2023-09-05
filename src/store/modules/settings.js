import * as types from '../mutation-types'

const state = {
  apiProvider: 'main'
}

const mutations = {
  [types.SET_PROVIDER](state, provider) {
    state.apiProvider = provider
  }
}

export default {
  state,
  mutations
}
