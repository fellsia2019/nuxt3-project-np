<template>
  <main class="auth-page">
    <div class="container">
      <div class="auth-page__inner">
        <div @submit.prevent="" class="auth-page__form">
          <input v-model="form.username" type="text" placeholder="username">
          <input v-model="form.password" type="password" placeholder="password">
          <CustomButton @click="onSubmit">
            Войти
          </CustomButton>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { useUserStore } from '~/store/api/user'

const userStore = useUserStore();

const form = ref({
  username: '',
  password: ''
})

async function onSubmit() {
  const res = await userStore.AUTH(form.value)
  console.log('RES', res)
}
</script>

<style lang="scss">

$b: '.auth-page';

#{$b} {

  // .auth-page__form
  &__form {
    display: flex;
    align-items: center;
    flex-direction: column;
    gap: 20px;
  }

  input {
    height: 40px;
    padding: 5px 20px;
    border: 1px solid $color-primary;
  }
}
</style>
