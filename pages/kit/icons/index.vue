<template>
	<div class="kit-icons">
		<div class="container">
			<div class="kit-icons__inner">
				<div class="kit-icons__header">
					<h1 class="kit-icons__title title title-h1">
						Иконки
					</h1>
				</div>

				<div class="kit-icons__block">
					<div class="kit-icons__block-header">
						<h2 class="kit-icons__block-title title title-h2">
							Базовые иконки svg
						</h2>
					</div>

					<div class="kit-icons__block-list">
						<div
							v-for="icon in icons"
							:key="`kit-icons__block-item-${icon}`"
							class="kit-icons__block-item"
						>
							<SvgIcon
								class="kit-icons__block-svg"
								:icon="icon"
							/>
						</div>
					</div>
				</div>

				<div class="kit-icons__block">
					<div class="kit-icons__block-header">
						<h2 class="kit-icons__block-title title title-h2">
							Кастомные иконки
						</h2>
					</div>
					<div class="kit-icons__block-group">
						<div class="kit-icons__block-header">
							<h3 class="kit-icons__block-title title title-h4">
								Стрелки - Направления
							</h3>
						</div>
						<div class="kit-icons__block-list">
							<div
								v-for="direction in CustomIconArrowDirectionSettings"
								:key="`kit-icons__block-item-${direction}`"
								class="kit-icons__block-item"
							>
								<CustomIconArrow :direction="direction" />
							</div>
						</div>
					</div>
					<div class="kit-icons__block-group">
						<div class="kit-icons__block-header">
							<h3 class="kit-icons__block-title title title-h4">
								Стрелки - Размеры
							</h3>
						</div>
						<div class="kit-icons__block-list">
							<div
								v-for="size in CustomIconArrowSizeSettings"
								:key="`kit-icons__block-item-${size}`"
								class="kit-icons__block-item"
							>
								<CustomIconArrow :size="size" />
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { CustomIconArrowDirectionSettings, CustomIconArrowSizeSettings } from '~/types/common/CustomIcons'

definePageMeta({
	layout: 'kit',
})

const iconsGlob = import.meta.glob('~/assets/icons/*.svg', {
	eager: true,
	query: '?raw',
	import: 'default',
})

const icons = computed(() => {
	return Object.keys(iconsGlob).map((icon) => {
		const iconFullname = icon.split('/').at(-1)
		const iconExtIndex = iconFullname?.lastIndexOf('.')

		return iconFullname?.substring(0, iconExtIndex) || ''
	})
})
</script>

<style lang="scss">
$b: '.kit-icons';

#{$b} {

  // .kit-icons__header
  &__header {
    margin-bottom: 48px;
  }

  // .kit-icons__block
  &__block {

    &:not(:last-child) {
      margin-bottom: 60px;
    }

    // .kit-icons__block-header
    &-header {
      margin-bottom: 24px;
    }

    // .kit-icons__block-list
    &-list {
      display: flex;
      align-items: center;
      gap: 20px;
    }

    // .kit-icons__block-svg
    &-svg {
      height: 80px;
      width: 80px;
    }

    // .kit-icons__block-group
    &-group {
      &:not(:last-child) {
        margin-bottom: 24px;
      }
    }
  }
}
</style>
