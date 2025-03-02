<template>
	<NuxtLink
		:to="{ name: 'initiatives-id', params: { id: card.id } }"
		class="initiative-card"
	>
		<div class="initiative-card__inner">
			<div class="initiative-card__preview">
				<CommonImage
					img-class="initiative-card__preview-img"
					:image="{ webp: card.image_webp, base: card.image }"
				/>
			</div>
			<div class="initiative-card__content">
				<div class="initiative-card__content-top text-sm">
					<time
						class="initiative-card__date"
						:datetime="String(card.time_create)"
					>
						Создан {{ detDateArticle(card.time_create) }}
					</time>
					<time
						class="initiative-card__date"
						:datetime="String(card.time_update)"
					>
						Обновлен {{ detDateArticle(card.time_update) }}
					</time>
				</div>
				<h3 class="initiative-card__title title title-h4">
					{{ card.title }} | {{ card.id }}
				</h3>
				<p class="initiative-card__text text-md">
					{{ card.content }}
				</p>
				<CustomButton
					class="initiative-card__btn"
					:theme="CustomButtonThemeSettings.PRIMARY_ACCENT_OUTLINE"
					:size="CustomButtonSizeSettings.SM"
				>
					Подробнее
				</CustomButton>
			</div>
		</div>
	</NuxtLink>
</template>

<script setup lang="ts">
import type { IInitiative } from '~/types/api/initiatives'
import { detDateArticle } from '~/helpers/dateHelpers'
import { CustomButtonThemeSettings, CustomButtonSizeSettings } from '~/types/common/CustomButton'

interface IInitiativeCardProps {
	card: IInitiative
}

defineProps<IInitiativeCardProps>()
</script>

<style lang="scss">
$b: '.initiative-card';

#{$b} {
  display: block;
  background-color: $color-dark-primary-accent;
  border-radius: 16px;
  transition: $td;

  &:hover {
    box-shadow: 0 0 10px 0 $color-dark-primary-accent-2;
  }

  // .initiative-card__inner
  &__inner {
    height: 100%;
    display: flex;
    gap: 12px;

    @include mobile {
      flex-direction: column;
      gap: 0;
    }
  }

  // .initiative-card__preview
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

    // .initiative-card__preview-img
    &-img {
      width: 100%;
      height: 100%;
      border-radius: 16px;
      object-fit: cover;
    }
  }

  // .initiative-card__content
  &__content {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    background-color: $color-dark-primary-accent-2;
    border-radius: 16px;
    padding: 16px;

    // .initiative-card__content-top
    &-top {
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      gap: 5px 12px;
      margin-bottom: 16px;
      color: $color-secondary-3;
    }
  }

  // .initiative-card__title
  &__title {
    margin-bottom: 16px;
  }

  // .initiative-card__text
  &__text {
    color: $color-secondary-3;
    @include line-сlamp(7);
  }

  // .initiative-card__btn
  &__btn {
    align-self: flex-start;
    margin-top: 16px;

    @include tablet {
      width: 100%;
    }
  }

  // .initiative-card__date
  &__date {
    white-space: nowrap;
  }
}
</style>
