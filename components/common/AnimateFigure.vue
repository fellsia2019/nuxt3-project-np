<template>
  <div class="animate-figure">
    <div
      v-for="i in levels"
      :key="`animate-figure__item-${i}`"
      class="animate-figure__item"
      :class="`animate-figure__item--${i}`"
    >
      <SvgIcon
        class="animate-figure__item-icon"
        :icon="icon"
      />
    </div>
  </div>
</template>

<script setup lang="ts">

interface IProps {
  icon: string;
  levels?: 2 | 3 | 4;
}

const props = withDefaults(defineProps<IProps>(), {
  levels: 3,
});

</script>

<style lang="scss">
$b: '.animate-figure';

#{$b} {
  position: relative;

  // .animate-figure__item
  &__item {
    width: 100%;
    height: 100%;

    &--2,
    &--3,
    &--4 {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
    }

    &--2 {
      max-width: 75%;
      max-height: 75%;
    }
    &--3 {
      max-width: 50%;
      max-height: 50%;
    }
    &--4 {
      max-width: 25%;
      max-height: 25%;
    }

    &--1,
    &--3 {
      #{$b}__item-icon {
        animation: RotateLeft 5s linear infinite, ChangeColor 10s linear infinite alternate;
      }
    }

    &--2,
    &--4 {
      #{$b}__item-icon {
        animation: RotateRight 5s linear infinite, ChangeColor 10s linear infinite alternate;
      }
    }

    // .animate-figure__item-icon
    &-icon {
      width: 100%;
      height: 100%;
    }
  }
}

@keyframes RotateLeft {
  from {
    transform: rotate(0deg);
  } to {
    transform: rotate(360deg);
  }
}
@keyframes RotateRight {
  from {
    transform: rotate(0deg);
  } to {
    transform: rotate(-360deg);
  }
}
@keyframes ChangeColor {
  0% {
    color: $color-light
  }
  25% {
    color: $color-primary;
  }
  50% {
    color: $color-primary-accent;
  }
  75% {
    color: $color-success;
  }
  100% {
    color: $color-danger;
  }
}
</style>
