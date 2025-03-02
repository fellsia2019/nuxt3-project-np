<template>
	<div class="kit-styles">
		<div class="container">
			<div class="kit-styles__inner">
				<div class="kit-styles__header">
					<h1 class="kit-styles__title title title-h1">
						<span class="color-primary">css</span> хелпер-класс
					</h1>
				</div>

				<div class="kit-styles__block">
					<div class="kit-styles__block-header">
						<h2 class="kit-styles__block-title title title-h2">
							Набор заголовков
						</h2>
					</div>
					<div class="kit-styles__list">
						<div
							v-for="title in 6"
							:key="`kit-styles__list-item-${title}`"
							class="kit-styles__list-item"
						>
							<div
								class="title"
								:class="`title-h${title}`"
							>
								Заголовок h{{ title }}
							</div>
						</div>
					</div>
				</div>

				<div class="kit-styles__block">
					<div class="kit-styles__block-header">
						<h2 class="kit-styles__block-title title title-h2">
							Набор текстов
						</h2>
					</div>
					<div class="kit-styles__list">
						<div
							v-for="text in textSizeList"
							:key="`kit-styles__list-item-${text}`"
							class="kit-styles__list-item"
						>
							<div :class="text">
								{{ text }}
								<br>
								Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere ad obcaecati nam asperiores alias ipsam exercitationem sunt excepturi at labore.
							</div>
						</div>
					</div>
				</div>

				<div class="kit-styles__block">
					<div class="kit-styles__block-header">
						<h2 class="kit-styles__block-title title title-h2">
							ССылки
						</h2>
					</div>
					<ColoredBlock>
						<div class="kit-styles__list">
							<div
								v-for="color in AllBaseColors"
								:key="`kit-styles__list-item-link-${color}`"
								class="kit-styles__list-item"
							>
								<NuxtLink
									class="link"
									:class="`link--${color}`"
									:to="{ name: 'kit' }"
								>
									Ссылка на главную кита
								</NuxtLink>
							</div>
						</div>
					</ColoredBlock>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { AllBaseColors } from '~/types/common/Themes'

definePageMeta({
	layout: 'kit',
})

const textSizeList = ['text-lg', 'text-md', 'text-sm']
</script>

<style lang="scss">
$b: '.kit-styles';

#{$b} {

  // .kit-styles__header
  &__header {
    margin-bottom: 48px;
  }

  // .kit-styles__block
  &__block {
    &:not(:last-child) {
      margin-bottom: 60px;
    }

    // .kit-styles__block-header
    &-header {
      margin-bottom: 24px;
    }
  }

  // .kit-styles__list
  &__list {

    // .kit-styles__list-item
    &-item {
      &:not(:last-child) {
        margin-bottom: 16px;
      }
    }
  }
}
</style>
