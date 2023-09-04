<template>
  <div class="default">
    <default-header />
    <div class="default-body">
      <slot></slot>
    </div>
    <default-footer />
  </div>
</template>

<script>
import DefaultHeader from 'components/layout/default-header.vue'
import DefaultFooter from 'components/layout/default-footer.vue'

export default {
  name: 'DefaultLayout',
  components: {
    DefaultFooter,
    DefaultHeader,
  },
}
</script>

<style lang="scss">
@import 'styles/variables.scss';

.default-body {
  background-color: $background-color;
  min-height: calc(100vh - 330px);
}
</style>