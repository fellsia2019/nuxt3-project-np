<template>
	<div class="animate-figure">
		<div
			v-for="(item, i) in items"
			:key="`animate-figure__item-${item.icon}-${i}`"
			class="animate-figure__item"
			:class="`animate-figure__item--${i + 1}`"
		>
			<SvgIcon
				class="animate-figure__item-icon"
				:class="{ 'animate-figure__item-icon--no-rotate': item.noRotate }"
				:icon="item.icon"
			/>
		</div>
	</div>
</template>

<script setup lang="ts">
interface IProps {
	items: Array<{ icon: string, noRotate?: boolean }>
}

defineProps<IProps>()
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
        animation: ChangeColor 10s linear infinite alternate, RotateLeft 5s linear infinite;

        &#{$b}__item-icon--no-rotate {
          animation: ChangeColor 10s linear infinite alternate;
        }
      }
    }

    &--2,
    &--4 {
      #{$b}__item-icon {
        animation: ChangeColor 10s linear infinite alternate, RotateRight 5s linear infinite;

        &#{$b}__item-icon--no-rotate {
          animation: ChangeColor 10s linear infinite alternate;
        }
      }
    }

    // .animate-figure__item-icon
    &-icon {
			position: relative;
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
    color: $color-light;
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
