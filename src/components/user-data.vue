<template>
  <a-card :title="user.username">
    <div class="user-data">
      <div
        v-for="row in userDataView"
        :key="row.field"
        class="user-data__row"
      >
        <div class="user-data__icon">
          <i :class="`las la-${row.icon}`"></i>
        </div>
        <div class="user-data__info">
          {{ user[row.field] }}
        </div>
      </div>
    </div>
  </a-card>
</template>

<script>
import userDataView from 'constants/user-data-view'
import { ACard } from 'components/shared';

export default {
  name: 'UserData',
  components: { ACard },
  data() {
    return {
      userDataView,
    }
  },
  props: {
    user: {
      type: Object,
      default: () => ({})
    }
  },

}
</script>

<style lang="scss">
@import 'styles/variables.scss';

.user-data {
  color: $text-color;

  &__row {
    width: 100%;
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
  }

  &__icon {
    width: 20px;
  }

  &__info {
    width: calc(100% - 25px);
  }
}
</style>