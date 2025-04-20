<template>
	<NuxtLink
		:to="{ name: 'articles-id', params: { id: card.id } }"
		class="article-card"
	>
		<div class="article-card__inner">
			<div class="article-card__preview">
				<CommonImage
					img-class="article-card__preview-img"
					:image="{ webp: card.image_webp, base: card.image }"
				/>
			</div>
			<div class="article-card__content">
				<div class="article-card__content-top text-sm">
					<time
						class="article-card__date"
						:datetime="String(card.time_create)"
					>
						Создан {{ getDateArticle(card.time_create) }}
					</time>
					<time
						class="article-card__date"
						:datetime="String(card.time_update)"
					>
						Обновлен {{ getDateArticle(card.time_update) }}
					</time>
				</div>
				<h3 class="article-card__title title title-h4">
					{{ card.title }}
				</h3>
				<p class="article-card__text text-md">
					{{ card.content }}
				</p>
				<CustomButton
					class="article-card__btn"
					:theme="AllBaseColors.DANGER"
					:size="CustomButtonSizeSettings.SM"
					:mode="CustomButtonModeSettings.OUTLINE"
				>
					Подробнее
				</CustomButton>
			</div>
		</div>
	</NuxtLink>
</template>

<script setup lang="ts">
import type { IArticle } from '~/types/api/articles'
import { getDateArticle } from '~/helpers/dateHelpers'
import { CustomButtonModeSettings, CustomButtonSizeSettings } from '~/types/common/CustomButton'
import { AllBaseColors } from '~/types/common/Themes'

interface IArticleCardProps {
	card: IArticle
}

defineProps<IArticleCardProps>()
</script>

<style lang="scss">
$b: '.article-card';

#{$b} {
  display: block;
  background-color: $color-dark-danger-2;
  border-radius: 16px;
  transition: $td;

  &:hover {
    box-shadow: 0 0 10px 0 $color-dark-danger;
  }

  // .article-card__inner
  &__inner {
    height: 100%;
    display: flex;
    gap: 12px;

    @include mobile {
      flex-direction: column;
      gap: 0;
    }
  }

  // .article-card__preview
  &__preview {
    width: 33%;
    min-width: 33%;
    max-width: 33%;
    height: 100%;
    margin-bottom: 16px;

    @include mobile {
      width: 100%;
      min-width: unset;
      max-width: unset;
      height: auto;
      aspect-ratio: 320/200;
    }

    // .article-card__preview-img
    &-img {
      width: 100%;
      height: 100%;
      border-radius: 16px;
      object-fit: cover;
    }
  }

  // .article-card__content
  &__content {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    background-color: $color-dark-danger;
    border-radius: 16px;
    padding: 16px;
		gap: 16px;

    // .article-card__content-top
    &-top {
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      gap: 5px 12px;
      color: $color-secondary-3;
    }
  }

  // .article-card__text
  &__text {
    color: $color-secondary-3;
    @include line-сlamp(7);
  }

  // .article-card__btn
  &__btn {
    align-self: flex-start;
    margin-top: auto;

    @include tablet {
      width: 100%;
    }
  }

  // .article-card__date
  &__date {
    white-space: nowrap;
  }
}
</style>
