<template>
	<div
		class="initiatives-block"
		:class="{ 'initiatives-block--with-figures': withFigures }"
	>
		<div class="container">
			<div class="initiatives-block__inner">
				<h2
					v-if="$slots.title"
					class="initiatives-block__title title title-h2"
				>
					<slot name="title" />
				</h2>

				<InitiativesSlider
					v-if="isSlider"
					:initiatives="initiatives"
				/>
				<InitiativeList
					v-else
					:initiatives="initiatives"
				/>

				<CustomPagination
					v-if="pagination && pagination.total_pages > 1"
					class="projects-block__actions"
					:theme="AllBaseColors.PRIMARY_ACCENT"
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
			class="initiatives-block__shapes initiatives-block__shapes--1"
		>
			<AnimationWrapper>
				<AnimateFigure
					:items="figuresSquares"
					class="initiatives-block__animate-figure"
				/>
			</AnimationWrapper>
		</div>
		<div
			v-if="withFigures"
			class="initiatives-block__shapes initiatives-block__shapes--2"
		>
			<AnimationWrapper>
				<AnimateFigure
					:items="figuresSquares"
					class="initiatives-block__animate-figure"
				/>
			</AnimationWrapper>
		</div>
	</div>
</template>

<script setup lang="ts">
import type { IInitiative } from '~/types/api/initiatives'
import type { IPaginationApi } from '~/types/api/common'
import { AllBaseColors } from '~/types/common/Themes'

interface IInitiativesProps {
	initiatives: Array<IInitiative>
	canLoadMore?: boolean
	pagination?: IPaginationApi
	withFigures?: boolean
	isSlider?: boolean
}

interface IInitiativesEmits {
	(e: 'show-more'): void
	(e: 'change-page', page: number): void
}

withDefaults(defineProps<IInitiativesProps>(), {
	canLoadMore: false,
	withFigures: true,
	isSlider: false,
})
const emits = defineEmits<IInitiativesEmits>()

const figuresSquares = [
	{
		icon: 'square',
	},
	{
		icon: 'square',
	},
	{
		icon: 'square',
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
$b: '.initiatives-block';

#{$b} {
	// .initiatives-block--with-figures
	&--with-figures {
		position: relative;
		padding: 32px 0;

		@include mobile {
			padding: 18px 0;
		}
	}

  // .initiatives-block__title
  &__title {
    margin-bottom: 24px;
  }

  // .initiatives-block__actions
  &__actions {
    margin-top: 24px;
  }

  // .initiatives-block__shapes
  &__shapes {
    position: absolute;

    // .initiatives-block__shapes--1
    &--1 {
      right: 45px;
      top: -100px;

      @include tablet {
        right: -60px;
        top: -60px;
      }
    }

    // .initiatives-block__shapes--2
    &--2 {
      left: 45px;
      bottom: -150px;

      @include tablet {
        left: -60px;
        bottom: -60px;
      }
    }
  }

  // .initiatives-block__animate-figure
  &__animate-figure {
    width: 250px;
    height: 250px;

    @include tablet {
      width: 150px;
      height: 150px;
    }
  }

  // .initiatives-block__inner
  &__inner {
    position: relative;
    z-index: 2;
  }
}
</style>
