<template>
  <div class="todo-item">
    <i :class="iconClasses"></i>
    <div>
      <span>{{ item.title }}</span>
      <div v-if="user" class="todo-item__author">@{{ user.username }}</div>
    </div>
    <div class="todo-item__actions">
      <i
        v-if="isFavorite"
        class="las la-heart todo-item__icon todo-item__icon--purple"
        @click="removeFavorite"
      />
      <i
        v-else
        class="lar la-heart todo-item__icon todo-item__icon--purple"
        @click="setFavorite"
      />
      <i
        class="las la-trash todo-item__icon todo-item__icon--red"
        @click="removeItem"
      />
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapState } from 'vuex'
import { todoStatuses } from 'constants'
import { mapUsersById } from 'utils/map-state'

export default {
  name: 'TodoItem',
  props: {
    item: {
      type: Object,
      default: () => ({})
    }
  },
  computed: {
    ...mapGetters(['favorites']),
    ...mapState({ mapUsersById }),
    statusObject() {
      return todoStatuses.find((status) => status.value == this.item.completed)
    },
    iconClasses() {
      return [
        'todo-item__icon',
        this.statusObject.icon,
        `todo-item__icon--${this.statusObject.color}`
      ]
    },
    user() {
      return this.mapUsersById && this.mapUsersById[this.item.userId]
    },
    isFavorite() {
      return this.favorites.find((f) => f === this.item.id)
    }
  },
  methods: {
    ...mapActions(['removeTodo']),
    setFavorite() {
      this.$emit('setFavorite', this.item.id)
    },
    removeFavorite() {
      this.$emit('removeFavorite', this.item.id)
    },
    removeItem() {
      this.removeTodo(this.item.id)
    }
  }
}
</script>

<style lang="scss">
@import 'styles/variables.scss';

.todo-item {
  display: grid;
  align-items: center;
  justify-content: space-between;
  color: $text-color;
  grid-auto-flow: column;
  grid-template-columns: 25px 1fr 50px;
  border-bottom: 1px solid $dark-gray;
  padding: 10px 5px;

  &__author {
    color: $dark-gray;
    font-size: small;
  }

  &__actions {
    display: flex;
    justify-content: space-between;

    .todo-item__icon {
      cursor: pointer;
    }
  }

  &__icon {
    font-size: 20px;

    &--green {
      color: $green-color;
    }

    &--yellow {
      color: $yellow-color;
    }

    &--purple {
      color: $purple-color;
    }

    &--red {
      color: $red-color;
    }
  }
}
</style>
