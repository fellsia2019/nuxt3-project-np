<template>
	<div>
		<NuxtLayout>
			<NuxtPage />
		</NuxtLayout>
	</div>
</template>

<script setup lang="ts">
import type { IBreakpoint } from '~/types/common/Breakpoint'
import resizeHelpers from '~/helpers/resizeHelpers'

const resizeObserver = ref<ResizeObserver | null>(null)

const resizeHelperInstance = ref<null | resizeHelpers>(null)
const resizeHelperInstanceWithCheckHeigh = ref<null | resizeHelpers>(null)

const breakpoint = ref<IBreakpoint>({
	isMobile: false,
	isTablet: false,
	isLowDesktop: false,
	isDesktop: false,
	isDesktopMd: false,
	isDesktopLg: false,
})

provide('breakpoint', breakpoint)

onMounted(() => {
	if (import.meta.server) {
		return
	}

	resizeObserver.value = new ResizeObserver(saveSettingInRootVars)
	saveSettingInRootVars()
	resizeObserver.value.observe(document.documentElement)

	resizeHelperInstance.value = new resizeHelpers([updateBreakpoint])
	resizeHelperInstanceWithCheckHeigh.value = new resizeHelpers([saveSettingInRootVars], true)
	updateBreakpoint()
})

onBeforeUnmount(() => {
	resizeHelperInstance.value?.destroy()
	resizeHelperInstanceWithCheckHeigh.value?.destroy()
})

function saveSettingInRootVars() {
	nextTick(() => {
		const height = window.innerHeight

		document.documentElement.style.setProperty('--app-height', `${height}px`)
	})
}

function getBreakpoint() {
	const { innerWidth } = window
	return {
		isMobile: innerWidth < 768,
		isTablet: innerWidth >= 768 && innerWidth < 1024,
		isLowDesktop: innerWidth >= 1024 && innerWidth < 1280,
		isDesktop: innerWidth >= 1024,
		isDesktopMd: innerWidth >= 1280,
		isDesktopLg: innerWidth >= 1480,
	}
}

function updateBreakpoint() {
	breakpoint.value = getBreakpoint()
}
</script>
