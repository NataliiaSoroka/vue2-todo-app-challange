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
    commit(types.REMOVE_TODO, getters.todos.filter(t => t.id !== id))
  },
  async addTodo({ commit }, model) {
    const data = await fetch(api.todos, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(model),
    })
    const result = await data.json()
    const todo = {
      ...result,
      userId: +result.userId,
      completed: false,
    }
    commit(types.ADD_TODO, todo)
  }
}

const mutations = {
  [types.GET_TODOS](state, todos) {
    state.todos = todos
  },
  [types.REMOVE_TODO](state, todos) {
    state.todos = todos
  },
  [types.ADD_TODO](state, todo) {
    state.todos = [todo, ...state.todos]
  }
}

export default {
  state,
  getters,
  actions,
  mutations,
}