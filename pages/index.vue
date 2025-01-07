<template>
  <main class="home-page">
    <div class="container">
      <h1 class="home-page__title title title-h1 color-primary">
        Главная страница
      </h1>
    </div>

    <ProjectBlock
      v-if="projectsStore?.projects?.length"
      :projects="projectsStore.projects"
      :can-load-more="projectsStore.HAS_NEXT_PAGE"
      @show-more="showMoreProjects"
    />
  </main>
</template>

<script setup lang="ts">
import { useProjectsStore } from '~/store/api/projects'

const projectsStore = useProjectsStore();

await useAsyncData('projects', () => projectsStore.LOAD_PROJECTS().then(() => true))

function showMoreProjects() {
  projectsStore.LOAD_PROJECTS(false, projectsStore.NEXT_PAGE_NUMBER)
}

</script>

<style lang="scss">
$b: '.home-page';

#{$b} {
  // .home-page__title
  &__title {
    margin-bottom: 40px;
  }
}
</style>
