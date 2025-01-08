<template>
  <div class="initiatives-list">
    <InitiativeCard
      v-for="card in initiatives"
      :key="`initiatives-list-item-${card.id}`"
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
}
</style>
