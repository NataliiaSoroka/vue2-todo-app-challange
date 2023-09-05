<template>
  <form class="login-form" @submit.prevent="login">
    <p class="login-form__desc">description</p>
    <a-input
      v-model.trim="model.username"
      :error="$v.model.username"
      placeholder="Username"
    />
    <a-input
      v-model.trim="model.phone"
      :error="$v.model.phone"
      placeholder="Phone Number"
    />
    <a-button type="submit" :inProgress="inProgress"> Register </a-button>
    <div v-if="errorMessage" class="login-form__error">
      {{ errorMessage }}
    </div>
  </form>
</template>

<script>
import { routeNames } from 'constants'
import { AInput, AButton } from 'components/shared'
import { required, alpha } from 'vuelidate/dist/validators.min.js'
import { isPhone } from 'utils/validators'
import { mapUsersByNamePhone } from 'utils/map-state'
import { mapActions, mapState } from 'vuex'

export default {
  name: 'LoginForm',
  components: {
    AInput,
    AButton
  },
  data() {
    return {
      errorMessage: '',
      inProgress: false,
      model: {
        username: '',
        phone: ''
      }
    }
  },
  validations: {
    model: {
      username: {
        required,
        alpha
      },
      phone: {
        required,
        isPhone: isPhone
      }
    }
  },
  computed: {
    ...mapState({ mapUsersByNamePhone })
  },
  methods: {
    ...mapActions(['getUsers']),
    async loadUsersData() {
      try {
        await this.getUsers()
      } catch (err) {
        this.errorMessage = err
      }
    },
    async login() {
      this.$v.$touch()
      if (this.$v.$invalid) return
      this.inProgress = true
      this.errorMessage = ''

      const request = new Promise((resolve, reject) => {
        setTimeout(() => {
          const user =
            this.mapUsersByNamePhone[
              `${this.model.username}${this.model.phone}`
            ]
          if (user) resolve(user)
          else reject('login error')
        }, 3000)
      })

      try {
        const data = await request
        this.$router.push({
          name: routeNames.todos,
          params: { userId: data.id }
        })
      } catch (err) {
        this.errorMessage = err
      } finally {
        this.inProgress = false
      }
    }
  },
  mounted() {
    this.loadUsersData()
  }
}
</script>

<style lang="scss">
@import 'styles/variables';

.login-form {
  &__desc {
    font-size: 15px;
    font-weight: 400;
    line-height: 21px;
    letter-spacing: -0.025em;
    color: $text-color;
    margin-bottom: 14px;
  }

  &__error {
    padding: 0.75rem 1.25rem;
    margin-bottom: 1rem;
    border: 1px solid $alert-border-color;
    border-radius: 0.25rem;
    color: $alert-text-color;
    background-color: $alert-bg-color;
  }
}
</style>
