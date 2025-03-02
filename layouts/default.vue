<template>
	<div class="default-layout">
		<CustomHeader />
		<div class="default-layout__main">
			<NuxtPage />
		</div>
		<CustomFooter class="default-layout__footer" />
		<LoadingSpinner />
		<CustomNotification />
	</div>
</template>

<style lang="scss">
$b: '.default-layout';

#{$b} {
  display: flex;
  flex-direction: column;
  overflow: hidden;
  min-height: var(--app-height, 100vh);
  padding-top: var(--header-height, 0px);
  transition: padding 0.3s ease;

  // .default-layout__main
  &__main {
    margin: 40px 0 80px 0;
  }

  // .default-layout__footer
  &__footer {
    margin-top: auto;
  }
}
</style>
