<template>
	<NuxtLink
		:to="{ name: 'projects-id', params: { id: card.id } }"
		class="project-card"
	>
		<div class="project-card__inner">
			<div class="project-card__preview">
				<CommonImage
					img-class="project-card__preview-img"
					:image="{ webp: card.image_webp, base: card.image }"
				/>
			</div>
			<div class="project-card__content">
				<div class="project-card__content-top text-sm">
					<time
						class="project-card__date"
						:datetime="String(card.time_create)"
					>
						Создан {{ detDateArticle(card.time_create) }}
					</time>
					<time
						class="project-card__date"
						:datetime="String(card.time_update)"
					>
						Обновлен {{ detDateArticle(card.time_update) }}
					</time>
				</div>
				<h3 class="project-card__title title title-h4">
					{{ card.title }} | {{ card.id }}
				</h3>
				<p class="project-card__text text-md">
					{{ card.content }}
				</p>
				<CustomButton
					class="project-card__btn"
					:theme="AllBaseColors.PRIMARY"
					:mode="CustomButtonModeSettings.OUTLINE"
					:size="CustomButtonSizeSettings.SM"
				>
					Подробнее
				</CustomButton>
			</div>
		</div>
	</NuxtLink>
</template>

<script setup lang="ts">
import type { IProject } from '~/types/api/projects'
import { detDateArticle } from '~/helpers/dateHelpers'
import { CustomButtonModeSettings, CustomButtonSizeSettings } from '~/types/common/CustomButton'
import { AllBaseColors } from '~/types/common/Themes'

interface IProjectCardProps {
	card: IProject
}

defineProps<IProjectCardProps>()
</script>

<style lang="scss">
$b: '.project-card';

#{$b} {
  display: block;
  background-color: $color-dark-primary;
  border-radius: 16px;
  transition: $td;

  &:hover {
    box-shadow: 0 0 10px 0 $color-dark-primary-2;
  }

  // .project-card__inner
  &__inner {
    height: 100%;
    display: flex;
    flex-direction: column;
  }

  // .project-card__preview
  &__preview {
    width: 100%;
    height: fit-content;
    aspect-ratio: 320/200;
    margin-bottom: 16px;

    // .project-card__preview-img
    &-img {
      width: 100%;
      height: 100%;
      border-radius: 16px;
      object-fit: cover;
    }
  }

  // .project-card__content
  &__content {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    background-color: $color-dark-primary-2;
    border-radius: 16px;
    padding: 16px;

    // .project-card__content-top
    &-top {
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      gap: 5px 12px;
      margin-bottom: 16px;
      color: $color-secondary-3;
    }
  }

  // .project-card__title
  &__title {
    margin-bottom: 16px;
  }

  // .project-card__text
  &__text {
    color: $color-secondary-3;
    @include line-сlamp(7);
  }

  // .project-card__btn
  &__btn {
    align-self: flex-start;
    margin-top: 16px;

    @include tablet {
      width: 100%;
    }
  }

  // .project-card__date
  &__date {
    white-space: nowrap;
  }
}
</style>
