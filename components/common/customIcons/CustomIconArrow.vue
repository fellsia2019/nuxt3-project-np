<template>
  <div
    class="custom-icon-arrow"
    :class="[
      `custom-icon-arrow--direction-${direction} custom-icon-arrow--size-${size}`,
      { 'custom-icon-arrow--is-reverse': isReverse }
    ]"
  >
    <div class="custom-icon-arrow__item" />
    <div class="custom-icon-arrow__item" />
    <div class="custom-icon-arrow__item" />
  </div>
</template>

<script setup lang="ts">
import { CustomIconArrowDirectionSettings, CustomIconArrowSizeSettings } from '~/types/common/CustomIcons'

interface IProps {
  direction?: CustomIconArrowDirectionSettings;
  size?: CustomIconArrowSizeSettings;
  isReverse?: boolean;
}

const props = withDefaults(defineProps<IProps>(), {
  direction: CustomIconArrowDirectionSettings.BOTTOM,
  size: CustomIconArrowSizeSettings.MD,
  isReverse: false
})
</script>

<style lang="scss">
$b: '.custom-icon-arrow';
$ration-origin-x: 18;
$ration-origin-y: 10;

#{$b} {
  position: relative;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  --stroke-width: 2px;
  --size: 0px;

  &--direction-top,
  &--direction-bottom {
    aspect-ratio: #{$ration-origin-x}/#{$ration-origin-y};
    width: var(--size);
    height: auto;
  }

  &--direction-left,
  &--direction-right {
    aspect-ratio: #{$ration-origin-y}/#{$ration-origin-x};
    width: auto;
    height: var(--size);
  }

  // .custom-icon-arrow--size-md
  &--size-md {
    --size: 32px;

    @include tablet {
      --size: 26px;
    }
  }

  // .custom-icon-arrow--size-sm
  &--size-sm {
    --size: 22px;

    @include tablet {
      --size: 18px;
    }
  }

  // .custom-icon-arrow--size-lg
  &--size-lg {
    --stroke-width: 3px;
    --size: 44px;

    @include tablet {
      --size: 32px;
    }
  }

  // .custom-icon-arrow__item
  &__item {
    position: absolute;
    background-color: currentColor;
    transition: $td;

    // стрелка вниз
    #{$b}--direction-bottom & {
      left: 50%;
      width: 100%;
      transform: translateX(-50%);

      &:nth-child(1) {
        top: 0;
        max-width: 100%;
        height: var(--stroke-width);
      }
      &:nth-child(2) {
        top: 50%;
        max-width: 60%;
        height: var(--stroke-width);
      }
      &:nth-child(3) {
        bottom: 0;
        max-width: 15%;
        height: var(--stroke-width);
      }
    }
    #{$b}--direction-bottom#{$b}--is-reverse & {
      &:nth-child(3) {
        max-width: 100%;
      }
      &:nth-child(2) {
        max-width: 60%;
      }
      &:nth-child(1) {
        max-width: 15%;
      }
    }

    // стрелка вверх
    #{$b}--direction-top & {
      left: 50%;
      width: 100%;
      transform: translateX(-50%);

      &:nth-child(1) {
        top: 0;
        max-width: 15%;
        height: var(--stroke-width);
      }
      &:nth-child(2) {
        top: calc(50% - 1px);
        max-width: 60%;
        height: var(--stroke-width);
      }
      &:nth-child(3) {
        bottom: 0;
        max-width: 100%;
        height: var(--stroke-width);
      }
    }
    #{$b}--direction-top#{$b}--is-reverse & {
      &:nth-child(1) {
        max-width: 100%;
      }
      &:nth-child(2) {
        max-width: 60%;
      }
      &:nth-child(3) {
        max-width: 15%;
      }
    }

    // стрелка влево
    #{$b}--direction-left & {
      top: 50%;
      width: 100%;
      transform: translateY(-50%);

      &:nth-child(1) {
        left: 0;
        max-width: var(--stroke-width);
        height: 15%;
      }
      &:nth-child(2) {
        left: 50%;
        max-width: var(--stroke-width);
        height: 60%;
      }
      &:nth-child(3) {
        right: 0;
        max-width: var(--stroke-width);
        height: 100%;
      }
    }
    #{$b}--direction-left#{$b}--is-reverse & {
      &:nth-child(1) {
        height: 100%;
      }
      &:nth-child(2) {
        height: 60%;
      }
      &:nth-child(3) {
        height: 15%;
      }
    }

    // стрелка вправо
    #{$b}--direction-right & {
      top: 50%;
      width: 100%;
      transform: translateY(-50%);

      &:nth-child(1) {
        left: 0;
        max-width: var(--stroke-width);
        height: 100%;
      }
      &:nth-child(2) {
        left: 50%;
        max-width: var(--stroke-width);
        height: 60%;
      }
      &:nth-child(3) {
        right: 0;
        max-width: var(--stroke-width);
        height: 15%;
      }
    }
    #{$b}--direction-right#{$b}--is-reverse & {
      &:nth-child(1) {
        height: 15%;
      }
      &:nth-child(2) {
        height: 60%;
      }
      &:nth-child(3) {
        height: 100%;
      }
    }
  }
}
</style>
