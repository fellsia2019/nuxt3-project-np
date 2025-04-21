<template>
	<div class="recommended-block">
		<div class="container">
			<div class="recommended-block__inner">
				<div
					v-if="title?.length"
					class="recommended-block__header"
				>
					<h2
						class="recommended-block__title title title-h2"
						v-html="title"
					/>
				</div>

				<div class="recommended-block__body">
					<Swiper
						class="recommended-block__swiper"
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
						}"
					>
						<SwiperSlide
							v-for="card in cards"
							:key="`recommended-block-card-${card.id}`"
							class="recommended-block__swiper-slide"
						>
							<RecommendedCard
								class="recommended-block__card"
								:route-name="routeName"
								:theme="theme"
								:card="card"
							/>
						</SwiperSlide>
					</Swiper>
				</div>

				<div class="recommended-block__pagination slider-pagination" :class="`color-${theme}`" ref="paginationNode" />
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Pagination } from 'swiper/modules'
import { AllBaseColors } from '~/types/common/Themes'
import type { IBaseMaterial } from '~/types/api/base'
import 'swiper/css'

interface IProps {
	theme?: AllBaseColors
	cards: Array<IBaseMaterial>
	routeName: string
	title?: string
}

withDefaults(defineProps<IProps>(), {
	theme: AllBaseColors.PRIMARY,
})

const modules = [Pagination]
const paginationNode = ref(null)
</script>

<style lang="scss">
$b: '.recommended-block';

#{$b} {

	// .recommended-block__header
	&__header {
		margin-bottom: 32px;
	}

	// .recommended-block__swiper
	#{$b}__swiper {
		@include tablet {
			overflow: unset;
		}
	}

	// .recommended-block__swiper-slide
	#{$b}__swiper-slide {
		height: auto;
	}

	// .recommended-block__card
	&__card {
		height: 100%;
	}

	// .recommended-block__pagination
	&__pagination {
		margin-top: 32px;
	}
}
</style>
