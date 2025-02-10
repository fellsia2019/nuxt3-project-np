<template>
  <div class="default-detai-template" :class="`default-detai-template--theme-${theme}`">
    <div class="container">
      <div class="default-detai-template__inner">
        <div  class="default-detai-template__header">
          <h1
            class="default-detai-template__title title title-h1"
            :class="`color-${theme}`"
            v-html="title"
          />
          <div v-if="content?.length" class="default-detai-template__content" v-html="content" />
        </div>

        <div class="default-detai-template__body">
          <div v-if="html?.length" class="default-detai-template__html typography" v-html="html" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { IImageData } from '~/types/common/Image'
import { TemplateThemes } from '~/types/common/Themes'

interface IProps {
  title?: string;
  html?: string;
  content?: string;
  preview?: IImageData;
  theme?: TemplateThemes;
}

const props = withDefaults(defineProps<IProps>(), {
  theme: TemplateThemes.PRIMARY
})

</script>

<style lang="scss">
$b: '.default-detai-template';

#{$b} {

  // .default-detai-template__header
  &__header {
    position: relative;
    margin-bottom: 40px;
    border-bottom: 2px solid;
    padding-bottom: 40px;


    &::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 1px;
    }

    #{$b}--theme-primary & {
      border-color: $color-primary;

      &::after {
        box-shadow: 0 0 30px 3px rgba($color-primary, 0.8);
      }
    }

    #{$b}--theme-primary-accent & {
      border-color: $color-primary-accent;

      &::after {
        box-shadow: 0 0 30px 3px rgba($color-primary-accent, 0.8);
      }
    }
  }

  // .default-detai-template__title
  &__title {
    max-width: 800px;

    &:not(:last-child) {
      margin-bottom: 16px;
    }
  }

  // .default-detai-template__content
  &__content {
    max-width: 900px;
  }
}
</style>
