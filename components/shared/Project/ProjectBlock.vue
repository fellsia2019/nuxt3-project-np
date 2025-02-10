<template>
  <div class="projects-block">
    <AnimationWrapper :parallaxEnabled="false">
      <div class="container">
        <div class="projects-block__inner">
          <h2 v-if="$slots.title" class="projects-block__title title title-h2">
            <slot name="title" />
          </h2>

          <ProjectList :projects="projects"/>

          <div v-if="canLoadMore" class="projects-block__actions">
            <CustomButton @click="showMore">
              Показать ещё
            </CustomButton>
          </div>
        </div>
      </div>

      <div class="projects-block__shapes">
        <AnimationWrapper class="projects-block__shape projects-block__shape--1" :deltaPercent="0.25">
          <SvgIcon icon="hexagon" class="projects-block__shape-icon projects-block__shape-icon--1" />
          <SvgIcon icon="hexagon" class="projects-block__shape-icon projects-block__shape-icon--2" />
          <SvgIcon icon="hexagon" class="projects-block__shape-icon projects-block__shape-icon--3" />
        </AnimationWrapper>

        <AnimationWrapper class="projects-block__shape projects-block__shape--2" :deltaPercent="0.25">
          <SvgIcon icon="hexagon" class="projects-block__shape-icon projects-block__shape-icon--1" />
          <SvgIcon icon="hexagon" class="projects-block__shape-icon projects-block__shape-icon--2" />
          <SvgIcon icon="hexagon" class="projects-block__shape-icon projects-block__shape-icon--3" />
        </AnimationWrapper>
      </div>
    </AnimationWrapper>
  </div>
</template>

<script setup lang="ts">
import type { IProject } from '~/types/api/projects'

interface IProjectProps {
  projects: Array<IProject>;
  canLoadMore?: boolean;
}

interface IProjectEmits {
  (e: 'show-more'): void
}

const props = withDefaults(defineProps<IProjectProps>(), {
  canLoadMore: false,
});
const emits = defineEmits<IProjectEmits>()

function showMore() {
  emits('show-more')
}

</script>

<style lang="scss">
$b: '.projects-block';

#{$b} {
  position: relative;

  // .projects-block__title
  &__title {
    margin-bottom: 24px;
  }

  // .projects-block__actions
  &__actions {
    margin-top: 24px;
  }

  // .projects-block__shape
  &__shape {
    position: absolute;
    width: 300px;
    height: 300px;

    // .projects-block__shape--1
    &--1 {
      right: 45px;
      top: -150px;
    }

    // .projects-block__shape--2
    &--2 {
      left: 45px;
      bottom: -200px;
    }

    // .projects-block__shape-icon
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

  // .projects-block__inner
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
