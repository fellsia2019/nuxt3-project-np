<template>
  <div class="error-page">
		<div class="error-page__content">
			<h1 class="error-page__title">
				<span class="error-page__title-stroke">{{ error.statusCode }}</span>
				<span class="error-page__title-fill">{{ error.statusCode }}</span>
			</h1>
			<div class="title-h3">
				<span v-if="error.statusCode === 404">
					Упс. Такая страница не найдена.
				</span>
				<span v-if="isServerError">
					Введутся технические работы, извините за предоставленые неудобства.
				</span>
				<span v-else>
					Упс. Произошла ошибка.
				</span>
			</div>
			<NuxtLink v-if="!isServerError" to="/" class="link link--danger">Вернуться на главную</NuxtLink>
		</div>
  </div>
</template>

<script setup lang="ts">
import type { NuxtError } from '#app'

const props = defineProps<{ error: NuxtError }>()

const isServerError = computed(() => {
	return props.error.statusCode >= 500 && props.error.statusCode <= 599
})
</script>

<style lang="scss">
$b: '.error-page';

#{$b} {
	position: fixed;
	left: 0;
	top: 0;
	height: 100%;
	width: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;

	// .error-page__title
	&__title {
		position: relative;
		font-size: 280px;
		font-weight: bolder;

		@include tablet {
			font-size: 150px;
		}

		// .error-page__title-stroke
		&-stroke {
			-webkit-text-fill-color: transparent;
			-webkit-text-stroke: 3px $color-danger;
		}

		// .error-page__title-fill
		&-fill {
			display: inline-block;
			position: absolute;
			left: 12px;
			top: -12px;
			-webkit-text-fill-color: rgba($color-danger, 0.1);
			-webkit-text-stroke-color: transparent;

			@include tablet {
				left: 7px;
				top: -7px;
			}
		}
	}

	// .error-page__content
	&__content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		text-align: center;
		gap: 24px;
		padding: 24px;
		max-width: 650px;
	}
}
</style>
