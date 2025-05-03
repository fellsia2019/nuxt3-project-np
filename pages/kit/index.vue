<template>
	<main class="kit-page">
		<div class="container">
			<div class="kit-page__inner">
				<h1 class="kit-page__title title title-h1">
					Kit index
				</h1>

				<div class="kit-page__description">
					<p>
						Данная страница будет полезна разработчикам, здесь они могут увидеть разные глобальные компоненты, элементы, CSS хелпер классы и многое другое, что можно переиспользовать в любом месте.
					</p>
					<p>
						Приведенные примеры блоков представлены со всеми возможными наборами опций - темы, размеры и тд.
					</p>
					<p>
						Для блоков\элементов с разными цветовыми темами в ките предоставлена возможность менять цвета фона секции.
					</p>
				</div>
			</div>
		</div>
	</main>
</template>

<script setup lang="ts">
definePageMeta({
	layout: 'kit',
})
</script>

<style lang="scss">
$b: '.kit-page';

#{$b} {
  // .kit-page__title
  &__title {
    margin-bottom: 40px;
  }

  // .kit-page__description
  &__description {
    & > * {
      &:not(:last-child) {
        margin-bottom: 16px;
      }
    }
  }
}
</style>
