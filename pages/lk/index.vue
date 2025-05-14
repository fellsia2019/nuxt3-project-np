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
						<UserForm
							v-if="userStore.user"
							:user="userStore.user"
						/>

						<div
							v-if="false"
							class="lk-page__project"
						>
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
import { useUserStore } from '~/store/api/user'

definePageMeta({
	middleware: ['login'],
	ssr: false,
})

useHead({
	title: 'Deep-cosmo | Личный кабинет',
})

const projectsStore = useProjectsStore()
const userStore = useUserStore()

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

	// .lk-page__inner
	&__inner {
		max-width: 800px;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 32px;
		margin-left: auto;
		margin-right: auto;
	}

	// .lk-page__body
	&__body {
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 32px;
	}
}
</style>
