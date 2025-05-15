<template>
	<div
		class="default-detail-template"
		:class="`default-detail-template--theme-${theme}`"
	>
		<div class="container">
			<div class="default-detail-template__inner">
				<div class="default-detail-template__header">
					<Banner
						:title="title"
						:breadcrumbs="breadcrumbs"
						:description="content"
						:image="detailImg"
						:theme="theme"
						:time-create="timeCreate"
					/>
				</div>

				<SpeechSynthesisPlayer
					v-if="html?.length && html?.length > 500"
					class="default-detail-template__speech-synthesis"
					:theme="theme"
					:text="html"
				/>

				<div class="default-detail-template__body">
					<div
						v-if="html?.length"
						class="default-detail-template__html typography"
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
	timeCreate?: number | null
	breadcrumbs: IBreadcrumbItem[]
}

withDefaults(defineProps<IProps>(), {
	theme: AllBaseColors.PRIMARY,
})
</script>

<style lang="scss">
$b: '.default-detail-template';

#{$b} {
  // .default-detail-template__header
  &__header {
    position: relative;
    margin-bottom: 40px;
  }

  // .default-detail-template__title
  &__title {
    max-width: 800px;

    &:not(:last-child) {
      margin-bottom: 16px;
    }
  }

	// .default-detail-template__speech-synthesis
	&__speech-synthesis {
		margin-bottom: 40px;
	}

  // .default-detail-template__content
  &__content {
    max-width: 900px;
  }
}
</style>
