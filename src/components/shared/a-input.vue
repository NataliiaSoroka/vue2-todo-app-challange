<template>
  <div :class="wrapperClasses">
    <div class="a-input__container">
      <label v-if="label" class="a-input__label">
        {{ label }}
      </label>
      <input
        class="a-input__field"
        :value="value"
        :type="type"
        :disabled="disabled"
        :placeholder="placeholder"
        @blur="onBlur"
        @change="onChange"
        @focus="onFocus"
        @input="updateValue"
        @keyup.enter="emitKeyUpEnter"
      >
      <transition-group
        name="validation-fade"
        mode="out-in"
        class="a-input__validation"
      >
        <span v-if="hasValidationError" :key="validationMessage.validator">
          {{ validationMessage.message }}
        </span>
      </transition-group>
    </div>
  </div>
</template>

<script>
import validationMessages from 'utils/validation-error-messages'

export default {
  name: 'AInput',
  props: {
    label: {
      type: String,
      default: '',
    },
    value: {
      type: [String, Number]
    },
    type: {
      type: String,
      default: 'text'
    },
    error: {
      default: null
    },
    validateOnBlur: {
      type: Boolean,
      default: true
    },
    disabled: {
      type: Boolean,
      default: false
    },
    placeholder: {
      type: String,
      default: null
    },
    bordered: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    wrapperClasses() {
      return [
        'a-input__wrapper',
        { 'a-input--disabled': this.disabled },
        { 'a-input--error': this.hasValidationError },
        { 'a-input--bordered': this.bordered },
      ]
    },
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
    emitKeyUpEnter(e) {
      this.$emit('keyup', e.target.value)
    }
  }
}
</script>

<style lang="scss" scoped>
@import 'styles/variables';

.a-input {
  &__container {
    display: flex;
    flex-direction: column;
    position: relative;
    margin: 0 0 20px;
    padding: 0;
  }

  &__field {
    padding: 10px;
    border: 1px solid $white-color;
    border-radius: 5px;
    color: $input-text;
    font-size: 17px;
    font-weight: 400;
    line-height: 21px;
    background: $white-color;
    margin: 0;

    &::placeholder {
      color: $input-text;
      font-size: 17px;
      font-weight: 400;
      line-height: 21px;
      letter-spacing: -0.025em;
    }

    &:focus {
      outline: none;
      border: 1px solid $blue-color;
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

  &--bordered {
    .a-input__field {
      border-color: $light-gray;
    }
  }

  &--error {
    .a-input__field {
      border: 1px solid $red-color;
    }
  }

  &--disabled {
    .a-input__field {
      background-color: $light-gray;
    }
  }

}
</style>
