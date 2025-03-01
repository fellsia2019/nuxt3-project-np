<template>
  <div class="projects-block">
    <div class="container">
      <div class="projects-block__inner">
        <h2 v-if="$slots.title" class="projects-block__title title title-h2">
          <slot name="title" />
        </h2>

        <ProjectList :projects="projects"/>

        <CustomPagination
          v-if="pagination.total_pages > 1"
          class="projects-block__actions"
          :currentPage="pagination.current_page"
          :countPages="pagination.total_pages"
          :hiddenMoreBtn="!canLoadMore"
          @show-more="showMore"
          @change="onChangePagination"
        />
      </div>
    </div>

    <div class="projects-block__shapes projects-block__shapes--1">
      <AnimationWrapper>
        <AnimateFigure :items="figuresHexagons" class="projects-block__animate-figure" />
      </AnimationWrapper>
    </div>
    <div class="projects-block__shapes projects-block__shapes--2">
      <AnimationWrapper>
        <AnimateFigure :items="figuresHexagons" class="projects-block__animate-figure" />
      </AnimationWrapper>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { IProject } from '~/types/api/projects'
import type { IPaginationApi } from '~/types/api/common';

interface IProjectProps {
  projects: Array<IProject>;
  canLoadMore?: boolean;
  pagination: IPaginationApi;
}

interface IProjectEmits {
  (e: 'show-more'): void,
  (e: 'change-page', page: number): void
}

const props = withDefaults(defineProps<IProjectProps>(), {
  canLoadMore: false,
});
const emits = defineEmits<IProjectEmits>()

const figuresHexagons = [
  {
    icon: 'hexagon'
  },
  {
    icon: 'hexagon'
  },
  {
    icon: 'hexagon'
  },
]

function showMore() {
  emits('show-more')
}

function onChangePagination(page: number) {
  emits('change-page', page)
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
