<template>
  <div v-if="projectsStore?.project?.id" class="detail-project-page">
    <div class="container">
      <div class="detail-project-page__inner">
        <h1 class="detail-project-page__title title title-h1 color-primary">
          {{ projectsStore?.project?.title }}
        </h1>
      </div>


      <div class="detail-project-page__body">
        <picture v-if="projectsStore?.project?.image">
          <source v-if="projectsStore?.project?.image_webp" :srcset="projectsStore?.project?.image_webp" type="image/webp">
          <img :src="projectsStore?.project?.image" :alt="projectsStore?.project?.title">
        </picture>

        <p>
          {{ projectsStore?.project?.content }}
        </p>

        <div v-if="projectsStore?.project?.detail_text" v-html="projectsStore?.project?.detail_text" />
      </div>
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
