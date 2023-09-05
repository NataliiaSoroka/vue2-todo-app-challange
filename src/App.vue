<template>
  <div>
    <a-header />
    <div class="body">
      <router-view />
    </div>
    <a-footer />
  </div>
</template>
<script>
import { AHeader, AFooter } from 'components/layout'

export default {
  name: 'App',
  components: {
    AHeader,
    AFooter
  }
}
</script>

<style lang="scss">
@import 'styles/variables';

.body {
  background-color: $background-color;
  min-height: calc(100vh - 330px);
}
</style>
