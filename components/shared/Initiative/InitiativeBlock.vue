<template>
  <div class="initiatives-block">
    <AnimationWrapper :parallaxEnabled="false">
      <div class="container">
        <div class="initiatives-block__inner">
          <h2 v-if="$slots.title" class="initiatives-block__title title title-h2">
            <slot name="title" />
          </h2>

          <InitiativeList :initiatives="initiatives"/>

          <div v-if="canLoadMore" class="initiatives-block__actions">
            <CustomButton @click="showMore" :theme="CustomButtonThemeSettings.PRIMARY_ACCENT">
              Показать ещё
            </CustomButton>
          </div>
        </div>
      </div>

      <div class="initiatives-block__shapes">
        <AnimationWrapper class="initiatives-block__shape initiatives-block__shape--1" :deltaPercent="0.25">
          <SvgIcon icon="square" class="initiatives-block__shape-icon initiatives-block__shape-icon--1" />
          <SvgIcon icon="square" class="initiatives-block__shape-icon initiatives-block__shape-icon--2" />
          <SvgIcon icon="square" class="initiatives-block__shape-icon initiatives-block__shape-icon--3" />
        </AnimationWrapper>

        <AnimationWrapper class="initiatives-block__shape initiatives-block__shape--2" :deltaPercent="0.25">
          <SvgIcon icon="square" class="initiatives-block__shape-icon initiatives-block__shape-icon--1" />
          <SvgIcon icon="square" class="initiatives-block__shape-icon initiatives-block__shape-icon--2" />
          <SvgIcon icon="square" class="initiatives-block__shape-icon initiatives-block__shape-icon--3" />
        </AnimationWrapper>
      </div>
    </AnimationWrapper>
  </div>
</template>

<script setup lang="ts">
import type { IInitiative } from '~/types/api/initiatives'
import { CustomButtonThemeSettings } from '~/types/common/CustomButton';

interface IInitiativesProps {
  initiatives: Array<IInitiative>;
  canLoadMore?: boolean;
}

interface IInitiativesEmits {
  (e: 'show-more'): void
}

const props = withDefaults(defineProps<IInitiativesProps>(), {
  canLoadMore: false,
});
const emit = defineEmits<IInitiativesEmits>()

function showMore() {
  emit('show-more')
}

</script>

<style lang="scss">
$b: '.initiatives-block';

#{$b} {
  position: relative;

  // .initiatives-block__title
  &__title {
    margin-bottom: 24px;
  }

  // .initiatives-block__actions
  &__actions {
    margin-top: 24px;
  }

  // .initiatives-block__shape
  &__shape {
    position: absolute;
    width: 300px;
    height: 300px;

    // .initiatives-block__shape--1
    &--1 {
      right: 45px;
      top: -150px;
    }

    // .initiatives-block__shape--2
    &--2 {
      left: 45px;
      bottom: -200px;
    }

    // .initiatives-block__shape-icon
    &-icon {
      position: absolute;
      width: 100%;
      height: 100%;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);

      &#{$b}__shape-icon--2 {
        max-width: 75%;
        max-height: 75%;
      }

      &#{$b}__shape-icon--3 {
        max-width: 50%;
        max-height: 50%;
      }

      &--1,
      &--3 {
        svg {
          animation: RotateLeft 5s linear infinite, ChangeColor 10s linear infinite alternate;
        }
      }

      &--2 {
        svg {
          animation: RotateRight 5s linear infinite, ChangeColor 10s linear infinite alternate;
        }
      }
    }
  }

  // .initiatives-block__inner
  &__inner {
    position: relative;
    z-index: 2;
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
