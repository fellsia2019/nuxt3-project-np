<template>
	<ClientOnly>
		<main class="lk-page">
			<div class="container">
				<div class="lk-page__inner">
					<div class="lk-page__header">
						<h1 class="lk-page__title title title-h1 color-primary">
							Личный кабинет
						</h1>
					</div>

					<div class="lk-page__body">
						<!-- TODO: userform -->

						<div class="lk-page__project">
							<form
								action=""
								@submit.prevent="onSubmit"
							>
								<legend class="title-h4">
									Добавить проект
								</legend>
								<input
									v-model="projectForm.title"
									type="text"
									placeholder="title"
								>
								<textarea
									v-model="projectForm.content"
									type="text"
									placeholder="content"
								/>
								<CustomButton>
									Отправить
								</CustomButton>
							</form>
						</div>
					</div>
				</div>
			</div>
		</main>
	</ClientOnly>
</template>

<script setup lang="ts">
import { ClientOnly } from '#components'
import { useProjectsStore } from '~/store/api/projects'

definePageMeta({
	middleware: ['login'],
	ssr: false,
})

const projectsStore = useProjectsStore()

const projectForm = ref({
	title: '',
	content: '',
})

async function onSubmit() {
	await projectsStore.CREATE_PROJECT(projectForm.value)
}
</script>

<style lang="scss">
$b: '.lk-page';

#{$b} {

  form {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }
  input {
    height: 40px;
  }
  input, textarea {
    padding: 5px 20px;
    border: 1px solid $color-primary;
  }
  textarea {
    height: 250px;
  }
}
</style>
