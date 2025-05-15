<template>
	<div
		v-if="articlesStore?.article?.id"
		class="detail-articles-page"
	>
		<DefaultDetailTemplate
			class="detail-articles-page__section"
			:breadcrumbs="breadcrumbs"
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

		<RecommendedBlock
			v-if="articlesStore?.articles?.length"
			class="detail-articles-page__section"
			:theme="AllBaseColors.DANGER"
			:cards="articlesStore?.articles"
			route-name="articles-id"
			title="Другие статьи"
		/>
	</div>
</template>

<script setup lang="ts">
import { AllBaseColors } from '~/types/common/Themes'
import { useArticlesStore } from '~/store/api/articles'

const route = useRoute()
const id: string = Array.isArray(route.params.id) ? route.params.id?.[0] : route.params.id

const articlesStore = useArticlesStore()

const init = async () => {
	await articlesStore.LOAD_ARTICLE(id)
	await articlesStore.LOAD_ARTICLES({ withReplace: true, page: 1, params: { id__exclude: id } })
}

await useAsyncData(`article-detail-${id}`, () => init().then(() => true))

useHead({
	title: `Статья: ${articlesStore?.article?.title}`,
})

const breadcrumbs = useBreadcrumbItems({
	schemaOrg: true,
	overrides: [
		undefined,
		undefined,
		{ label: articlesStore?.article?.title || '', to: `/articles/${articlesStore?.article?.id}` },
	],
}) as ComputedRef<IBreadcrumbItem[]>
</script>

<style lang="scss">
$b: '.detail-articles-page';

#{$b} {

	// .detail-articles-page__section
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
