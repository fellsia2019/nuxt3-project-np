<template>
	<div
		ref="rootEl"
		class="animation-wrapper"
		:style="rootStyle"
	>
		<div
			class="animation-wrapper__inner"
			:style="animationStyle"
		>
			<slot />
		</div>
	</div>
</template>

<script setup lang="ts">
import {
	ANIMATE_STYLES,
	Animation,
	ANIMATIONS,
} from '~/components/common/animate/animationController'

interface IProps {
	animationName?: ANIMATIONS
	animationTime?: number
	animationDelay?: number
	animationTimeParalax?: number
	deltaPercent?: number
	observerOptions?: IntersectionObserverInit
	parallaxEnabled?: boolean
	awaitNextTick?: boolean
}

const props = withDefaults(defineProps<IProps>(), {
	animationName: ANIMATIONS.FADE_IN_UP,
	animationTime: 500,
	animationDelay: 300,
	animationTimeParalax: 500,
	deltaPercent: 0.1,
	observerOptions: () => ({
		rootMargin: '0px',
		threshold: [0.15, 0.25, 0.5, 0.75, 1],
	}),
	parallaxEnabled: true,
	awaitNextTick: false,
})

const isVisible = ref(false)
const rootEl = ref<HTMLElement | null>(null)
const AnimationInstance = ref<Animation | null>(null)

const animationStyle = computed(() => {
	const key = isVisible?.value ? 'show' : 'hide'
	return {
		...ANIMATE_STYLES[props.animationName][key],
		'--transition-time': `${props.animationTime}ms`,
	}
})

const rootStyle = computed(() => {
	return {
		'--transition-time-paralax': `${props.animationTimeParalax}ms`,
	}
})

function intersectingHandler() {
	setTimeout(() => {
		if (!isVisible.value) {
			isVisible.value = true
		}
	}, props.animationDelay)
}

async function init() {
	if (import.meta.server) {
		return
	}

	if (props.awaitNextTick) {
		await nextTick()
	}

	if (!rootEl.value) {
		return
	}

	AnimationInstance.value = new Animation({
		target: rootEl.value,
		animationName: props.animationName,
		observerOptions: props.observerOptions,
		intersectingHandler: intersectingHandler,
		paralaxOptions: props.parallaxEnabled
			? {
					deltaPercent: props.deltaPercent,
				}
			: null,
	})
}

onMounted(() => {
	init()
})

onBeforeUnmount(() => {
	AnimationInstance.value?.removeEvents()
})
</script>

<style lang="scss">
$b: '.animation-wrapper';

#{$b} {
  transition: all var(--transition-time-paralax) ease;

  // .animation-wrapper__inner
  &__inner {
    transition: all var(--transition-time) ease;
  }
}
</style>
