import { useUserStore } from '~/store/api/user'

export default defineNuxtRouteMiddleware(async () => {
	const userStore = useUserStore()

	if (!userStore.IS_AUTH) {
		return navigateTo({ name: 'login' })
	}
})
