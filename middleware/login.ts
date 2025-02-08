import { useUserStore } from '~/store/api/user'

export default defineNuxtRouteMiddleware(async (to, from) => {

  if (import.meta.server) {
    return
  }

  const userStore = useUserStore()

  if (!userStore.IS_AUTH && (userStore.ACCESS_TOKEN && userStore.REFRESH_TOKEN)) {
    await useAsyncData('user-data', () => userStore.GET_USER_DATA().then(() => true))
  }

  if (!userStore.IS_AUTH) {
    return navigateTo({ name: 'login' })
  }
})
