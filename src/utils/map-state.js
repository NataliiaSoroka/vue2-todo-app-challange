const mapUsersByNamePhone = (state) =>
  state.users.users?.reduce((res, user) => {
    res[`${user.username}${user.phone}`] = user
    return res
  }, {})

const mapUsersById = (state) =>
  state.users.users?.reduce((res, user) => {
    res[user.id] = user
    return res
  }, {})

const usersFromTodos = (state) => {
  const set = new Set(state.todos.todos?.map((t) => t.userId))
  return Array.from(set)
}

export { mapUsersByNamePhone, mapUsersById, usersFromTodos }
