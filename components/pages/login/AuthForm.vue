<template>
  <DefaultFormLayout class="auth-form" @submit="onSubmit">
    <div class="default-form-layout__fields">
      <div class="default-form-layout__field">
        <CustomInput v-model="form.username" autocomplete="username webauthn">
          Логин
        </CustomInput>
      </div>
      <div class="default-form-layout__field">
        <CustomInput v-model="form.password" autocomplete="current-password" type="password">
          Пароль
        </CustomInput>
      </div>
    </div>
    <div class="default-form-layout__actions">
      <CustomButton>
        Войти
      </CustomButton>
    </div>
  </DefaultFormLayout>
</template>

<script lang="ts" setup>
import { useUserStore } from '~/store/api/user'

const userStore = useUserStore();

const form = ref({
  username: '',
  password: ''
})

async function onSubmit() {
  const res = await userStore.AUTH(form.value)
}
</script>
