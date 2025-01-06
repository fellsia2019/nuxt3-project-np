<template>
  <component :is="resultTag" class="custom-button" :class="rootClass" :href="href">
    <slot />
  </component>
</template>

<script setup lang="ts">
import { CustomButtonSizeSettings, CustomButtonThemeSettings } from '~/types/common/CustomButton';

interface ICustomButtonProps {
  tag?: string;
  href?: string;
  size?: CustomButtonSizeSettings;
  theme?: CustomButtonThemeSettings;
  disabled?: boolean;
}

const props = withDefaults(defineProps<ICustomButtonProps>(), {
  tag: 'button',
  href: '',
  size: CustomButtonSizeSettings.MD,
  theme: CustomButtonThemeSettings.PRIMARY,
  disabled: false,
});

const resultTag = computed(() => props.href ? 'a' : props.tag)

const rootClass = computed(() => {
  const prefix = 'custom-button'
  const classes = []

  if (props.disabled) {
    classes.push(`${prefix}--disabled`)
  }

  classes.push(`${prefix}--size-${props.size}`)
  classes.push(`${prefix}--themes-${props.theme}`)

  return classes.join(' ')
})
</script>

<style lang="scss">
$b: '.custom-button';

#{$b} {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  white-space: nowrap;
  user-select: none;
  transition: $td;
  border: 1px solid transparent;
  cursor: pointer;
  font-weight: 500;

  // themes
  // .custom-button--themes-danger
  &--themes-danger {
    background-color: $color-danger;
    color: $color-light;
    border-color: $color-danger;

    &:hover {
      background-color: transparent;
      color: $color-danger;
    }
    &:active {
      background-color: $color-danger;
      color: $color-light;
    }
  }

  // .custom-button--themes-primary
  &--themes-primary {
    background-color: $color-primary;
    color: $color-main;
    border-color: $color-primary;

    &:hover {
      background-color: transparent;
      color: $color-primary;
    }
    &:active {
      background-color: $color-primary;
      color: $color-light;
    }
  }

  // .custom-button--themes-success
  &--themes-success {
    background-color: $color-success;
    color: $color-light;
    border-color: $color-success;

    &:hover {
      background-color: transparent;
      color: $color-success;
    }
    &:active {
      background-color: $color-success;
      color: $color-light;
    }
  }

  // .custom-button--themes-dark
  &--themes-dark {
    background-color: $color-dark;
    color: $color-light;
    border-color: $color-dark;

    &:hover {
      background-color: transparent;
      color: $color-dark;
    }
    &:active {
      background-color: $color-dark;
      color: $color-light;
    }
  }

  // .custom-button--themes-warning
  &--themes-warning {
    background-color: $color-warning;
    color: $color-light;
    border-color: $color-warning;

    &:hover {
      background-color: transparent;
      color: $color-warning;
    }
    &:active {
      background-color: $color-warning;
      color: $color-light;
    }
  }

  // sizes
  // .custom-button--size-sm
  &--size-sm {
    padding: 14px 20px;
    border-radius: 20px;

    @include mobile {
      padding: 12px 16px;
    }
  }

  // .custom-button--size-md
  &--size-md {
    padding: 14px 40px;
    border-radius: 30px;

    @include mobile {
      padding: 12px 26px;
    }
  }

  // .custom-button--size-lg
  &--size-lg {
    padding: 22px 30px;
    border-radius: 25px;
    font-size: 18px;

    @include mobile {
      padding: 12px 22px;
    }
  }
}
</style>
