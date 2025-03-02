<template>
	<div
		class="custom-pagination"
		:class="[`custom-pagination--theme-${theme}`, { 'custom-pagination--is-disabled': isDisabled }]"
	>
		<div class="custom-pagination__inner">
			<CustomButton
				v-show="!hiddenMoreBtn"
				class="custom-pagination__show-more"
				:disabled="isDisabledShowMore || isDisabled"
				:theme="theme"
				@click="showMore"
			>
				Показать ещё
			</CustomButton>
			<div class="custom-pagination__list">
				<div
					v-if="isVisibleFirstPage"
					class="custom-pagination__item"
					@click="change(1)"
				>
					<span class="custom-pagination__item-inner">
						{{ 1 }}
					</span>
				</div>
				<div
					v-if="isVisibleFirstPage"
					class="custom-pagination__item custom-pagination__item--dots"
				>
					<span class="custom-pagination__item-inner">
						...
					</span>
				</div>

				<div
					v-for="page in pages"
					:key="`custom-pagination__item-${page}`"
					class="custom-pagination__item"
					:class="{ 'custom-pagination__item--is-active': page === currentPage }"
					@click="change(page)"
				>
					<span class="custom-pagination__item-inner">
						{{ page }}
					</span>
				</div>

				<div
					v-if="isVisibleLastPage"
					class="custom-pagination__item custom-pagination__item--dots"
				>
					<span class="custom-pagination__item-inner">
						...
					</span>
				</div>
				<div
					v-if="isVisibleLastPage"
					class="custom-pagination__item"
					@click="change(countPages)"
				>
					<span class="custom-pagination__item-inner">
						{{ countPages }}
					</span>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import range from 'lodash-es/range'
import { CustomPaginationThemeSettings } from '~/types/common/CustomPagination'
import type { IBreakpoint } from '~/types/common/Breakpoint'

interface IProps {
	currentPage: number
	countPages: number
	initialDisplayCount?: number
	initialDisplayCountMobile?: number
	isDisabled?: boolean
	hiddenMoreBtn?: boolean
	theme?: CustomPaginationThemeSettings
}
interface IEmits {
	(e: 'change', page: number): void
	(e: 'show-more'): void
}

const props = withDefaults(defineProps<IProps>(), {
	initialDisplayCount: 5,
	initialDisplayCountMobile: 3,
	theme: CustomPaginationThemeSettings.PRIMARY,
})
const emits = defineEmits<IEmits>()

const breakpoint = inject<Ref<IBreakpoint>>('breakpoint')

const adaptiveDisplayCount = computed(() => {
	return breakpoint?.value?.isMobile ? props.initialDisplayCountMobile : props.initialDisplayCount
})

const displayCount = computed(() => {
	return props.countPages >= adaptiveDisplayCount.value
		? adaptiveDisplayCount.value
		: props.countPages
})

const pages = computed<Array<number>>(() => {
	const maxIndex = props.countPages - displayCount.value + 1
	const delta = Math.floor(displayCount.value / 2)
	const startIndex = Math.min((props.currentPage - delta < 1 ? 1 : props.currentPage - delta), maxIndex)

	return range(startIndex, startIndex + displayCount.value)
})

const isVisibleFirstPage = computed(() => {
	return pages.value[0] > 1
})

const isVisibleLastPage = computed(() => {
	return (pages.value?.at(-1) || Number.POSITIVE_INFINITY) < props.countPages
})

const isDisabledShowMore = computed(() => {
	return props.currentPage === props.countPages
})

function change(page: number) {
	emits('change', page)
}

function showMore() {
	emits('show-more')
}
</script>

<style lang="scss">
$b: '.custom-pagination';

$btn-size: 50px;
$btn-size-sm: 40px;

#{$b} {
  user-select: none;

  // .custom-pagination__inner
  &__inner {
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    gap: 26px;
  }

  // .custom-pagination__list
  &__list {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
  }

  // .custom-pagination__item
  &__item {
    position: relative;
    width: $btn-size;
    min-width: $btn-size;
    height: $btn-size;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    white-space: nowrap;
    cursor: pointer;
    transition: transform 0.3s ease;

    @include mobile {
      width: $btn-size-sm;
      min-width: $btn-size-sm;
      height: $btn-size-sm;
    }

    // .custom-pagination__item-inner
    &-inner {
      position: relative;
      z-index: 1;
    }

    &:not(#{$b}__item--is-active) {
      &:hover {
        #{$b}--theme-primary & {
          color: $color-primary;
        }
        #{$b}--theme-light & {
          color: $color-light;
        }
        #{$b}--theme-primary-accent & {
          color: $color-primary-accent;
        }
      }
    }

    &::before {
      content: '';
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      touch-action: none;
      border: 1px solid;
      transition: transform 0.3s ease;

      #{$b}--theme-primary & {
        border-color: $color-primary;
      }
      #{$b}--theme-light & {
        border-color: $color-light;
      }
      #{$b}--theme-primary-accent & {
        border-color: $color-primary-accent;
      }
    }

    // .custom-pagination__item--is-active
    &--is-active {
      pointer-events: none;
      touch-action: none;
      color: $color-light;

      #{$b}--theme-primary & {
        &::before {
          background-color: $color-primary;
          border-color: $color-primary;
        }
      }
      #{$b}--theme-light & {
        color: $color-dark;

        &::before {
          background-color: $color-light;
          border-color: $color-light;
        }
      }
      #{$b}--theme-primary-accent & {
        &::before {
          background-color: $color-primary-accent;
          border-color: $color-primary-accent;
        }
      }
    }

    // .custom-pagination__item--dots
    &--dots {
      border: none;
      min-width: unset;
      width: auto;
      pointer-events: none;
      touch-action: none;

      &::before {
        display: none;
      }
    }

    #{$b}--is-disabled & {
      opacity: 0.5;
      pointer-events: none;
      touch-action: none;
    }
  }
}
</style>
