<template>
	<DefaultFormLayout
		class="user-form"
		@submit="onSubmit"
	>
		<div class="default-form-layout__fields">
			<div class="default-form-layout__field">
				<CustomInput
					v-model="form.first_name"
					autocomplete="username webauthn"
				>
					Имя
				</CustomInput>
			</div>
			<div class="default-form-layout__field">
				<CustomInput
					v-model="form.last_name"
					autocomplete="username webauthn"
				>
					Фамилия
				</CustomInput>
			</div>
			<div class="default-form-layout__field">
				<CustomInput
					v-model="form.email"
					autocomplete="username webauthn"
				>
					Почта
				</CustomInput>
			</div>
			<div class="default-form-layout__field">
				<CustomInput
					:model-value="form.username"
					readonly
					autocomplete="username webauthn"
				>
					Логин
				</CustomInput>
			</div>
		</div>
		<div class="default-form-layout__actions">
			<CustomButton>
				Сохранить
			</CustomButton>
		</div>
	</DefaultFormLayout>
</template>

<script lang="ts" setup>
import type { IUser } from '~/types/api/user'

interface IProps {
	user: IUser
}

const props = defineProps<IProps>()

const form = ref<IUser>({ ...props.user })

function onSubmit() {
	//
}
</script>

<style lang="scss">
$b: '.user-form';

#{$b} {
}
</style>
