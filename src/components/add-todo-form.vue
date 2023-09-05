<template>
  <form class="add-todo-form" @submit.prevent="addTodoItem">
    <a-input
      class="add-todo-form__input"
      v-model.trim="model.title"
      :error="$v.model.title"
      placeholder="Title"
      bordered
    />
    <a-select
      class="add-todo-form__input"
      v-model="model.userId"
      :options="usersOptions"
      :error="$v.model.userId"
      placeholder="User"
      bordered
    />
    <a-button type="submit" :inProgress="inProgress"> Add </a-button>
  </form>
</template>

<script>
import { required } from 'vuelidate/dist/validators.min.js'
import { mapActions, mapState } from 'vuex'
import { ASelect, AInput, AButton } from 'components/shared'
import { mapUsersById, usersFromTodos } from 'utils/map-state'

export default {
  name: 'AddTodoForm',
  components: {
    ASelect,
    AInput,
    AButton
  },
  data() {
    return {
      errorMessage: '',
      inProgress: false,
      model: { ...initModel }
    }
  },
  validations: {
    model: {
      title: {
        required
      },
      userId: {
        required
      }
    }
  },
  computed: {
    ...mapState({ mapUsersById, usersFromTodos }),
    usersOptions() {
      if (!this.mapUsersById || !this.usersFromTodos) return []
      return this.usersFromTodos?.map((id) => ({
        text: this.mapUsersById[id]?.name,
        value: id
      }))
    }
  },
  methods: {
    ...mapActions(['addTodo']),
    async addTodoItem() {
      this.$v.$touch()
      if (this.$v.$invalid) return
      this.inProgress = true
      this.errorMessage = ''
      try {
        await this.addTodo(this.model)
      } catch (err) {
        this.errorMessage = err
      } finally {
        this.model = { ...initModel }
        this.$v.$reset()
        this.inProgress = false
      }
    }
  }
}

const initModel = {
  title: '',
  userId: ''
}
</script>

<style lang="scss">
@import 'styles/variables';

.add-todo-form {
  display: grid;
  align-items: center;
  justify-content: space-between;
  grid-auto-flow: column;
  grid-template-columns: 1fr 1fr 60px;
  gap: 5px;
}
</style>
