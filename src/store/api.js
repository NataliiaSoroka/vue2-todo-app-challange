import { apis } from 'constants'

export const api = {
  [apis.main]: {
    fetchUsers: async () => {
      const data = await fetch('https://jsonplaceholder.typicode.com/users')
      return await data.json()
    },
    fetchTodos: async () => {
      const data = await fetch('https://jsonplaceholder.typicode.com/todos')
      return await data.json()
    },
    fetchRemoveTodo: async (id) => {
      await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
        method: 'DELETE'
      })
    },
    fetchAddTodo: async (model) => {
      const data = await fetch('https://jsonplaceholder.typicode.com/todos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(model)
      })
      return await data.json()
    }
  },
  [apis.second]: {
    fetchUsers: async () => {
      const data = await fetch('https://jsonplaceholder.typicode.com/users')
      return await data.json()
    },
    fetchTodos: async () => {
      const data = await fetch('https://jsonplaceholder.typicode.com/todos')
      return await data.json()
    },
    fetchRemoveTodo: async (id) => {
      await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
        method: 'DELETE'
      })
    },
    fetchAddTodo: async (model) => {
      const data = await fetch('https://jsonplaceholder.typicode.com/todos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(model)
      })
      return await data.json()
    }
  }
}
