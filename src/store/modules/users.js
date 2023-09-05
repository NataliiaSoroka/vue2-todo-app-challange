import { api } from '../api'
import * as types from '../mutation-types'

const state = {
  users: null
}

const getters = {
  users: (state) => state.users,
}

const actions = {
  async getUsers({ commit, rootState }) {
    try {
      const data = await api[rootState.settings.apiProvider].fetchUsers()
      commit(types.GET_USERS, data)
    } catch (err) {
      console.error(err)
    }
  }
}

const mutations = {
  [types.GET_USERS](state, users) {
    state.users = users
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
