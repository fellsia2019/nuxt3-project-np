import { useNotificationStore } from '~/store/common/notification'

export default defineNuxtRouteMiddleware((to, from) => {
  const notificationStore = useNotificationStore()

  if (notificationStore.IS_VISIBLE) {
    notificationStore.CLEAR()
  }
})
