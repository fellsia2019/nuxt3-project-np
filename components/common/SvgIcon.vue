<template>
	<svg class="svg-icon">
		<use :href="`#icon-${icon}`" />
	</svg>
</template>

<script setup lang="ts">
interface IProps {
	icon: string
}

defineProps<IProps>()
</script>

<style lang="scss">
.svg-icon {
  max-width: 100%;
  max-height: 100%;
  display: block;
  fill: currentColor;
}
</style>
