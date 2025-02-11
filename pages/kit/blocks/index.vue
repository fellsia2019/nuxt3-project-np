<template>
  <div class="kit-blocks">
    <div class="container">
      <div class="kit-blocks__inner">
        <div class="kit-blocks__header">
          <h1 class="kit-blocks__title title title-h1">
            Здесь пока пусто
          </h1>
        </div>

        <div class="kit-blocks__block">
          <div class="kit-blocks__block-header">
            <h2 class="kit-blocks__block-title title title-h2">
              Аккордеон
            </h2>
          </div>

          <Accordion>
            <template #header>
              Аккордеон
            </template>
          </Accordion>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'kit'
})
</script>

<style lang="scss">

</style>
