<template>
	<div
		class="accordion"
		:class="[`accordion--theme-${theme}`, { 'accordion--is-opened': isOpened }]"
	>
		<div
			class="accordion__header"
			@click="toggleAccordion"
		>
			<div class="accordion__header-name title title-h3">
				<slot name="header" />
			</div>

			<div class="accordion__header-btn">
				<CustomIconArrow
					class="accordion__header-icon"
					:is-reverse="isOpened"
				/>
			</div>
		</div>
		<div class="accordion__body">
			<div class="accordion__body-inner">
				<slot />
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { AccordionThemeSettings } from '~/types/common/Accordion'

interface IAccordion {
	theme?: AccordionThemeSettings
}

withDefaults(defineProps<IAccordion>(), {
	theme: AccordionThemeSettings.PRIMARY,
})

const isOpened = ref(false)

function toggleAccordion() {
	isOpened.value = !isOpened.value
}
</script>

<style lang="scss">
$b: '.accordion';

#{$b} {
  --bg: transparent;
  --bg-active: transparent;
  --color: transparent;
  --color-active: var(--bg);
  color: var(--color);

  // .accordion--theme-dark
  &--theme-dark {
    --bg: #{$color-main};
    --color: #{$color-light};
  }

  // .accordion--theme-light
  &--theme-light {
    --bg: #{$color-light};
    --color: #{$color-main};
  }

  // .accordion--theme-primary
  &--theme-primary {
    --bg: #{$color-primary};
    --color: #{$color-light};
  }

  // .accordion--theme-primary-accent
  &--theme-primary-accent {
    --bg: #{$color-primary-accent};
    --color: #{$color-light};
  }

  // .accordion__header
  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 24px;
    background-color: var(--bg);
    border-radius: 6px;
    padding: 12px 24px;
    cursor: pointer;
    transition: $td;
    border: 2px solid var(--bg);

    @include hover {
      background-color: var(--bg-active);
      box-shadow: 0 0 18px 0 var(--bg);
      color: var(--color-active);
    }

    @include mobile {
      padding: 12px;
    }
  }

  // .accordion__body
  &__body {
    display: grid;
    grid-template-rows: 0fr;
    overflow: hidden;
    will-change: grid-template-rows;
    opacity: 0;
    pointer-events: none;
    touch-action: none;
    transition: $td;

    #{$b}--is-opened & {
      grid-template-rows: 1fr;
      padding-top: 5px;
      opacity: 1;
      pointer-events: unset;
      touch-action: unset;
    }

    // .accordion__body-inner
    &-inner {
      min-height: 0;
      background-color: var(--bg);
      padding: 24px;
      border-radius: 6px;
      transition: $td;
      overflow: hidden;

      @include mobile {
        padding: 12px;
      }

      #{$b}:not(#{$b}--is-opened) & {
        padding-top: 0 !important;
        padding-bottom: 0 !important;
      }
    }
  }
}
</style>
