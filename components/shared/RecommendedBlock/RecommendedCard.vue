<template>
	<NuxtLink
		:to="{ name: routeName, params: { id: card.id } }"
		class="recommended-card"
		:class="`recommended-card--theme-${theme}`"
	>
		<div class="recommended-card__inner">
			<div class="recommended-card__preview">
				<CommonImage
					img-class="recommended-card__preview-img"
					:image="{ webp: card.image_webp, base: card.image }"
				/>
			</div>
			<div class="recommended-card__content">
				<div class="recommended-card__content-top text-sm">
					<time
						class="recommended-card__date"
						:datetime="String(card.time_create)"
					>
						Создан {{ getDateArticle(card.time_create) }}
					</time>
					<time
						class="recommended-card__date"
						:datetime="String(card.time_update)"
					>
						Обновлен {{ getDateArticle(card.time_update) }}
					</time>
				</div>
				<h3 class="recommended-card__title title title-h4">
					{{ card.title }}
				</h3>
				<p class="recommended-card__text text-md">
					{{ card.content }}
				</p>
				<CustomButton
					class="recommended-card__btn"
					:theme="theme !== AllBaseColors.LIGHT ? AllBaseColors.LIGHT: AllBaseColors.DARK"
					:mode="CustomButtonModeSettings.OUTLINE"
					:size="CustomButtonSizeSettings.SM"
				>
					Подробнее
				</CustomButton>
			</div>
		</div>
	</NuxtLink>
</template>

<script lang="ts" setup>
import { AllBaseColors } from '~/types/common/Themes'
import { getDateArticle } from '~/helpers/dateHelpers'
import { CustomButtonModeSettings, CustomButtonSizeSettings } from '~/types/common/CustomButton'

interface IProps {
	theme?: AllBaseColors
	card: unknown
	routeName: string
}

withDefaults(defineProps<IProps>(), {
	theme: AllBaseColors.PRIMARY,
})
</script>

<style lang="scss">
@use "sass:color";
$b: '.recommended-card';

#{$b} {
	position: relative;
  display: block;
  border-radius: 16px;
  transition: $td;
	color: var(--text-color);
	overflow: hidden;

	--theme-color: transparent;
	--text-color: #{$color-light};
	--text-color-2: #{$color-secondary};

	&::before {
		content: '';
		position: absolute;
		bottom: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: 1;
		background-color: var(--theme-color);
		opacity: 0.1;
	}

	&:hover {
		#{$b}__inner {
			&::before {
				max-width: 100%;
			}
			&::after {
				max-height: 100%;
			}
		}
	}

	// .recommended-card--theme-light
	&--theme-light {
		--theme-color: #{$color-light};
		--text-color: #{$color-main};
  }

	// .recommended-card--theme-light-2
	&--theme-light-2 {
		--theme-color: #{$color-light-2};
		--text-color: #{$color-main};
  }

	// .recommended-card--theme-secondary
	&--theme-secondary {
		--theme-color: #{$color-secondary};
		--text-color: #{$color-main};
  }

	// .recommended-card--theme-secondary-2
	&--theme-secondary-2 {
		--theme-color: #{$color-secondary-2};
		--text-color: #{$color-main};
  }

	// .recommended-card--theme-secondary-3
	&--theme-secondary-3 {
		--theme-color: #{$color-secondary-3};
		--text-color: #{$color-main};
  }

	// .recommended-card--theme-main
	&--theme-main {
		--theme-color: #{$color-main};
  }

	// .recommended-card--theme-main-light
	&--theme-main-light {
		--theme-color: #{$color-main-light};
  }

	// .recommended-card--theme-dark
	&--theme-dark {
		--theme-color: #{$color-dark};
  }

  // .recommended-card--theme-danger
  &--theme-danger {
		--theme-color: #{$color-danger};
  }

	// .recommended-card--theme-warning
	&--theme-warning {
		--theme-color: #{$color-warning};
  }

	// .recommended-card--theme-success
	&--theme-success {
		--theme-color: #{$color-success};
  }

	// .recommended-card--theme-darksuccess
	&--theme-dark-success {
		--theme-color: #{$color-dark-success};
  }

  // .recommended-card--theme-primary
  &--theme-primary {
		--theme-color: #{$color-primary};
  }

  // .recommended-card--theme-primary-accent
  &--theme-primary-accent {
		--theme-color: #{$color-primary-accent};
  }

  &:hover {
    box-shadow: 0 0 10px 0 $color-dark-primary-2;
  }

  // .recommended-card__inner
  &__inner {
		position: relative;
    height: 100%;
    display: flex;
    flex-direction: column;

		&::before,
		&::after {
			content: '';
			position: absolute;
			bottom: 0;
			left: 50%;
			width: 100%;
			transform: translateX(-50%);
			transition: 0.5s ease all;
			z-index: 1;
		}

		&::before {
			max-width: calc(100% - 20px);
			border-radius: 8px;
			height: 4px;
			background-color: var(--theme-color);
		}

		&::after {
			background: linear-gradient(0deg, var(--theme-color) 0%, transparent 100%);
			height: 100%;
			max-height: 0;
		}
  }

  // .recommended-card__preview
  &__preview {
    width: 100%;
    height: fit-content;
    aspect-ratio: 320/200;
    margin-bottom: 16px;

    // .recommended-card__preview-img
    &-img {
      width: 100%;
      height: 100%;
      border-radius: 16px;
      object-fit: cover;
    }
  }

  // .recommended-card__content
  &__content {
		position: relative;
    height: 100%;
    display: flex;
    flex-direction: column;
		gap: 16px;
    padding: 16px;
		z-index: 2;

    // .recommended-card__content-top
    &-top {
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      gap: 5px 12px;
    }
  }

  // .recommended-card__text
  &__text {
    @include line-сlamp(7);
  }

  // .recommended-card__btn
  &__btn {
    align-self: flex-start;
    margin-top: auto;

    @include tablet {
      width: 100%;
    }
  }

  // .recommended-card__date
  &__date {
    white-space: nowrap;
  }
}
</style>
