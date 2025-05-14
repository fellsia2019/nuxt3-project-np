<template>
	<main class="projects-page">
		<div class="projects-page__inner">
			<div class="container">
				<div class="projects-page__header">
					<h1 class="projects-page__title title title-h1 color-primary">
						Проекты
					</h1>
				</div>
			</div>
			<div
				ref="projectsNode"
				class="projects-page__body"
			>
				<ProjectBlock
					v-if="projectsStore?.projects?.length"
					class="home-page__block"
					:projects="projectsStore.projects"
					:can-load-more="projectsStore.HAS_NEXT_PAGE"
					:pagination="projectsStore.PAGINATION"
					@show-more="showMore"
					@change-page="onChangePage"
				/>
			</div>
		</div>
	</main>
</template>

<script setup lang="ts">
import { useProjectsStore } from '~/store/api/projects'
import { scrollToBlock } from '~/helpers/scrollHelper'

useHead({
	title: 'Deep-cosmo | Проекты',
})

const projectsNode = ref<HTMLElement | null>(null)

const projectsStore = useProjectsStore()

await useAsyncData('projects', () => projectsStore.LOAD_PROJECTS().then(() => true))

function showMore() {
	projectsStore.LOAD_PROJECTS({ page: projectsStore.NEXT_PAGE_NUMBER })
}

async function onChangePage(page: number) {
	projectsStore.LOAD_PROJECTS({ withReplace: true, page })

	await nextTick()

	if (projectsNode.value) {
		scrollToBlock(projectsNode.value, true, 10)
	}
}
</script>

<style lang="scss">
$b: '.projects-page';

#{$b} {

  // .projects-page__header
  &__header {
    margin-bottom: 32px;

    @include mobile {
      margin-bottom: 24px;
    }
  }
}
</style>
