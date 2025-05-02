<template>
	<main class="articles-page">
		<div class="articles-page__inner">
			<div class="container">
				<div class="articles-page__header">
					<h1 class="articles-page__title title title-h1 color-danger">
						Статьи
					</h1>
				</div>
			</div>
			<div
				ref="articlesNode"
				class="articles-page__body"
			>
				<ArticleBlock
					v-if="articlesStore?.articles?.length"
					class="home-page__block"
					:articles="articlesStore.articles"
					:can-load-more="articlesStore.HAS_NEXT_PAGE"
					:pagination="articlesStore.PAGINATION"
					@show-more="showMore"
					@change-page="onChangePage"
				/>
			</div>
		</div>
	</main>
</template>

<script setup lang="ts">
import { useArticlesStore } from '~/store/api/articles'
import { scrollToBlock } from '~/helpers/scrollHelper'

useHead({
	title: 'Статьи',
})

const articlesNode = ref<HTMLElement | null>(null)

const articlesStore = useArticlesStore()

await useAsyncData('articles', () => articlesStore.LOAD_ARTICLES().then(() => true))

function showMore() {
	articlesStore.LOAD_ARTICLES({ withReplace: false, page: articlesStore.NEXT_PAGE_NUMBER })
}

async function onChangePage(page: number) {
	articlesStore.LOAD_ARTICLES({ withReplace: true, page })

	await nextTick()

	if (articlesNode.value) {
		scrollToBlock(articlesNode.value, true, 10)
	}
}
</script>

<style lang="scss">
$b: '.articles-page';

#{$b} {

  // .articles-page__header
  &__header {
    margin-bottom: 32px;

    @include mobile {
      margin-bottom: 24px;
    }
  }
}
</style>
