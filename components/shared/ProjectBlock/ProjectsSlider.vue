<template>
	<div class="projects-slider">
		<Swiper
			class="projects-slider__swiper"
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
				767: {
					slidesPerView: 2,
				},
				1023: {
					slidesPerView: 3,
				},
			}"
		>
			<SwiperSlide
				v-for="project in projects"
				:key="`projects-slider-slide-${project.id}`"
				class="projects-slider__swiper-slide"
			>
				<ProjectCard
					:card="project"
					class="projects-slider__card"
				/>
			</SwiperSlide>
		</Swiper>

		<div
			ref="paginationNode"
			class="projects-slider__pagination slider-pagination color-primary"
		/>
	</div>
</template>

<script setup lang="ts">
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Pagination } from 'swiper/modules'

import type { IProject } from '~/types/api/projects'
import 'swiper/css'

interface IProps {
	projects: Array<IProject>
}

defineProps<IProps>()

const modules = [Pagination]
const paginationNode = ref(null)
</script>

<style lang="scss">
$b: '.projects-slider';

#{$b} {

	// .projects-slider__swiper
	#{$b}__swiper {
		@include tablet {
			overflow: unset;
		}
	}

	// .projects-slider__swiper-slide
	#{$b}__swiper-slide {
		height: auto;
	}

	// .projects-slider__card
	&__card {
		height: 100%;
	}

	// .projects-slider__pagination
	&__pagination {
		margin-top: 32px;
	}
}
</style>
