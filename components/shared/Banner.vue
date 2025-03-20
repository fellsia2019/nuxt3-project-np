<template>
	<div
		class="banner"
		:class="[`banner--theme-${theme}`, { 'banner--mob-full-width': mobFullWidth }]"
	>
		<div :class="withContainer ? 'container' : ''">
			<div class="banner__inner">
				<CommonImage
					img-class="banner__bg"
					:image="image"
				/>
				<div class="banner__content">
					<h1
						class="banner__title title title-h1"
						:class="`color-${theme}`"
						v-html="title"
					/>
					<div
						v-if="description"
						class="banner__description"
						v-html="description"
					/>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import type { IImageData } from '~/types/common/Image'
import { TemplateThemes } from '~/types/common/Themes'

interface IProps {
	title: string
	description?: string | null
	image: IImageData
	withContainer?: boolean
	theme?: TemplateThemes
	mobFullWidth?: boolean
}

withDefaults(defineProps<IProps>(), {
	theme: TemplateThemes.DEFAULT,
	mobFullWidth: true,
})
</script>

<style lang="scss">
$b: '.banner';

@function filterImg($color) {
  @return linear-gradient(to bottom, rgba($color, 0.2), rgba($color-dark, 0.7));
}

#{$b} {

  // .banner__inner
  &__inner {
    position: relative;
    border-radius: 16px;
    padding: 32px;
    overflow: hidden;

    @include tablet {
      padding: 24px;
    }

    @include mobile {
      padding: 16px;
    }

    #{$b}--mob-full-width & {
      @include tablet {
        border-radius: 0;
      }

      @include mob-fullwidth-from-container();
    }

    &::before {
      content: '';
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      z-index: 1;
      pointer-events: none;
      touch-action: none;
    }

    #{$b}--theme-default & {
      &::before {
        background: filterImg($color-dark);
      }
    }

    #{$b}--theme-primary & {
      &::before {
        background: filterImg($color-primary);
      }
    }

    #{$b}--theme-primary-accent & {
      &::before {
        background: filterImg($color-primary-accent);
      }
    }

		#{$b}--theme-danger & {
      &::before {
        background: filterImg($color-danger);
      }
    }
  }

  // .banner__bg
  &__bg {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  // .banner__content
  &__content {
    min-height: 320px;
    position: relative;
    z-index: 2;
    display: flex;
    flex-direction: column;
    gap: 16px;
    justify-content: flex-end;
  }

  // .banner__description
  &__description {
    max-width: 800px;
  }
}
</style>
