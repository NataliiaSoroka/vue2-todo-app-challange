import Vue from 'vue'
import Vuex from 'vuex'
import modules from './modules'

/* Plug in Vuex store */
Vue.use(Vuex)

export default new Vuex.Store({
  modules
})