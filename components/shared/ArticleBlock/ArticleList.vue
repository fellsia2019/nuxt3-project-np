<template>
	<div class="articles-list">
		<ArticleCard
			v-for="card in articles"
			:key="`articles-list-item-${card.id}`"
			class="articles-list__card"
			:card="card"
		/>
	</div>
</template>

<script setup lang="ts">
import type { IArticle } from '~/types/api/articles'

interface IArticlesListProps {
	articles: Array<IArticle>
}

defineProps<IArticlesListProps>()
</script>

<style lang="scss">
$b: '.articles-list';

#{$b} {
  @include gridcols(1, 16px);

  // .articles-list__card
  &__card {

  }
}
</style>
