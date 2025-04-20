<template>
	<div class="custom-single-range">
		<div class="custom-single-range__inner">
			<div
				ref="line"
				class="custom-single-range__line"
				:style="lineStyle"
				@mousedown="onClickLine"
				@touchstart="onClickLine"
			>
				<div
					ref="bar"
					class="custom-single-range__bar"
					@mousedown="start"
					@touchstart="start"
				/>
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
interface Range {
	from: number
	to: number
}

const props = defineProps<{
	range: Range
	modelValue: number
}>()

const emit = defineEmits<{
	(e: 'update:modelValue', value: number): void
}>()

const line = ref<HTMLElement | null>(null)
const bar = ref<HTMLElement | null>(null)
const canMove = ref(false)
const startPosition = ref(0)
const barSize = ref(16)

const lineStyle = computed(() => {
	return {
		'--range-progress': `${props.modelValue}%`,
		'--bar-size': `${barSize.value}px`,
	}
})

const start = (e: MouseEvent | TouchEvent) => {
	canMove.value = true
	startPosition.value = e instanceof TouchEvent ? e.touches[0].pageX : e.pageX
	document.documentElement.style.userSelect = 'none'
}

const move = (e: MouseEvent | TouchEvent) => {
	if (!canMove.value) {
		return
	}

	const pageX = e instanceof TouchEvent ? e.touches[0].pageX : e.pageX
	setProgress(e, startPosition.value, props.modelValue)
	startPosition.value = pageX
}

const end = () => {
	canMove.value = false
	document.documentElement.style.userSelect = ''
}

const setProgress = (e: MouseEvent | TouchEvent, startPosition: number, currentValue: number) => {
	if (!line.value) return

	const lineRect = line.value.getBoundingClientRect()
	const pageX = e instanceof TouchEvent ? e.touches[0].pageX : (e as MouseEvent).pageX
	const delta = pageX - startPosition
	const deltaPercent = props.range.to * delta / lineRect.width

	if (!delta || (pageX < lineRect.left && delta > 0) || (pageX > lineRect.right && delta < 0)) {
		return
	}

	let result = currentValue + deltaPercent
	const max = props.range.to
	const min = props.range.from

	if (result >= max) {
		result = max
	}
	if (result <= min) {
		result = min
	}

	emit('update:modelValue', result)
}

const onClickLine = (e: MouseEvent | TouchEvent) => {
	if (!bar.value || !line.value) return

	const target = e instanceof TouchEvent ? document.elementFromPoint(e.touches[0].clientX, e.touches[0].clientY) : e.target
	if (target === bar.value) {
		return
	}

	const lineRect = line.value.getBoundingClientRect()
	setProgress(e, lineRect.left, 0)
}

onMounted(() => {
	window.addEventListener('mouseup', end)
	window.addEventListener('mousemove', move)

	window.addEventListener('touchend', end)
	window.addEventListener('touchmove', move)
})

onBeforeUnmount(() => {
	window.removeEventListener('mouseup', end)
	window.removeEventListener('mousemove', move)

	window.removeEventListener('touchend', end)
	window.removeEventListener('touchmove', move)
})
</script>

<style lang="scss">
$b: '.custom-single-range';

#{$b} {

  // .custom-single-range__inner
  &__inner {
    width: 100%;
  }

  // .custom-single-range__line
  &__line {
    width: 100%;
    height: 4px;
    position: relative;
    cursor: pointer;
    border-radius: 8px;
    background-color: $color-secondary;

    &::after {
      content: '';
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      max-width: var(--range-progress, 0);
      height: 100%;
      background-color: $color-primary;
      border-radius: 8px;
    }

    &::before {
      content: '';
      position: absolute;
      right: 5px;
      width: calc(var(--bar-size, 0) + 5px);
      height: 100%;
      border-radius: 8px;
      transform: translateX(100%);
      background-color: $color-secondary;
    }
  }

  // .custom-single-range__bar
  &__bar {
    position: absolute;
    top: 50%;
    left: var(--range-progress, 0);
    transform: translateY(-50%);
    border-radius: 50%;
    border: 2px solid $color-primary;
    background-color: $color-light;
    z-index: 2;

    @include boxsize(var(--bar-size));
  }
}
</style>
