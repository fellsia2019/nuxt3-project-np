<template>
  <div class="kit-controls">
    <div class="container">
      <div class="kit-controls__inner">
        <div class="kit-controls__header">
          <h1 class="title title-h1">
            Кнопки и контролы
          </h1>
        </div>

        <div class="kit-controls__block">
          <div class="kit-controls__block-header">
            <h2 class="kit-controls__block-title title title-h2">
              Темы кнопок
            </h2>
          </div>
          <ColoredBlock>
            <div class="kit-controls__list">
              <CustomButton
                v-for="theme in CustomButtonThemeSettings"
                :key="`kit-controls__list-btn-${theme}`"
                :theme="theme"
              >
                Кнопка
              </CustomButton>
            </div>
          </ColoredBlock>
        </div>

        <div class="kit-controls__block">
          <div class="kit-controls__block-header">
            <h2 class="kit-controls__block-title title title-h2">
              Размеры кнопок
            </h2>
          </div>
          <div class="kit-controls__list">
            <CustomButton
              v-for="size in CustomButtonSizeSettings"
              :key="`kit-controls__list-btn-${size}`"
              :size="size"
            >
              Кнопка
            </CustomButton>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { CustomButtonSizeSettings, CustomButtonThemeSettings } from '~/types/common/CustomButton'

definePageMeta({
  layout: 'kit'
})

</script>

<style lang="scss">
$b: '.kit-controls';

#{$b} {

  // .kit-controls__header
  &__header {
    margin-bottom: 48px;
  }

  // .kit-controls__list
  &__list {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 12px;
  }

  // .kit-controls__block
  &__block {
    &:not(:last-child) {
      margin-bottom: 60px;
    }

    // .kit-controls__block-header
    &-header {
      margin-bottom: 24px;
    }
  }
}
</style>
