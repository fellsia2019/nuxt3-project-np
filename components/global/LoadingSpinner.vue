<template>
  <ClientOnly>
    <div
      class="spinner-loading"
      :class="{
        'spinner-loading--into-block': intoBlock,
        'spinner-loading--is-loading': resultIsLoading
      }"
    >
      <div class="spinner-loading__spinner" />
    </div>
  </ClientOnly>
</template>

<script setup lang="ts">

interface ILoadingSpinnerProps {
  intoBlock?: boolean;
  isLoading?: boolean;
}

import { useLoadingStore } from '~/store/common/loading'

import simpleLockPageScroll from '~/helpers/simpleLockPageScroll'

const loadingStore = useLoadingStore();

const props = defineProps<ILoadingSpinnerProps>()

const resultIsLoading = computed<boolean>(() => props.intoBlock ? props.isLoading : loadingStore.IS_LOADING)

watch(
  () => loadingStore.IS_LOADING,
  () => {
    if (!props.intoBlock) {
      simpleLockPageScroll(loadingStore.IS_LOADING)
    }
  }
);

</script>

<style lang="scss">
$b: '.spinner-loading';

#{$b} {
  display: none;
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background-color: rgba($color-primary, 0.2);
  align-items: center;
  justify-content: center;
  z-index: 10000;

  // .spinner-loading--into-block
  &--into-block {
    position: absolute;
  }

  // .spinner-loading--is-block
  &--is-loading {
    display: flex;
  }

  &__spinner {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 60px;
    height: 60px;
    transform: translate(-50%,-50%);

    &::after {
      content: "";
      display: block;
      width: 100%;
      height: 100%;
      border-radius: 50%;
      border: 6px inset $color-primary;
      animation: spin-rotate 2.5s infinite linear;
    }
  }
}

@keyframes spin-rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
