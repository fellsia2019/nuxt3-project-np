<template>
  <main class="home-page">
    <div class="container">
      <h1 class="home-page__title title title-h1">
        Главная страница
      </h1>
    </div>

    <ProjectBlock
      :projects="projectsStore.projects"
      :can-load-more="projectsStore.HAS_NEXT_PAGE"
      @show-more="showMoreProjects"
    />
  </main>
</template>

<script setup lang="ts">
import { useProjectsStore } from '~/store/api/projects'

const projectsStore = useProjectsStore();

projectsStore.LOAD_PROJECTS()

function showMoreProjects() {
  projectsStore.LOAD_PROJECTS(false, projectsStore.NEXT_PAGE_NUMBER)
}

</script>

<style lang="scss">
$b: '.home-page';

#{$b} {
  padding: 40px 0;

  // .home-page__title
  &__title {
    color: $color-primary;
    margin-bottom: 40px;
  }
}
</style>
