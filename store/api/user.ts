import { defineStore } from 'pinia'

import { useLoadingStore } from '~/store/common/loading'
import type { IUser } from '~/types/api/user'
import { HttpMethod } from '~/types/ApiService'

const LS_TOKEN_ACCESS_NAME = '_token_access_'
const LS_TOKEN_REFRESH_NAME = '_token_refresh_'

const LOADING_SLUG = 'user-store'

interface IUserApiState {
	user: IUser | null
	tokens: {
		access: null | string
		refresh: null | string
	}
	fetchUserDataIsFinally: boolean
}

function getCookieItem(name: string) {
	const cookie = useCookie(name)
	return cookie?.value || ''
}

function setCookieItem(name: string, value: string) {
	const cookie = useCookie(name)
	cookie.value = value
}

export const useUserStore = defineStore('user', {
	state: (): IUserApiState => ({
		user: null,
		tokens: {
			access: null,
			refresh: null,
		},
		fetchUserDataIsFinally: false,
	}),

	getters: {
		ACCESS_TOKEN: (state) => {
			return state.tokens.access || getCookieItem(LS_TOKEN_ACCESS_NAME)
		},

		REFRESH_TOKEN: (state) => {
			return state.tokens.refresh || getCookieItem(LS_TOKEN_REFRESH_NAME)
		},

		IS_AUTH: state => Boolean(state.user?.id),

		IS_LOADING: () => {
			const loadingStore = useLoadingStore()

			return Boolean(loadingStore.loadingList.find(item => item === LOADING_SLUG))
		},

		USER: state => state.user,
	},

	actions: {
		SAVE_ACCESS_TOKEN(token: string, onlyState: boolean = false) {
			this.tokens.access = token
			if (!onlyState && import.meta.client) {
				setCookieItem(LS_TOKEN_ACCESS_NAME, token)
			}
		},

		SAVE_REFRESH_TOKEN(token: string, onlyState: boolean = false) {
			this.tokens.refresh = token
			if (!onlyState && import.meta.client) {
				setCookieItem(LS_TOKEN_REFRESH_NAME, token)
			}
		},

		SET_LOADING(isLoading: boolean) {
			const loadingStore = useLoadingStore()

			loadingStore.SET_LOADING(isLoading, LOADING_SLUG)
		},

		async REGISTRATION(body: { username: string, password: string, email: string, first_name: string, last_name: string }) {
			try {
				if (this.IS_LOADING) {
					return
				}

				this.SET_LOADING(true)

				const response = await useCustomFetch(
					'registration',
					{
						method: HttpMethod.POST,
						body: body,
					},
				)

				if (response?.ok && (response?.data?.refresh && response?.data?.access)) {
					this.SAVE_ACCESS_TOKEN(response?.data?.access)
					this.SAVE_REFRESH_TOKEN(response?.data?.refresh)

					useRouter().push({ name: 'lk' })
					this.GET_USER(true)

					return true
				}

				if (!response?.ok && response?.data) {
					setNotificationFromResponseError(response?.data)

					return false
				}
			}
			catch (e) {
				throw new Error(`store:user | REGISTRATION - ${e}`)
			}
			finally {
				this.SET_LOADING(false)
			}
		},

		async AUTH(body: { username: string, password: string }) {
			try {
				if (this.IS_LOADING) {
					return
				}

				this.SET_LOADING(true)

				const response = await useCustomFetch(
					'auth',
					{
						method: HttpMethod.POST,
						body: body,
					},
				)

				if (response?.ok && (response.data?.refresh && response?.data?.access)) {
					this.SAVE_ACCESS_TOKEN(response?.data?.access)
					this.SAVE_REFRESH_TOKEN(response?.data?.refresh)

					await this.GET_USER(true)
					useRouter().push({ name: 'lk' })

					return true
				}

				if (!response?.ok && response?.data) {
					setNotificationFromResponseError(response?.data)

					return false
				}
			}
			catch (e) {
				throw new Error(`store:user | AUTH - ${e}`)
			}
			finally {
				this.SET_LOADING(false)
			}
		},

		async GET_USER_DATA() {
			if (!this.tokens?.access && this.ACCESS_TOKEN) {
				this.SAVE_ACCESS_TOKEN(this.ACCESS_TOKEN, true)
			}
			if (!this.tokens?.refresh && this.REFRESH_TOKEN) {
				this.SAVE_REFRESH_TOKEN(this.REFRESH_TOKEN, true)
			}

			try {
				this.fetchUserDataIsFinally = true
				if (!this.ACCESS_TOKEN || !this.REFRESH_TOKEN) {
					return
				}

				const isVerify = await this.DO_VERIFY_TOKEN(this.ACCESS_TOKEN)

				if (isVerify) {
					await this.GET_USER(false, true)
				}
				else {
					const refreshIsSuccess = await this.DO_REFRESH_TOKEN(this.REFRESH_TOKEN)

					if (refreshIsSuccess) {
						await this.GET_USER()
					}
				}
			}
			catch (e) {
				throw new Error(`store:user | GET_USER_DATA - ${e}`)
			}
			finally {
				this.fetchUserDataIsFinally = true
			}
		},

		async GET_USER(noCheckAuth: boolean = false, noCheckTokenVerify: boolean = false) {
			try {
				const response = await useCustomFetch(
					'user',
					{},
					'',
					noCheckAuth,
					noCheckTokenVerify,
				)

				if (response?.ok && response?.data?.id) {
					this.user = response?.data

					return true
				}

				if (!response?.ok && response?.data) {
					setNotificationFromResponseError(response?.data)

					return false
				}
			}
			catch (e) {
				throw new Error(`store:user | GET_USER - ${e}`)
			}
		},

		async DO_VERIFY_TOKEN(token: string) {
			try {
				const response = await useCustomFetch(
					'tokenVerify',
					{
						method: HttpMethod.POST,
						body: { token },
					},
				)

				if (response?.data?.detail) {
					return false
				}
				else if (response?.data) {
					return true
				}
			}
			catch (e) {
				throw new Error(`store:user | DO_VERIFY_TOKEN - ${e}`)
			}
		},

		async DO_REFRESH_TOKEN(token: string) {
			try {
				const response = await useCustomFetch(
					'tokenRefresh',
					{
						method: HttpMethod.POST,
						body: { refresh: token },
					},
				)

				if (response?.ok && response?.data?.access) {
					this.SAVE_ACCESS_TOKEN(response?.data?.access)
					return true
				}
				else {
					return false
				}
			}
			catch (e) {
				throw new Error(`store:user | DO_REFRESH_TOKEN - ${e}`)
			}
		},

		LOGOUT() {
			this.SAVE_ACCESS_TOKEN('')
			this.SAVE_REFRESH_TOKEN('')
			this.user = null
			useRouter().push({ name: 'index' })
		},
	},
})
