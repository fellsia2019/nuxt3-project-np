<template>
  <div class="projects-block">
    <div class="container">
      <div class="projects-block__inner">
        <h2 class="projects-block__title title title-h2">
          Проекты
        </h2>

        <ProjectList :projects="projects"/>

        <div v-if="canLoadMore" class="projects-block__actions">
          <CustomButton @click="showMore">
            Показать ещё
          </CustomButton>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { IProject } from '~/types/api/projects'

interface IProjectProps {
  projects: Array<IProject>;
  canLoadMore: boolean;
}

interface IProjectEmits {
  (e: 'show-more'): void
}

const props = defineProps<IProjectProps>()
const emit = defineEmits<IProjectEmits>()

function showMore() {
  emit('show-more')
}

</script>

<style lang="scss">
$b: '.projects-block';

#{$b} {

  // .projects-block__title
  &__title {
    margin-bottom: 24px;
  }

  // .projects-block__actions
  &__actions {
    margin-top: 24px;
  }
}
</style>
