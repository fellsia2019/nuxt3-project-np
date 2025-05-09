<template>
	<div
		class="articles-block"
		:class="{ 'articles-block--with-figures': withFigures }"
	>
		<div class="container">
			<div class="articles-block__inner">
				<h2
					v-if="$slots.title"
					class="articles-block__title title title-h2"
				>
					<slot name="title" />
				</h2>

				<ArticlesSlider
					v-if="isSlider"
					:articles="articles"
				/>
				<ArticleList
					v-else
					:articles="articles"
				/>

				<CustomPagination
					v-if="pagination && pagination.total_pages > 1"
					class="projects-block__actions"
					:theme="AllBaseColors.DANGER"
					:current-page="pagination.current_page"
					:count-pages="pagination.total_pages"
					:hidden-more-btn="!canLoadMore"
					@show-more="showMore"
					@change="onChangePagination"
				/>
			</div>
		</div>

		<div
			v-if="withFigures"
			class="articles-block__shapes articles-block__shapes--1"
		>
			<AnimationWrapper>
				<AnimateFigure
					:items="figuresSquares"
					class="articles-block__animate-figure"
				/>
			</AnimationWrapper>
		</div>
		<div
			v-if="withFigures"
			class="articles-block__shapes articles-block__shapes--2"
		>
			<AnimationWrapper>
				<AnimateFigure
					:items="figuresSquares"
					class="articles-block__animate-figure"
				/>
			</AnimationWrapper>
		</div>
	</div>
</template>

<script setup lang="ts">
import type { IArticle } from '~/types/api/articles'
import type { IPaginationApi } from '~/types/api/common'
import { AllBaseColors } from '~/types/common/Themes'

interface IArticlesProps {
	articles: Array<IArticle>
	canLoadMore?: boolean
	pagination?: IPaginationApi
	withFigures?: boolean
	isSlider?: boolean
}

interface IIArticlesEmits {
	(e: 'show-more'): void
	(e: 'change-page', page: number): void
}

withDefaults(defineProps<IArticlesProps>(), {
	canLoadMore: false,
	withFigures: true,
	isSlider: false,
})
const emits = defineEmits<IIArticlesEmits>()

const figuresSquares = [
	{
		icon: 'circle',
	},
	{
		icon: 'circle',
	},
	{
		icon: 'circle',
	},
]

function showMore() {
	emits('show-more')
}
function onChangePagination(page: number) {
	emits('change-page', page)
}
</script>

<style lang="scss">
$b: '.articles-block';

#{$b} {
  // .articles-block--with-figures
	&--with-figures {
		position: relative;
		padding: 32px 0;

		@include mobile {
			padding: 18px 0;
		}
	}

  // .articles-block__title
  &__title {
    margin-bottom: 24px;
  }

  // .articles-block__actions
  &__actions {
    margin-top: 24px;
  }

  // .articles-block__shapes
  &__shapes {
    position: absolute;

    // .articles-block__shapes--1
    &--1 {
      right: 45px;
      top: -100px;

      @include tablet {
        right: -60px;
        top: -60px;
      }
    }

    // .articles-block__shapes--2
    &--2 {
      left: 45px;
      bottom: -150px;

      @include tablet {
        left: -60px;
        bottom: -60px;
      }
    }
  }

  // .articles-block__animate-figure
  &__animate-figure {
    width: 250px;
    height: 250px;

    @include tablet {
      width: 150px;
      height: 150px;
    }
  }

  // .articles-block__inner
  &__inner {
    position: relative;
    z-index: 2;
  }
}
</style>
