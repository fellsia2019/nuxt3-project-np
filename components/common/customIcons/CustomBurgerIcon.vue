<template>
  <div class="custom-burger-icon" :class="{ 'custom-burger-icon--is-active': isActive }">
    <div class="custom-burger-icon__item"></div>
    <div class="custom-burger-icon__item"></div>
    <div class="custom-burger-icon__item"></div>
  </div>
</template>

<script setup lang="ts">
interface IProps {
  isActive?: boolean;
}

const props = defineProps<IProps>()
</script>

<style lang="scss">
$b: '.custom-burger-icon';

#{$b} {
  position: relative;
  width: 30px;
  height: 24px;
  cursor: pointer;

  // .custom-burger-icon__item
  &__item {
    position: absolute;
    left: 0;
    width: 100%;
    height: 2px;
    background-color: currentColor;
    transition: all 0.3s ease;

    &:nth-child(1) {
      top: 0;

      #{$b}--is-active & {
        transform: rotate(39deg);
        top: 11px;
        left: -3px;
        width: calc(100% + 6px);
      }
    }
    &:nth-child(2) {
      top: 50%;

      #{$b}--is-active & {
        opacity: 0;
        pointer-events: none;
        touch-action: none;
      }
    }
    &:nth-child(3) {
      top: 100%;

      #{$b}--is-active & {
        transform: rotate(-39deg);
        top: 11px;
        width: calc(100% + 6px);
        left: -3px;
      }
    }
  }
}
</style>
