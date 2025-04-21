<template>
	<div class="articles-slider">
		<Swiper
			class="articles-slider__swiper"
			:modules="modules"
			:slides-per-view="1"
			:space-between="24"
			:pagination="{
				el: paginationNode,
				bulletClass: 'slider-pagination__dot',
				bulletActiveClass: 'slider-pagination__dot--is-active',
				clickable: true,
				dynamicBullets: true,
			}"
		>
			<SwiperSlide
				v-for="article in articles"
				:key="`articles-slider-slide-${article.id}`"
				class="articles-slider__swiper-slide"
			>
				<ArticleCard
					:card="article"
					class="articles-slider__card"
				/>
			</SwiperSlide>
		</Swiper>

		<div
			ref="paginationNode"
			class="articles-slider__pagination slider-pagination color-danger"
		/>
	</div>
</template>

<script setup lang="ts">
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Pagination } from 'swiper/modules'

import type { IArticle } from '~/types/api/articles'

import 'swiper/css'

interface IProps {
	articles: Array<IArticle>
}

defineProps<IProps>()

const modules = [Pagination]
const paginationNode = ref(null)
</script>

<style lang="scss">
$b: '.articles-slider';

#{$b} {

	// .articles-slider__swiper
	#{$b}__swiper {
		@include tablet {
			overflow: unset;
		}
	}

	// .articles-slider__swiper-slide
	#{$b}__swiper-slide {
		height: auto;
	}

	// .articles-slider__card
	&__card {
		height: 100%;
	}

	// .articles-slider__pagination
	&__pagination {
		margin-top: 32px;
	}
}
</style>
