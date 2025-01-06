<template>
  <div class="project-card">
    <div class="project-card__inner">
      <div class="project-card__preview">
        <img class="project-card__preview-img" :src="card.image || '/404.webp'"/>
      </div>
      <div class="project-card__content">
        <div class="project-card__content-top text-sm">
          <time class="project-card__date" :datetime="String(card.time_create)">
            Создан {{ detDateArticle(card.time_create) }}
          </time>
          <time class="project-card__date" :datetime="String(card.time_update)">
            Обновлен {{ detDateArticle(card.time_update) }}
          </time>
        </div>
        <h3 class="project-card__title title title-h4">
          {{ card.title }} | {{ card.id }}
        </h3>
        <p class="project-card__text text-md">
          {{ card.content }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { IProject } from '~/types/api/projects'
import { detDateArticle } from '~/helpers/dateHelpers'

interface IProjectCardProps {
  card: IProject
}

const props = defineProps<IProjectCardProps>()

</script>

<style lang="scss">
$b: '.project-card';

#{$b} {
  background-color: rgba($color-primary, 0.1);
  border-radius: 16px;

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
    aspect-ratio: 320/250;
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
    background-color: rgba($color-primary, 0.1);
    border-radius: 16px;
    padding: 16px;

    // .project-card__content-top
    &-top {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 12px;
      margin-bottom: 16px;
    }
  }

  // .project-card__title
  &__title {
    margin-bottom: 16px;
  }
}
</style>
