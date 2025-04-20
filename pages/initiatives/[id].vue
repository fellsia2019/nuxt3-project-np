<template>
	<div
		v-if="initiativesStore?.initiative?.id"
		class="detail-project-page"
	>
		<DefaultDetailTemplate
			:title="initiativesStore?.initiative?.title"
			:content="initiativesStore?.initiative?.content"
			:html="initiativesStore?.initiative?.detail_text"
			:detail-img="{
				base: initiativesStore?.initiative?.image_detail || '',
				webp: initiativesStore?.initiative?.image_detail_webp || '',
			}"
			:theme="AllBaseColors.PRIMARY_ACCENT"
			:time-create="initiativesStore?.initiative?.time_create"
		/>
	</div>
</template>

<script setup lang="ts">
import { AllBaseColors } from '~/types/common/Themes'

import { useInitiativesStore } from '~/store/api/initiatives'

const route = useRoute()
const id: string = Array.isArray(route.params.id) ? route.params.id?.[0] : route.params.id

const initiativesStore = useInitiativesStore()

await useAsyncData('project-detail', () => initiativesStore.LOAD_INITIATIVE(id).then(() => true))
</script>
