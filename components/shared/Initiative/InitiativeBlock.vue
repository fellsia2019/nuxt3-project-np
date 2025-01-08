<template>
  <div class="initiatives-block">
    <div class="container">
      <div class="initiatives-block__inner">
        <h2 class="initiatives-block__title title title-h2">
          Инициативы
        </h2>

        <InitiativeList :initiatives="initiatives"/>

        <div v-if="canLoadMore" class="initiatives-block__actions">
          <CustomButton @click="showMore" :theme="CustomButtonThemeSettings.PRIMARY_ACCENT">
            Показать ещё
          </CustomButton>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { IInitiative } from '~/types/api/initiatives'
import { CustomButtonThemeSettings } from '~/types/common/CustomButton';

interface IInitiativesProps {
  initiatives: Array<IInitiative>;
  canLoadMore: boolean;
}

interface IInitiativesEmits {
  (e: 'show-more'): void
}

const props = defineProps<IInitiativesProps>()
const emit = defineEmits<IInitiativesEmits>()

function showMore() {
  emit('show-more')
}

</script>

<style lang="scss">
$b: '.initiatives-block';

#{$b} {

  // .initiatives-block__title
  &__title {
    margin-bottom: 24px;
  }

  // .initiatives-block__actions
  &__actions {
    margin-top: 24px;
  }
}
</style>
