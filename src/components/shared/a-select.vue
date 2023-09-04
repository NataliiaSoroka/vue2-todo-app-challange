<template>
  <div class="a-select__container">
    <label v-if="label" class="a-select__label">
      {{ label }}
    </label>
    <select
      class="a-select__field"
      :class="{ 'a-select__field--error': hasValidationError }"
      :value="value"
      :disabled="disabled"
      @input="updateValue"
    >
      <option
        v-if="placeholder"
        disabled
        value=""
      >{{ placeholder }}</option>
      <option
        v-for="option in options"
        :key="option[optionValue]"
        :value="option[optionValue]"
      >
        {{ option[optionText] }}
      </option>
    </select>
    <transition-group name="validation-fade"
                      mode="out-in"
                      class="a-select__validation">
      <span v-if="hasValidationError" :key="validationMessage.validator">
        {{ validationMessage.message }}
      </span>
    </transition-group>
  </div>
</template>

<script>
import validationMessages from 'utils/validation-error-messages'

export default {
  name: 'ASelect',
  props: {
    label: {
      type: String,
      default: '',
    },
    value: {
      type: String,
      default: null,
    },
    options: {
      type: Array,
      default: () => [],
    },
    placeholder: {
      type: String,
      default: '',
    },
    optionText: {
      type: String,
      default: 'text',
    },
    optionValue: {
      type: String,
      default: 'value',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    error: {
      default: null
    },
    validateOnBlur: {
      type: Boolean,
      default: true
    },
  },
  computed: {
    errorReset() {
      return this.error?.$reset
    },
    errorTouch() {
      return this.error?.$touch
    },
    hasValidationError() {
      return this.error?.$error
    },
    validationMessage() {
      const { $params } = this.error
      if (this.hasValidationError) {
        for (const param in $params) {
          if (this.error[param] === false) {
            const matchedError = validationMessages.find(
              validation => validation.validator === param
            )
            if (!matchedError) {
              console.warn(
                'Validator is not listed in available validators in /validations/messages'
              )
              return {}
            } else {
              return matchedError
            }
          }
        }
      }
      return {}
    }
  },
  methods: {
    updateValue(e) {
      this.$emit('input', e.target.value)
    },
    onChange(e) {
      this.$emit('change', e.target.value, e)
    },
    onFocus(e) {
      if (this.errorReset) {
        this.error.$reset()
      }
      this.$emit('focus', e)
    },
    onBlur(e) {
      if (this.validateOnBlur && this.errorTouch) {
        this.error.$touch()
      }
      this.$emit('blur', e)
    },
  }
}
</script>

<style lang="scss" scoped>
@import 'styles/variables.scss';

.a-select {
  &__container {
    display: flex;
    flex-direction: column;
  }

  &__field {
    margin: 0 0 20px;
    padding: 10px;
    border: 1px solid $white-color;
    border-radius: 5px;
    color: $input-text;
    font-size: 17px;
    font-weight: 400;
    line-height: 21px;
    background: $white-color;

    &:focus {
      outline: none;
      border-color: $blue-color;
    }
  }

  &__validation {
    position: absolute;
    text-align: left;
    top: 100%;
    color: $red-color;
    border-bottom-color: $red-color;
    font-size: 13px;
    font-weight: 400;
    width: 100%;
    user-select: none;
  }

  &__label {
    color: $text-color;
    margin-bottom: 5px;
  }
}
</style>