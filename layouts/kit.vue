<template>
	<div class="kit-layout">
		<CustomHeader />
		<div class="kit-layout__main">
			<div class="container">
				<KitNavigation class="kit-layout__navigation" />
			</div>
			<NuxtPage />
		</div>
		<CustomFooter class="kit-layout__footer" />
	</div>
</template>

<script setup lang="ts">
useHead({
	title: 'Кит',
})
</script>

<style lang="scss">
$b: '.kit-layout';

#{$b} {
  display: flex;
  flex-direction: column;
  overflow: hidden;
  min-height: var(--app-height, 100vh);
  padding-top: calc(var(--header-height, 0px) + 40px);
  transition: padding 0.3s ease;

  // .kit-layout__navigation
  &__navigation {
    margin-bottom: 32px;
  }

  // .kit-layout__main
  &__main {
    margin: 30px 0 80px 0;
  }

  // .kit-layout__footer
  &__footer {
    margin-top: auto;
  }
}
</style>
