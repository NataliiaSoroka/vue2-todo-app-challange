import Vue from 'vue'
import Router from 'vue-router'
import { routes } from './routes'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.NODE_ENV === 'production' ? '/vue2-todo-app-challange/' : '/',
  routes
})
