<template>
  <div v-if="projectsStore?.project?.id" class="detail-project-page">
    <DefaultDetailTemplate
      :title="projectsStore?.project?.title"
      :content="projectsStore?.project?.content"
      :html="projectsStore?.project?.detail_text"
      :preview="{
        base: projectsStore?.project?.image || '',
        webp: projectsStore?.project?.image_webp || ''
      }"
    />
  </div>
</template>

<script setup lang="ts">
import { useProjectsStore } from '~/store/api/projects'

const route = useRoute()
const id: string = Array.isArray(route.params.id) ? route.params.id?.[0] : route.params.id

const projectsStore = useProjectsStore();

await useAsyncData('project-detail', () => projectsStore.LOAD_PROJECT(id).then(() => true))

</script>
