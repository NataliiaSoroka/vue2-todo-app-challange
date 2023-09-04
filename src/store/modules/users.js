import { api } from '../api'
import * as types from '../mutation-types'

const state = {
  users: null,
}

const getters = {
  users: state => state.users,
  mapUsersByNamePhone: state => state.users?.reduce((res, user) => {
    res[`${user.username}${user.phone}`] = user
    return res
  }, {}),
  mapUsersById: state => state.users?.reduce((res, user) => {
    res[user.id] = user
    return res
  }, {}),
}

const actions = {
  async getUsers({ commit }) {
    const data = await fetch(api.users)
    commit(types.GET_USERS, await data.json())
  },
}

const mutations = {
  [types.GET_USERS](state, users) {
    state.users = users
  },
}

export default {
  state,
  getters,
  actions,
  mutations,
}