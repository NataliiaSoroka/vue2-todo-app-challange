<template>
  <article class="a-card">
    <div
      v-if="title"
      class="a-card__header"
    >
      {{  title }}
    </div>
    <div class="a-card__body">
      <slot></slot>
    </div>
  </article>
</template>

<script>
export default {
  name: 'ACard',
  props: {
    title: {
      type: String,
      default: '',
    }
  },
}
</script>

<style lang="scss">
@import 'styles/variables.scss';

.a-card {
  background: $light-gray;
  border-radius: 5px;
  min-width: 447px;

  &__body {
    padding: 15px 25px;
  }

  &__header {
    padding: 15px 0;
    background-color: $dark-gray;
    display: grid;
    justify-content: center;
    border-radius: 5px 5px 0 0;
    color: $text-color;
  }
}
</style>