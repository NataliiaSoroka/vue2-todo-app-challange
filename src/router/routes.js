const Login = () => import('pages/login')
const Todos = () => import('pages/todo')

import routeNames from 'constants/route-names'

export const routes = [
  {
    path: '/',
    name: routeNames.index,
    redirect: () => {
      return { path: '/login' }
    }
  },
  {
    path: '/login',
    name: routeNames.login,
    component: Login,
  },
  {
    path: '/todo/:userId',
    name: routeNames.todos,
    component: Todos,
  }
]