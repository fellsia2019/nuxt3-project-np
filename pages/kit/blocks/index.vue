<template>
	<div class="kit-blocks">
		<div class="container">
			<div class="kit-blocks__inner">
				<div class="kit-blocks__header">
					<h1 class="kit-blocks__title title title-h1">
						Блоки
					</h1>
				</div>

				<div class="kit-blocks__block">
					<div class="kit-blocks__block-header">
						<h2 class="kit-blocks__block-title title title-h2">
							Аккордеоны
						</h2>
					</div>

					<ColoredBlock>
						<div
							v-for="theme in AccordionThemeSettings"
							:key="`kit-blocks__block-item-${theme}`"
							class="kit-blocks__block-item"
						>
							<Accordion :theme="theme">
								<template #header>
									Аккордеон {{ theme }}
								</template>

								Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aliquam dolore commodi beatae eum, quasi totam, quaerat culpa error sint, officiis autem soluta sunt. Voluptatum fuga quisquam laudantium corrupti officia et sapiente, facilis voluptates reiciendis placeat adipisci ducimus odio quas ratione, consectetur quo quam illo in aliquid, corporis culpa. Laborum, quod!
							</Accordion>
						</div>
					</ColoredBlock>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { AccordionThemeSettings } from '~/types/common/Accordion'

definePageMeta({
	layout: 'kit',
})
</script>

<style lang="scss">
$b: '.kit-blocks';

#{$b} {

  // .kit-blocks__header
  &__header {
    margin-bottom: 48px;
  }

  // .kit-blocks__block
  &__block {
    &:not(:last-child) {
      margin-bottom: 60px;
    }

    // .kit-blocks__block-header
    &-header {
      margin-bottom: 24px;
    }

    // .kit-blocks__block-item
    &-item {
      &:not(:last-child) {
        margin-bottom: 32px;
      }
    }
  }
}
</style>
