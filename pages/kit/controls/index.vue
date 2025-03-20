<template>
	<div class="kit-controls">
		<div class="container">
			<div class="kit-controls__inner">
				<div class="kit-controls__header">
					<h1 class="title title-h1">
						Кнопки и контролы
					</h1>
				</div>

				<div class="kit-controls__block">
					<div class="kit-controls__block-header">
						<h2 class="kit-controls__block-title title title-h2">
							Темы кнопок - заливка
						</h2>
					</div>
					<ColoredBlock>
						<div class="kit-controls__list">
							<CustomButton
								v-for="theme in AllBaseColors"
								:key="`kit-controls__list-btn-2-${theme}`"
								:theme="theme"
							>
								Кнопка
							</CustomButton>
						</div>
					</ColoredBlock>
				</div>
				<div class="kit-controls__block">
					<div class="kit-controls__block-header">
						<h2 class="kit-controls__block-title title title-h2">
							Темы кнопок - обводка
						</h2>
					</div>
					<ColoredBlock>
						<div class="kit-controls__list">
							<CustomButton
								v-for="theme in AllBaseColors"
								:key="`kit-controls__list-btn-2-${theme}`"
								:theme="theme"
								:mode="CustomButtonModeSettings.OUTLINE"
							>
								Кнопка
							</CustomButton>
						</div>
					</ColoredBlock>
				</div>
				<div class="kit-controls__block">
					<div class="kit-controls__block-header">
						<h2 class="kit-controls__block-title title title-h2">
							Размеры кнопок
						</h2>
					</div>
					<div class="kit-controls__list">
						<CustomButton
							v-for="size in CustomButtonSizeSettings"
							:key="`kit-controls__list-btn-${size}`"
							:size="size"
						>
							Кнопка
						</CustomButton>
					</div>
				</div>
				<div class="kit-controls__block">
					<div class="kit-controls__block-header">
						<h2 class="kit-controls__block-title title title-h2">
							Пагинатор
						</h2>
					</div>
					<ColoredBlock>
						<div class="kit-controls__list kit-controls__list--single">
							<CustomPagination
								v-for="theme in AllBaseColors"
								:key="`kit-controls__list-paginator-theme-${theme}`"
								:theme="theme"
								:current-page="1"
								:count-pages="20"
							/>
						</div>
					</ColoredBlock>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { CustomButtonSizeSettings, CustomButtonModeSettings } from '~/types/common/CustomButton'
import { AllBaseColors } from '~/types/common/Themes'

definePageMeta({
	layout: 'kit',
})
</script>

<style lang="scss">
$b: '.kit-controls';

#{$b} {

  // .kit-controls__header
  &__header {
    margin-bottom: 48px;
  }

  // .kit-controls__list
  &__list {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 12px;

		&--single {
			flex-direction: column;
			gap: 46px;
		}
  }

  // .kit-controls__block
  &__block {
    &:not(:last-child) {
      margin-bottom: 60px;
    }

    // .kit-controls__block-header
    &-header {
      margin-bottom: 24px;
    }
  }
}
</style>
