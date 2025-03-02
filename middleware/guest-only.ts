import { useUserStore } from '~/store/api/user'

export default defineNuxtRouteMiddleware((to) => {
	const userStore = useUserStore()

	if (userStore.IS_AUTH && to.path !== '/') {
		return navigateTo('/', { redirectCode: 301 })
	}
})
