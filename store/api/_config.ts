import { defineStore } from 'pinia'
import { domainParser } from '~/helpers/routeHelpers'
import { type IApiService, type IDomain, HttpMethod } from '~/types/ApiService'

export const useConfigApiStore = defineStore('configApi', () => {
	const domainMain: IDomain = {
		secure: false,
		domain: '127.0.0.1', // сделать из env
		prefix: 'api/v1',
		port: 8000,
	}

	const services = computed<IApiService>(() => ({
		domain: domainParser(domainMain),
		routes: {
			projects: {
				path: 'project',
				allowOnlyWithAuth: [HttpMethod.POST, HttpMethod.PUT, HttpMethod.DELETE, HttpMethod.PATCH],
			},
			auth: {
				path: 'token',
				allowOnlyWithAuth: [],
			},
			tokenRefresh: {
				path: 'token/refresh',
				allowOnlyWithAuth: [],
			},
			tokenVerify: {
				path: 'token/verify',
				allowOnlyWithAuth: [],
			},
			user: {
				path: 'user',
				allowOnlyWithAuth: [HttpMethod.GET],
			},
			registration: {
				path: 'register',
				allowOnlyWithAuth: [],
			},
			initiatives: {
				path: 'initiative',
				allowOnlyWithAuth: [HttpMethod.POST, HttpMethod.PUT, HttpMethod.DELETE, HttpMethod.PATCH],
			},
		},
	}))

	return {
		services,
	}
})
