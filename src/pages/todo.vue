<template>
  <div class="container">
    <div class="todo-header">
      <user-data class="todo-header__item user-info" :user="currentUser" />
      <todo-filter class="todo-header__item filter" v-model="filterModel" />
    </div>
    <div class="todo-list">
      <add-todo-form />
      <todo-item
        v-for="item in filteredTodos"
        :key="item.id"
        :item="item"
        @setFavorite="setFavorite"
        @removeFavorite="removeFavorite"
      />
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapState } from 'vuex'
import { TodoItem, UserData, TodoFilter, AddTodoForm } from 'components'
import { mapUsersById } from 'utils/map-state'

export default {
  name: 'Todos',
  components: {
    TodoItem,
    UserData,
    TodoFilter,
    AddTodoForm
  },
  data() {
    return {
      filterModel: {}
    }
  },
  computed: {
    ...mapGetters(['users', 'todos', 'favorites']),
    ...mapState({ mapUsersById }),
    currentUser() {
      return this.mapUsersById && this.mapUsersById[this.$route.params.userId]
    },
    filteredTodos() {
      const predicates = []
      if (this.filterModel?.title) {
        predicates.push((todo) => todo.title.includes(this.filterModel.title))
      }
      if (this.filterModel?.userId) {
        predicates.push(
          (todo) => todo.userId.toString() === this.filterModel.userId
        )
      }
      if (this.filterModel?.status && this.filterModel.status !== 'fav') {
        predicates.push(
          (todo) => todo.completed.toString() === this.filterModel.status
        )
      }
      if (this.filterModel?.status === 'fav') {
        predicates.push((todo) => this.favorites.includes(todo.id))
      }
      return this.todos?.filter((todo) =>
        predicates.length ? predicates.every((f) => f(todo)) : true
      )
    }
  },
  methods: {
    ...mapActions([
      'getTodos',
      'getUsers',
      'getFavorites',
      'removeFavorite',
      'setFavorite'
    ])
  },
  mounted() {
    if (!this.users) this.getUsers()
    this.getTodos()
    this.getFavorites()
  }
}
</script>

<style lang="scss">
.todo-header {
  display: flex;
  justify-content: space-between;

  &__item {
    margin-bottom: 20px;
  }

  .user-info {
    margin-right: 10px;
  }

  .filter {
    flex-grow: 1;
  }
}

.todo-list {
  background-color: #fefefe;
  padding: 0.75rem 1.25rem;
  border: 1px solid #fdfdfe;
  border-radius: 5px;
}
</style>
