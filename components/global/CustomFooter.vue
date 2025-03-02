<template>
	<footer class="custom-footer">
		<div class="container">
			<div class="custom-footer__inner">
				footer
			</div>
		</div>
	</footer>
</template>

<style lang="scss">
$b: '.custom-footer';

#{$b} {
  position: relative;
  padding: 30px 0;
  border-top: 1px solid $color-light;
  box-shadow: 0 0 30px 0 rgba($color-light, 0.5);
  background-color: $color-main;
  z-index: 2;
}
</style>
