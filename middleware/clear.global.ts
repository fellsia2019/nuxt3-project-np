import { useNotificationStore } from '~/store/common/notification'

export default defineNuxtRouteMiddleware(() => {
	const notificationStore = useNotificationStore()

	if (notificationStore.IS_VISIBLE) {
		notificationStore.CLEAR()
	}
})
