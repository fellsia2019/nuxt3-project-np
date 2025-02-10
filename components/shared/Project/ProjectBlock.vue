<template>
  <div class="projects-block">
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

    <div class="projects-block__shapes projects-block__shapes--1">
      <AnimationWrapper>
        <AnimateFigure icon="hexagon" class="projects-block__animate-figure" />
      </AnimationWrapper>
    </div>
    <div class="projects-block__shapes projects-block__shapes--2">
      <AnimationWrapper>
        <AnimateFigure icon="hexagon" class="projects-block__animate-figure" />
      </AnimationWrapper>
    </div>
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
  padding: 32px 0;

  @include mobile {
    padding: 18px 0;
  }

  // .projects-block__title
  &__title {
    margin-bottom: 24px;
  }

  // .projects-block__actions
  &__actions {
    margin-top: 24px;
  }

  // .projects-block__shapes
  &__shapes {
    position: absolute;

    // .projects-block__shapes--1
    &--1 {
      right: 45px;
      top: -150px;

      @include tablet {
        right: -60px;
        top: -60px;
      }
    }

    // .projects-block__shapes--2
    &--2 {
      left: 45px;
      bottom: -150px;

      @include tablet {
        left: -60px;
        bottom: -60px;
      }
    }
  }

  // .projects-block__animate-figure
  &__animate-figure {
    width: 300px;
    height: 300px;

    @include tablet {
      width: 200px;
      height: 200px;
    }
  }

  // .projects-block__inner
  &__inner {
    position: relative;
    z-index: 2;
  }
}
</style>
