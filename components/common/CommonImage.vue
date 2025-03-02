<template>
	<picture v-if="isVisible">
		<source
			v-if="image.webp"
			:srcset="image.webp"
			type="image/webp"
		>
		<img
			:class="imgClass"
			:src="image.base || '/404.webp'"
		>
	</picture>
</template>

<script setup lang="ts">
import type { IImageData } from '~/types/common/Image'

interface IProps {
	image: IImageData
	displayEmpty?: boolean
	imgClass?: string
}

const props = withDefaults(defineProps<IProps>(), {
	displayEmpty: true,
	imgClass: '',
})

const isVisible = computed(() => {
	return props.image.base || props.displayEmpty
})
</script>
