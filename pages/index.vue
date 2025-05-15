<template>
	<main class="home-page">
		<div class="container">
			<div class="home-page__header">
				<h1 class="home-page__title title title-h1">
					Главная страница
				</h1>

				<p>
					Это обычный пет-проект.
					<br>
					Он не нацелен на получение прибыли или любой другой коммерческой, финансовой, материальной и любой другой выгоды.
					<br>
					Прошу не обращать особое внимание на дизайн, он создавался внезапно и на коленке.
					<br>
					Первостепенная задача этого проекта продемонстрировать уровень hard скиллов
				</p>
			</div>
		</div>

		<div class="home-page__body">
			<ProjectBlock
				v-if="projectsStore?.projects?.length"
				class="home-page__block"
				title="Проекты"
				:projects="projectsStore.projects"
				:is-slider="true"
			>
				<template #title>
					<NuxtLink
						class="link"
						:to="{ name: 'projects' }"
					>
						Проекты
					</NuxtLink>
				</template>
			</ProjectBlock>

			<InitiativeBlock
				v-if="initiativesStore?.initiatives?.length"
				class="home-page__block"
				:initiatives="initiativesStore.initiatives"
				:is-slider="true"
			>
				<template #title>
					<NuxtLink
						class="link"
						:to="{ name: 'initiatives' }"
					>
						Инициативы
					</NuxtLink>
				</template>
			</InitiativeBlock>

			<ArticleBlock
				v-if="articlesStore?.articles?.length"
				class="home-page__block"
				:articles="articlesStore.articles"
				:is-slider="true"
			>
				<template #title>
					<NuxtLink
						class="link"
						:to="{ name: 'articles' }"
					>
						Статьи
					</NuxtLink>
				</template>
			</ArticleBlock>
		</div>
	</main>
</template>

<script setup lang="ts">
import { useProjectsStore } from '~/store/api/projects'
import { useInitiativesStore } from '~/store/api/initiatives'
import { useArticlesStore } from '~/store/api/articles'

definePageMeta({
	breadcrumb: {
		ariaLabel: 'Главная',
	},
})

const projectsStore = useProjectsStore()
const initiativesStore = useInitiativesStore()
const articlesStore = useArticlesStore()

await useAsyncData('main-page', () => Promise.all([projectsStore.LOAD_PROJECTS(), initiativesStore.LOAD_INITIATIVES(), articlesStore.LOAD_ARTICLES()]).then(() => true))
</script>

<style lang="scss">
$b: '.home-page';

#{$b} {

  // .home-page__header
  &__header {
    position: relative;
    margin-bottom: 40px;
    z-index: 5;
  }

  // .home-page__title
  &__title {
    &:not(:last-child) {
      margin-bottom: 16px;
    }
  }

  // .home-page__block
  &__block {
    &:not(:last-child) {
      margin-bottom: 80px;

      @include tablet {
        margin-bottom: 64px;
      }

      @include mobile {
        margin-bottom: 48px;
      }
    }
  }
}
</style>
