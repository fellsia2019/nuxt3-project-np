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

		<RecommendedBlock
			:theme="AllBaseColors.PRIMARY"
			:cards="projectsStore.projects"
			route-name="projects-id"
		/>

		<pre>
			{{ initiativesStore.initiatives }}
		</pre>
	</div>
</template>

<script setup lang="ts">
import { AllBaseColors } from '~/types/common/Themes'

import { useProjectsStore } from '~/store/api/projects'
import { useInitiativesStore } from '~/store/api/initiatives'

const route = useRoute()
const id: string = Array.isArray(route.params.id) ? route.params.id?.[0] : route.params.id

const projectsStore = useProjectsStore()
const initiativesStore = useInitiativesStore()

const init = async () => {
	await projectsStore.LOAD_PROJECT(id)
	await projectsStore.LOAD_PROJECTS({ withReplace: true, page: 1, params: { id__exclude: id } })
	if (!projectsStore.project?.initiative_ids?.length) {
		return
	}
	await initiativesStore.LOAD_INITIATIVES({ withReplace: true, page: 1, params: { id__in: projectsStore.project?.initiative_ids.join(',') } })
}

useAsyncData('project-detail', () => init().then(() => true))

useHead({
	title: projectsStore?.project?.title,
})
</script>
