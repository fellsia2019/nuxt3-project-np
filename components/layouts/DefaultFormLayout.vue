<template>
  <form class="default-form-layout" @submit.prevent="$emit('submit')">
    <slot />
  </form>
</template>

<style lang="scss">
$b: '.default-form-layout';

#{$b} {
  width: 100%;

  // .default-form-layout__fields
  &__fields {
    &:not(:last-child) {
      margin-bottom: 24px;
    }
  }

  // .default-form-layout__field
  &__field {
    &:not(:last-child) {
      margin-bottom: 24px;
    }
  }

  // .default-form-layout__actions
  &__actions {
    display: flex;
    flex-wrap: wrap;
    gap: 16px;
    align-items: center;
    justify-content: center;

    @include mobile {
      flex-direction: column;
    }
  }
}
</style>
