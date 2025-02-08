import { useUserStore } from '~/store/api/user'

export default defineNuxtPlugin(async (nuxtApp) => {
  const userStore = useUserStore()

  if (!userStore.fetchUserDataIsFinally) {
    await userStore.GET_USER_DATA()
  }
})
