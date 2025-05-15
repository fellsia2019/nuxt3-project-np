<template>
	<div
		v-if="initiativesStore?.initiative?.id"
		class="detail-initiatives-page"
	>
		<DefaultDetailTemplate
			class="detail-initiatives-page__section"
			:breadcrumbs="breadcrumbs"
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

		<ArticleBlock
			v-if="articlesStore?.articles?.length"
			class="detail-initiatives-page__section"
			:articles="articlesStore.articles"
			:with-figures="false"
			:is-slider="true"
		>
			<template #title>
				Статьи
			</template>
		</ArticleBlock>

		<RecommendedBlock
			v-if="initiativesStore?.initiatives?.length"
			class="detail-initiatives-page__section"
			:theme="AllBaseColors.PRIMARY_ACCENT"
			:cards="initiativesStore.initiatives"
			route-name="initiatives-id"
			title="Другие инициативы"
		/>
	</div>
</template>

<script setup lang="ts">
import { AllBaseColors } from '~/types/common/Themes'

import { useInitiativesStore } from '~/store/api/initiatives'
import { useArticlesStore } from '~/store/api/articles'

const route = useRoute()
const id: string = Array.isArray(route.params.id) ? route.params.id?.[0] : route.params.id

const initiativesStore = useInitiativesStore()
const articlesStore = useArticlesStore()

const init = async () => {
	await initiativesStore.LOAD_INITIATIVE(id)
	await initiativesStore.LOAD_INITIATIVES({ withReplace: true, page: 1, params: { id__exclude: id } })
	if (!initiativesStore.initiative?.article_ids?.length) {
		articlesStore.CLEAR()
		return
	}
	await articlesStore.LOAD_ARTICLES({ withReplace: true, page: 1, params: { id__in: initiativesStore.initiative?.article_ids.join(',') } })
}

await useAsyncData(`initiative-detail-${id}`, () => init().then(() => true))

useHead({
	title: `Инициатива: ${initiativesStore?.initiative?.title}`,
})

const breadcrumbs = useBreadcrumbItems({
	schemaOrg: true,
	overrides: [
		undefined,
		undefined,
		{ label: initiativesStore?.initiative?.title || '', to: `/initiatives/${initiativesStore?.initiative?.id}` },
	],
}) as ComputedRef<Array<IBreadcrumbItem>>
</script>

<style lang="scss">
$b: '.detail-initiatives-page';

#{$b} {

	// .detail-initiatives-page__section
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
