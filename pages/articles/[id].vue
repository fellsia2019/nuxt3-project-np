<template>
	<div
		v-if="articlesStore?.article?.id"
		class="detail-project-page"
	>
		<DefaultDetailTemplate
			:title="articlesStore?.article?.title"
			:content="articlesStore?.article?.content"
			:html="articlesStore?.article?.detail_text"
			:detail-img="{
				base: articlesStore?.article?.image_detail || '',
				webp: articlesStore?.article?.image_detail_webp || '',
			}"
			:theme="AllBaseColors.DANGER"
			:time-create="articlesStore?.article?.time_create"
		/>
	</div>
</template>

<script setup lang="ts">
import { AllBaseColors } from '~/types/common/Themes'

import { useArticlesStore } from '~/store/api/articles'

const route = useRoute()
const id: string = Array.isArray(route.params.id) ? route.params.id?.[0] : route.params.id

const articlesStore = useArticlesStore()

await useAsyncData('project-detail', () => articlesStore.LOAD_ARTICLE(id).then(() => true))
</script>
