<template>
  <div class="initiatives-list">
    <InitiativeCard
      v-for="card in initiatives"
      :key="`initiatives-list-item-${card.id}`"
      class="initiatives-list__card"
      :card="card"
    />
  </div>
</template>

<script setup lang="ts">
import type { IInitiative } from '~/types/api/initiatives'

interface IInitiativesListProps {
  initiatives: Array<IInitiative>
}

const props = defineProps<IInitiativesListProps>()

</script>

<style lang="scss">
$b: '.initiatives-list';

#{$b} {
  @include gridcols(2, 16px);

  @include tablet {
    @include gridcols(1, 16px);
  }

  // .initiatives-list__card
  &__card {
    &:last-child {
      &:nth-child(odd) {
        @include tablet-min {
          grid-column-start: 1;
          grid-column-end: 3;
        }
      }
    }
  }
}
</style>
