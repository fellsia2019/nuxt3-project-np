<template>
	<div
		v-if="projectsStore?.project?.id"
		class="detail-project-page"
	>
		<DefaultDetailTemplate
			class="detail-project-page__section"
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

		<InitiativeBlock
			v-if="initiativesStore?.initiatives?.length"
			class="detail-project-page__section"
			:initiatives="initiativesStore.initiatives"
			:with-figures="false"
			:is-slider="true"
		>
			<template #title>
				Инициативы
			</template>
		</InitiativeBlock>

		<RecommendedBlock
			v-if="projectsStore.projects?.length"
			class="detail-project-page__section"
			:theme="AllBaseColors.PRIMARY"
			:cards="projectsStore.projects"
			route-name="projects-id"
			title="Другие проекты"
		/>
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
		initiativesStore.CLEAR()
		return
	}
	await initiativesStore.LOAD_INITIATIVES({ withReplace: true, page: 1, params: { id__in: projectsStore.project?.initiative_ids.join(',') } })
}

useAsyncData('project-detail', () => init().then(() => true))

useHead({
	title: projectsStore?.project?.title,
})
</script>

<style lang="scss">
$b: '.detail-project-page';

#{$b} {

	// .detail-project-page__section
	&__section {
		&:not(:last-child) {
			margin-bottom: 80px;

			@include tablet {
				margin-bottom: 48px;
			}
		}
	}
}
</style>
