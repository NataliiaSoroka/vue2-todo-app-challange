import { api } from '../api'
import * as types from '../mutation-types'

const state = {
  todos: null,
  favorites: []
}

const getters = {
  todos: (state) => state.todos,
  favorites: (state) => state.favorites
}

const actions = {
  async getTodos({ commit, rootState }) {
    try {
      const data = await api[rootState.settings.apiProvider].fetchTodos()
      commit(types.GET_TODOS, data)
    } catch (err) {
      console.error(err)
    }
  },
  async removeTodo({ commit, getters, rootState }, id) {
    try {
      await api[rootState.settings.apiProvider].fetchRemoveTodo(id)
      commit(
        types.REMOVE_TODO,
        getters.todos.filter((t) => t.id !== id)
      )
    } catch (err) {
      console.error(err)
    }
  },
  async addTodo({ commit, rootState }, model) {
    try {
      const data = await api[rootState.settings.apiProvider].fetchAddTodo(model)
      const todo = {
        ...data,
        userId: +data.userId,
        completed: false
      }
      commit(types.ADD_TODO, todo)
    } catch (err) {
      console.error(err)
    }
  },
  getFavorites({ commit }) {
    const favoritesFromStorage = localStorage.getItem('favorites')
    if (favoritesFromStorage) {
      const favorites = favoritesFromStorage
        .split(',')
        .map((fav) => parseInt(fav))
      commit(types.CHANGE_FAVORITES, favorites)
    }
  },
  removeFavorite({ commit, state }, id) {
    const favorites = state.favorites.filter((f) => f != id)
    localStorage.setItem('favorites', favorites)
    commit(types.CHANGE_FAVORITES, favorites)
  },
  setFavorite({ commit, state }, id) {
    const favorites = [id, ...state.favorites]
    localStorage.setItem('favorites', favorites)
    commit(types.CHANGE_FAVORITES, favorites)
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
  },
  [types.CHANGE_FAVORITES](state, favorites) {
    state.favorites = [...favorites]
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
