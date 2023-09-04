<template>
  <a-card class="todo-filter" title="Filter">
    <div class="todo-filter__row">
      <div class="todo-filter__col todo-filter__col--margin">
        <a-select
          v-model="filterModel.status"
          :options="todoStatuses"
          label="Status"
        />
      </div>
      <div class="todo-filter__col todo-filter__col--margin">
        <a-select
          v-model="filterModel.userId"
          :options="usersOptions"
          label="User"
        />
      </div>
    </div>
    <a-input
      v-model="filterModel.title"
      label="Title"
    />
    <div class="todo-filter__row">
      <div class="todo-filter__col todo-filter__col--margin">
        <a-button
          type="button"
          @click="setFilter"
        >
          Filter
        </a-button>
      </div>
      <div class="todo-filter__col">
        <a-button
          type="button"
          @click="resetFilter"
          color="white"
        >
          Reset
        </a-button>
      </div>
    </div>
  </a-card>
</template>

<script>
import { todoStatuses } from 'constants'
import {
  ASelect,
  ACard,
  AInput,
  AButton,
} from 'components/shared'
import { mapGetters } from 'vuex'

export default {
  name: 'TodoFilter',
  components: {
    ASelect,
    ACard,
    AInput,
    AButton,
  },
  props: {
    value: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      todoStatuses,
      filterModel: { ...initFilterModel },
    }
  },
  computed: {
    ...mapGetters(['mapUsersById', 'usersFromTodos']),
    usersOptions() {
      if (!this.mapUsersById || !this.usersFromTodos) return []
      const array = this.usersFromTodos.map(id => ({
        text: this.mapUsersById[id]?.name,
        value: id
      }))
      array.unshift({ text: 'All', value: null });
      return array
    },
  },
  methods: {
    setFilter() {
      this.$emit('input', this.filterModel)
    },
    resetFilter() {
      this.filterModel = { ...initFilterModel }
      this.setFilter()
    },
  }
}

const initFilterModel = {
  status: null,
  userId: null,
  title: ''
}
</script>

<style lang="scss">
.todo-filter {
  &__row {
    display: flex;
    flex-wrap: wrap;
  }

  &__col {
    flex-grow: 1;

    &--margin {
      margin-right: 5px;
    }
  }
}
</style>