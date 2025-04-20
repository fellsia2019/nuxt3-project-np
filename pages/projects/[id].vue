<template>
	<div
		v-if="projectsStore?.project?.id"
		class="detail-project-page"
	>
		<DefaultDetailTemplate
			:title="projectsStore?.project?.title"
			:content="projectsStore?.project?.content"
			:html="projectsStore?.project?.detail_text"
			:detail-img="{
				base: projectsStore?.project?.image_detail || '',
				webp: projectsStore?.project?.image_detail_webp || '',
			}"
			:theme="AllBaseColors.PRIMARY"
			:time-create="projectsStore?.project?.time_create"
		/>
	</div>
</template>

<script setup lang="ts">
import { AllBaseColors } from '~/types/common/Themes'

import { useProjectsStore } from '~/store/api/projects'

const route = useRoute()
const id: string = Array.isArray(route.params.id) ? route.params.id?.[0] : route.params.id

const projectsStore = useProjectsStore()

await useAsyncData('project-detail', () => projectsStore.LOAD_PROJECT(id).then(() => true))

useHead({
	title: projectsStore?.project?.title,
})
</script>
