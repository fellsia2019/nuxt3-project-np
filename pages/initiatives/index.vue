<template>
	<main class="initiatives-page">
		<div class="initiatives-page__inner">
			<div class="container">
				<Breadcrumbs
					v-if="breadcrumbs?.length"
					class="initiatives-page__breadcrumbs"
					:items="breadcrumbs"
				/>

				<div class="initiatives-page__header">
					<h1 class="initiatives-page__title title title-h1 color-primary-accent">
						Инициативы
					</h1>
				</div>
			</div>
			<div
				ref="iniativesNode"
				class="initiatives-page__body"
			>
				<InitiativeBlock
					v-if="initiativesStore?.initiatives?.length"
					class="home-page__block"
					:initiatives="initiativesStore.initiatives"
					:can-load-more="initiativesStore.HAS_NEXT_PAGE"
					:pagination="initiativesStore.PAGINATION"
					@show-more="showMore"
					@change-page="onChangePage"
				/>
			</div>
		</div>
	</main>
</template>

<script setup lang="ts">
import { useInitiativesStore } from '~/store/api/initiatives'
import { scrollToBlock } from '~/helpers/scrollHelper'

useHead({
	title: 'Инициативы',
})

definePageMeta({
	breadcrumb: {
		label: 'Инициативы',
	},
})

const breadcrumbs = useBreadcrumbItems({
	schemaOrg: true,
}) as ComputedRef<Array<IBreadcrumbItem>>

const iniativesNode = ref<HTMLElement | null>(null)

const initiativesStore = useInitiativesStore()

await useAsyncData('initiatives', () => initiativesStore.LOAD_INITIATIVES().then(() => true))

function showMore() {
	initiativesStore.LOAD_INITIATIVES({ page: initiativesStore.NEXT_PAGE_NUMBER })
}

async function onChangePage(page: number) {
	initiativesStore.LOAD_INITIATIVES({ withReplace: true, page })

	await nextTick()

	if (iniativesNode.value) {
		scrollToBlock(iniativesNode.value, true, 10)
	}
}
</script>

<style lang="scss">
$b: '.initiatives-page';

#{$b} {

	// .initiatives-page__breadcrumbs
	&__breadcrumbs {
		margin-bottom: 20px;

    @include mobile {
      margin-bottom: 12px;
    }
	}

  // .initiatives-page__header
  &__header {
    margin-bottom: 32px;

    @include mobile {
      margin-bottom: 24px;
    }
  }
}
</style>
