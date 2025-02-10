<template>
  <div class="project-list">
    <ProjectCard
      v-for="card in projects"
      :key="`project-list-item-${card.id}`"
      class="project-list__card"
      :card="card"
    />
  </div>
</template>

<script setup lang="ts">
import type { IProject } from '~/types/api/projects'

interface IProjectListProps {
  projects: Array<IProject>
}

const props = defineProps<IProjectListProps>()

</script>

<style lang="scss">
$b: '.project-list';

#{$b} {
  @include gridcols(3, 16px);

  @include tablet {
    @include gridcols(2, 16px);
  }

  @include mobile {
    @include gridcols(1, 16px);
  }

  // .project-list__card
  &__card {
    &:last-child {
      &:nth-child(odd) {
        @include tablet-only {
          grid-column-start: 1;
          grid-column-end: 3;
        }
      }
    }
  }
}
</style>
