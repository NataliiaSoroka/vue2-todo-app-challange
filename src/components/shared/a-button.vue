<template>
  <div class="btn__wrapper">
    <div>
      <button
        :type="type"
        :class="classes"
        :disabled="disabled || inProgress"
        @click="onClick"
        >
        <slot></slot>
      </button>
    </div>
    <transition name="fade-spinner" mode="out-in">
      <div
        v-if="inProgress"
        class="btn__spinner"
      >
        <spinner
          :size=43
          :color="color"
        />
      </div>
    </transition>
  </div>
</template>

<script>
import Spinner from './a-spinner.vue'

export default {
  components: {
    Spinner
  },
  props: {
    inProgress: {
      default: false,
      type: Boolean
    },
    href: {
      type: [String, Object]
    },
    router: {
      type: Boolean
    },
    type: {
      type: String
    },
    disabled: {
      type: Boolean
    },
    color: {
      type: String,
      default: 'green'
    },
  },
  computed: {
    classes() {
      return [`btn__link`, `btn__color--${this.color}`]
    }
  },
  methods: {
    onClick() {
      if (this.disabled || this.type === 'submit') return
      if (this.href && this.router) {
        this.$router.push(this.href)
      } else if (this.href) {
        window.location.href = this.href
      } else {
        this.$emit('click')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import 'styles/variables';

.btn {
  &__wrapper {
    margin-bottom: 20px;
    position: relative;
    width: 100%;
  }

  &__link {
    display: block;
    text-align: center;
    border: 1px solid $green-color;
    width: 100%;
    padding: 10px;
    font-size: 17px;
    font-weight: 500;
    line-height: 21px;
    letter-spacing: -0.025em;
    background-color: $green-color;
    border-radius: 5px;
  }

  &__color {
    &--green {
      background-color: $green-color;
      color: $white-color;

      &:hover,
      &:focus {
        background-color: $white-color;
        color: $green-color;
      }
    }

    &--white {
      background-color: $white-color;
      color: $green-color;

      &:hover,
      &:focus {
        background-color: $green-opacity-color;
        color: $white-color;
      }
    }
  }

}
.btn__spinner {
  background-color: $white-opacity-color;
  height: 43px;
  width: 100%;
  position: absolute;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  user-select: none;
  border-radius: 5px;
}
</style>
