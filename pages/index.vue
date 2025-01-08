<template>
  <main class="home-page">
    <div class="container">
      <h1 class="home-page__title title title-h1 color-primary">
        Главная страница
      </h1>
    </div>

    <div class="home-page__body">
      <ProjectBlock
        v-if="projectsStore?.projects?.length"
        class="home-page__block"
        :projects="projectsStore.projects"
        :can-load-more="projectsStore.HAS_NEXT_PAGE"
        @show-more="showMoreProjects"
      />

      <InitiativeBlock
        v-if="initiativesStore?.initiatives?.length"
        class="home-page__block"
        :initiatives="initiativesStore.initiatives"
        :can-load-more="initiativesStore.HAS_NEXT_PAGE"
        @show-more="showMoreInitiatives"
      />
    </div>
  </main>
</template>

<script setup lang="ts">
import { useProjectsStore } from '~/store/api/projects'
import { useInitiativesStore } from '~/store/api/initiatives'

const projectsStore = useProjectsStore();
const initiativesStore = useInitiativesStore();

await useAsyncData('projects', () => Promise.all([projectsStore.LOAD_PROJECTS(), initiativesStore.LOAD_INITIATIVES()]).then(() => true))

function showMoreProjects() {
  projectsStore.LOAD_PROJECTS(false, projectsStore.NEXT_PAGE_NUMBER)
}
function showMoreInitiatives() {
  initiativesStore.LOAD_INITIATIVES(false, initiativesStore.NEXT_PAGE_NUMBER)
}

</script>

<style lang="scss">
$b: '.home-page';

#{$b} {
  // .home-page__title
  &__title {
    margin-bottom: 40px;
  }

  // .home-page__block
  &__block {
    &:not(:last-child) {
      margin-bottom: 80px;

      @include tablet {
        margin-bottom: 64px;
      }

      @include mobile {
        margin-bottom: 48px;
      }
    }
  }
}
</style>
