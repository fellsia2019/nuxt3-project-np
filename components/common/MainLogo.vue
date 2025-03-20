<template>
	<AnimateFigure
		:items="figuresLogo"
		class="main-logo"
	/>
</template>

<script setup lang="ts">
const figuresLogo = [
	{
		icon: 'hexagon',
	},
	{
		icon: 'square',
	},
	{
		icon: 'circle',
	},
	{
		icon: 'triangle',
		noRotate: true,
	},
]
</script>

<style lang="scss">
$b: '.main-logo';

#{$b} {
  width: 80px;
  height: 80px;

  @include tablet {
    width: 64px;
    height: 64px;
  }

  @include mobile {
    width: 50px;
    height: 50px;
  }
}
</style>
