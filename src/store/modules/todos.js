import { api } from '../api'
import * as types from '../mutation-types'

const state = {
  todos: null,
}

const getters = {
  todos: state => state.todos,
  usersFromTodos: state => {
    const set = new Set(state.todos?.map(t => t.userId))
    return Array.from(set)
  }
}

const actions = {
  async getTodos({ commit }) {
    const data = await fetch(api.todos)
    commit(types.GET_TODOS, await data.json())
  },
  async removeTodo({ commit, getters }, id) {
    const data = await fetch(`${api.todos}/${id}`, {
      method: 'DELETE',
    })
    await data
    commit(types.REMOVE_TODOS, getters.todos.filter(t => t.id !== id))
  }
}

const mutations = {
  [types.GET_TODOS](state, todos) {
    state.todos = todos
  },
  [types.REMOVE_TODOS](state, todos) {
    state.todos = todos
  }
}

export default {
  state,
  getters,
  actions,
  mutations,
}