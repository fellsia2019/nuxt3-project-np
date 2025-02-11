<template>
  <AnimateFigure :items="figuresLogo" class="main-logo" />
</template>

<script setup lang="ts">
const figuresLogo = [
  {
    icon: 'hexagon'
  },
  {
    icon: 'square'
  },
  {
    icon: 'triangle',
    noRotate: true
  },
]
</script>

<style lang="scss">
$b: '.main-logo';

#{$b} {
  width: 80px;
  height: 80px;
}
</style>
