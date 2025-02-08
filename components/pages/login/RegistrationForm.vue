<template>
  <DefaultFormLayout class="registration-form" @submit="onSubmit">
    <div class="default-form-layout__fields">
      <div class="default-form-layout__field">
        <CustomInput v-model="form.username">
          Логин*
        </CustomInput>
      </div>
      <div class="default-form-layout__field">
        <CustomInput v-model="form.password" type="password">
          Пароль*
        </CustomInput>
      </div>
      <div class="default-form-layout__field">
        <CustomInput v-model="rePassword" type="password">
          Повторите пароль*
        </CustomInput>
      </div>
      <div class="default-form-layout__field">
        <CustomInput v-model="form.email">
          Email
        </CustomInput>
      </div>
      <div class="default-form-layout__field">
        <CustomInput v-model="form.first_name">
          Имя
        </CustomInput>
      </div>
      <div class="default-form-layout__field">
        <CustomInput v-model="form.last_name">
          Фамилия
        </CustomInput>
      </div>
    </div>
    <div class="default-form-layout__actions">
      <CustomButton>
        Зарегистрироваться
      </CustomButton>
    </div>
  </DefaultFormLayout>
</template>

<script lang="ts" setup>
import { useUserStore } from '~/store/api/user'

const userStore = useUserStore();

const rePassword = ref('')

const form = ref({
  username: '',
  password: '',
  email: '',
  first_name: '',
  last_name: '',
})

async function onSubmit() {
  const res = await userStore.REGISTRATION(form.value)
}
</script>
