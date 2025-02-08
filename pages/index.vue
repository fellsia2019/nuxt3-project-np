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
        title="Проекты"
        :projects="projectsStore.projects"
      >
        <template #title>
          <NuxtLink class="link" :to="{ name: 'projects' }">
            Проекты
          </NuxtLink>
        </template>
      </ProjectBlock>

      <InitiativeBlock
        v-if="initiativesStore?.initiatives?.length"
        class="home-page__block"
        :initiatives="initiativesStore.initiatives"
      >
        <template #title>
          <NuxtLink class="link" :to="{ name: 'initiatives' }">
            Инициативы
          </NuxtLink>
        </template>
      </InitiativeBlock>
    </div>
  </main>
</template>

<script setup lang="ts">
import { useProjectsStore } from '~/store/api/projects'
import { useInitiativesStore } from '~/store/api/initiatives'

const projectsStore = useProjectsStore();
const initiativesStore = useInitiativesStore();

await useAsyncData('projects', () => Promise.all([projectsStore.LOAD_PROJECTS(), initiativesStore.LOAD_INITIATIVES()]).then(() => true))
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
