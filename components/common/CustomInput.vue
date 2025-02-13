<template>
  <div
    class="custom-input"
    :class="{
      'custom-input--is-readonly': readonly,
      'custom-input--is-disabled': disabled
    }"
  >
    <input
      :type="type"
      class="custom-input__input"
      :id="id"
      placeholder="placeholder"
      :autocomplete="autocomplete"
      :readonly="readonly"
      :value="modelValue"
      @input="onInput"
    >
    <label :for="id" class="custom-input__label">
      <slot />
    </label>
  </div>
</template>

<script lang="ts" setup>
type modelValueType = string | number | null;

interface ICustomInputEmits {
  (e: 'update:modelValue', value: modelValueType): void
}

interface ICustomInputProps {
  disabled?: boolean;
  isError?: boolean;
  isOutsideFocus?: boolean;
  modelValue: modelValueType;
  type?: string;
  autocomplete?: string;
  readonly?: boolean;
}

const props = withDefaults(defineProps<ICustomInputProps>(), {
  disabled: false,
  isError: false,
  isOutsideFocus: false,
  modelValue: '',
  type: 'text',
  readonly: false,
})

const emits = defineEmits<ICustomInputEmits>()

const id = useId()

function onInput(e: Event) {
  if (e.target instanceof HTMLInputElement) {
    emits('update:modelValue', e.target.value)
  }
}
</script>

<style lang="scss">
$b: '.custom-input';

#{$b} {
  position: relative;
  transition: $td;

  &--is-readonly,
  &--is-disabled {
    pointer-events: none;
    touch-action: none;
  }

  &--is-disabled {
    opacity: 0.5;
  }

  // .custom-input__input
  &__input {
    height: 56px;
    font-size: 16px;
    width: 100%;
    font-weight: 600;
    line-height: normal;
    padding: 20px 16px 5px 16px;
    border: none;
    outline: none;
    box-shadow: none;
    border-radius: 2px;
    border: 1px solid $color-primary;

    @include mobile {
      height: 48px;
    }

    &::placeholder {
      opacity: 0;
    }

    &:not(:placeholder-shown),
    &:focus,
    &:active {

      & ~ #{$b}__label {
        top: 0;
        font-size: 12px;
        color: $color-light;
        transform: unset;
        background-color: $color-main;
        padding: 2px;
        transform: translateY(-50%);

        @include mobile {
          font-size: 10px;
        }
      }
    }
  }

  // .custom-input__input
  &__label {
    position: absolute;
    transition: all 0.3s ease;
    pointer-events: none;
    touch-action: none;
    user-select: none;
    left: 16px;
    top: 50%;
    transform: translateY(-50%);
  }
}
</style>
