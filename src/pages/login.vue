<template>
  <div class="login-page">
    <a-card title="description">
      <login-form />
    </a-card>
  </div>
</template>

<script>
import { LoginForm } from 'components'
import { ACard } from 'components/shared'

export default {
  name: 'LoginPage',
  components: { LoginForm, ACard }
}
</script>

<style lang="scss">
.login-page {
  display: grid;
  justify-content: center;
  padding: 10% 0;
}
</style>
