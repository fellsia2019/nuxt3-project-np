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
			<div class="articles-page__body">
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

const articlesStore = useArticlesStore()

await useAsyncData('articles', () => articlesStore.LOAD_ARTICLES().then(() => true))

function showMore() {
	articlesStore.LOAD_ARTICLES(false, articlesStore.NEXT_PAGE_NUMBER)
}

function onChangePage(page: number) {
	articlesStore.LOAD_ARTICLES(true, page)
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
