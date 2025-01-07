<template>
  <div v-if="projectsStore?.project?.id" class="detail-project-page">
    <div class="container">
      <div class="detail-project-page__inner">
        <h1 class="detail-project-page__title title title-h1 color-primary">
          {{ projectsStore?.project?.title }}
        </h1>
      </div>

      <pre>
        {{ projectsStore?.project }}
      </pre>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useProjectsStore } from '~/store/api/projects'

const route = useRoute()
const id: string = Array.isArray(route.params.id) ? route.params.id?.[0] : route.params.id

const projectsStore = useProjectsStore();

await useAsyncData('project-detail', () => projectsStore.LOAD_PROJECT(id).then(() => true))

</script>
