<template>
	<div
		class="colored-block"
		:class="[`bg-color-${currentColor}`, { 'colored-block--is-visible-window': isVisibleWindow }]"
	>
		<div
			class="colored-block__btn"
			@click="toggleWindow"
		>
			<SvgIcon icon="paint" />
		</div>

		<div class="colored-block__body">
			<slot />
		</div>

		<div
			v-if="isVisibleWindow"
			class="colored-block__window"
		>
			<div class="colored-block__window-list">
				<div
					class="colored-block__window-item colored-block__window-item--transparent"
					@click="changeColor(null)"
				>
					Без цвета
				</div>
				<div
					v-for="color in AllBaseColors"
					:key="`colored-block__window-item-${color}`"
					class="colored-block__window-item"
					:class="`bg-color-${color}`"
					@click="changeColor(color)"
				/>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { AllBaseColors } from '~/types/common/Themes'

const currentColor = ref<AllBaseColors | null>(null)
const isVisibleWindow = ref(false)

function toggleWindow() {
	isVisibleWindow.value = !isVisibleWindow.value
}

function changeColor(color: AllBaseColors | null) {
	currentColor.value = color
	toggleWindow()
}
</script>

<style lang="scss">
$b: '.colored-block';

#{$b} {
  position: relative;
  padding: 32px;
  border-radius: 4px;
  transition: $td;
  margin-left: -32px;
  margin-right: -32px;

  // .colored-block--is-visible-window
  &--is-visible-window {
    #{$b}__body {
      opacity: 0 !important;
      pointer-events: none;
      touch-action: none;
    }
  }

  // .colored-block__btn
  &__btn {
    position: absolute;
    right: 6px;
    top: 6px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    border-radius: 50%;
    border: 1px solid $color-light;
    box-shadow: 0 0 10px 0 rgba($color-main, 0.5);
    background-color: $color-main;
    padding: 4px;
    color: $color-light;
    cursor: pointer;
    opacity: 0.5;
    transition: $td;
    @include boxsize(36px);

    @include hover {
      opacity: 1;
    }

    svg {
      width: 100%;
      height: 100%;
    }
  }

  // .colored-block__body
  &__body {
    transition: opacity 0.3s ease;
  }

  // .colored-block__window
  &__window {
    position: absolute;
    left: 0;
    top: 0;
    border-radius: inherit;
    padding: 32px;
    max-height: 100%;
    overflow-y: auto;
    overflow-x: hidden;

    // .colored-block__window-list
    &-list {
      display: flex;
      gap: 20px;
      flex-wrap: wrap;
    }

    // .colored-block__window-item
    &-item {
      cursor: pointer;
      border: 1px solid $color-light;

      &:not(#{$b}__window-item--transparent) {
        border-radius: 50%;
        box-shadow: 0 0 10px 0 rgba($color-main, 0.5);
        @include boxsize(40px);
      }

      // .colored-block__window-item--transparent
      &--transparent {
        color: $color-light;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        white-space: nowrap;
        border-radius: 4px;
        background-color: $color-main !important;
        padding: 4px 8px;
      }
    }
  }
}
</style>
