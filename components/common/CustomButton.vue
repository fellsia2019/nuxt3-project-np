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
    box-shadow: 0 0 15px rgba($color-danger, 0.5);

    &:hover {
      background-color: transparent;
      color: $color-danger;
      box-shadow: 0 0 15px rgba($color-danger, 1);
    }
    &:active {
      background-color: $color-danger;
      color: $color-light;
      box-shadow: 0 0 15px rgba($color-danger, 0.5);
    }
  }

  // .custom-button--themes-primary
  &--themes-primary {
    background-color: $color-primary;
    color: $color-main;
    border-color: $color-primary;
    box-shadow: 0 0 15px rgba($color-primary, 0.5);

    &:hover {
      background-color: transparent;
      color: $color-primary;
      box-shadow: 0 0 15px rgba($color-primary, 1);
    }
    &:active {
      background-color: $color-primary;
      color: $color-light;
      box-shadow: 0 0 15px rgba($color-primary, 0.5);
    }
  }

  // .custom-button--themes-primary-accent
  &--themes-primary-accent {
    background-color: $color-primary-accent;
    color: $color-main;
    border-color: $color-primary-accent;
    box-shadow: 0 0 15px rgba($color-primary-accent, 0.5);

    &:hover {
      background-color: transparent;
      color: $color-primary-accent;
      box-shadow: 0 0 15px rgba($color-primary-accent, 1);
    }
    &:active {
      background-color: $color-primary-accent;
      color: $color-light;
      box-shadow: 0 0 15px rgba($color-primary-accent, 0.5);
    }
  }

  // .custom-button--themes-primary-outline
  &--themes-primary-outline {
    background-color: transparent;
    color: $color-primary;
    border-color: $color-primary;
    box-shadow: 0 0 15px rgba($color-primary, 0.5);

    &:hover {
      background-color: $color-primary;
      color: $color-main;
      box-shadow: 0 0 15px rgba($color-primary, 1);
    }
    &:active {
      background-color: transparent;
      color: $color-primary;
      border-color: $color-primary;
      box-shadow: 0 0 15px rgba($color-primary, 0.5);
    }
  }

  // .custom-button--themes-primary-accent-outline
  &--themes-primary-accent-outline {
    background-color: transparent;
    color: $color-primary-accent;
    border-color: $color-primary-accent;
    box-shadow: 0 0 15px rgba($color-primary-accent, 0.5);

    &:hover {
      background-color: $color-primary-accent;
      color: $color-main;
      box-shadow: 0 0 15px rgba($color-primary-accent, 1);
    }
    &:active {
      background-color: transparent;
      color: $color-primary-accent;
      border-color: $color-primary-accent;
      box-shadow: 0 0 15px rgba($color-primary-accent, 0.5);
    }
  }

  // .custom-button--themes-success
  &--themes-success {
    background-color: $color-success;
    color: $color-light;
    border-color: $color-success;
    box-shadow: 0 0 15px rgba($color-success, 0.5);

    &:hover {
      background-color: transparent;
      color: $color-success;
      box-shadow: 0 0 15px rgba($color-success, 1);
    }
    &:active {
      background-color: $color-success;
      color: $color-light;
      box-shadow: 0 0 15px rgba($color-success, 0.5);
    }
  }

  // .custom-button--themes-dark
  &--themes-dark {
    background-color: $color-main;
    color: $color-light;
    border-color: $color-main;
    box-shadow: 0 0 15px rgba($color-main, 0.5);

    &:hover {
      background-color: transparent;
      color: $color-main;
      box-shadow: 0 0 15px rgba($color-main, 1);
    }
    &:active {
      background-color: $color-main;
      color: $color-light;
      box-shadow: 0 0 15px rgba($color-main, 0.5);
    }
  }

  // .custom-button--themes-warning
  &--themes-warning {
    background-color: $color-warning;
    color: $color-light;
    border-color: $color-warning;
    box-shadow: 0 0 15px rgba($color-warning, 0.5);

    &:hover {
      background-color: transparent;
      color: $color-warning;
      box-shadow: 0 0 15px rgba($color-warning, 1);
    }
    &:active {
      background-color: $color-warning;
      color: $color-light;
      box-shadow: 0 0 15px rgba($color-warning, 0.5);
    }
  }

  // sizes
  // .custom-button--size-sm
  &--size-sm {
    padding: 10px 20px;
    border-radius: 20px;

    @include mobile {
      padding: 8px 16px;
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
