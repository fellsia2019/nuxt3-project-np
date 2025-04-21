<template>
	<div class="recommended-block">
		<div class="container">
			<div class="recommended-block__inner">
				<div class="recommended-block__header">
					<h2 class="recommended-block__title title title-h2">
						Рекомендуем
					</h2>
				</div>

				<div class="recommended-block__body">
					<Swiper v-bind="swiperOptions">
						<SwiperSlide
							v-for="card in cards"
							:key="`recommended-block-card-${card.id}`"
						>
							<RecommendedCard
								:route-name="routeName"
								:theme="theme"
								:card="card"
							/>
						</SwiperSlide>
					</Swiper>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
import type { SwiperOptions } from 'swiper/types'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { AllBaseColors } from '~/types/common/Themes'

import 'swiper/css'

interface IProps {
	theme?: AllBaseColors
	cards: unknown
	routeName: string
}

withDefaults(defineProps<IProps>(), {
	theme: AllBaseColors.PRIMARY,
})

const swiperOptions = computed<SwiperOptions>(() => {
	return {
		slidesPerView: 3,
		spaceBetween: 30,
	}
})
</script>
