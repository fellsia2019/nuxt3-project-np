<template>
	<div class="initiatives-slider">
		<Swiper
			class="initiatives-slider__swiper"
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
			:breakpoints="{
				1023: {
					slidesPerView: 2,
				},
			}"
		>
			<SwiperSlide
				v-for="initiative in initiatives"
				:key="`initiatives-slider-slide-${initiative.id}`"
				class="initiatives-slider__swiper-slide"
			>
				<InitiativeCard
					:card="initiative"
					class="initiatives-slider__card"
				/>
			</SwiperSlide>
		</Swiper>

		<div
			ref="paginationNode"
			class="initiatives-slider__pagination slider-pagination color-primary-accent"
		/>
	</div>
</template>

<script setup lang="ts">
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Pagination } from 'swiper/modules'

import type { IInitiative } from '~/types/api/initiatives'

import 'swiper/css'

interface IProps {
	initiatives: Array<IInitiative>
}

defineProps<IProps>()

const modules = [Pagination]
const paginationNode = ref(null)
</script>

<style lang="scss">
$b: '.initiatives-slider';

#{$b} {

	// .initiatives-slider__swiper
	#{$b}__swiper {
		@include tablet {
			overflow: unset;
		}
	}

	// .initiatives-slider__swiper-slide
	#{$b}__swiper-slide {
		height: auto;
	}

	// .initiatives-slider__card
	&__card {
		height: 100%;
	}

	// .initiatives-slider__pagination
	&__pagination {
		margin-top: 32px;
	}
}
</style>
