<template>
	<div
		class="default-detai-template"
		:class="`default-detai-template--theme-${theme}`"
	>
		<div class="container">
			<div class="default-detai-template__inner">
				<div class="default-detai-template__header">
					<Banner
						:title="title"
						:description="content"
						:image="detailImg"
						:theme="theme"
					/>
				</div>

				<div class="default-detai-template__body">
					<div
						v-if="html?.length"
						class="default-detai-template__html typography"
						v-html="html"
					/>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
import type { IImageData } from '~/types/common/Image'
import { AllBaseColors } from '~/types/common/Themes'

interface IProps {
	title: string
	html?: string
	content?: string
	detailImg: IImageData
	theme?: AllBaseColors
}

withDefaults(defineProps<IProps>(), {
	theme: AllBaseColors.PRIMARY,
})
</script>

<style lang="scss">
$b: '.default-detai-template';

#{$b} {

  // .default-detai-template__header
  &__header {
    position: relative;
    margin-bottom: 40px;
  }

  // .default-detai-template__title
  &__title {
    max-width: 800px;

    &:not(:last-child) {
      margin-bottom: 16px;
    }
  }

  // .default-detai-template__content
  &__content {
    max-width: 900px;
  }
}
</style>
