import { useUserStore } from '~/store/api/user'

export default defineNuxtPlugin(async () => {
	const userStore = useUserStore()

	if (!userStore.fetchUserDataIsFinally) {
		await userStore.GET_USER_DATA()
	}
})
