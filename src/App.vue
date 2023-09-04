<template>
  <div>
    <component
      :is="layoutComponent"
    >
      <router-view />
    </component>
  </div>
</template>
<script>
// import layouts from 'constants/layouts'
import LayoutDefault from 'layouts/default.vue'

export default {
  name: 'App',
  components: {
    LayoutDefault,
  },
  computed: {
    layoutComponent() {
      return LayoutDefault
    },
  },
}
</script>


<style>
</style>
