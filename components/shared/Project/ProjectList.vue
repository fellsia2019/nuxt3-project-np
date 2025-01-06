<template>
  <div class="project-list">
    <ProjectCard
      v-for="card in projects"
      :key="`project-list-item-${card.id}`"
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
}
</style>
