import { defineStore } from 'pinia'
import { domainParser } from '~/helpers/routeHelpers'
import { type IApiService, type IDomain, HttpMethod } from '~/types/ApiService'

export const useConfigApiStore = defineStore('configApi', () => {
	const runtimeConfig = useRuntimeConfig()

	console.log('runtimeConfig', runtimeConfig)

	const domainMain: IDomain = {
		secure: Boolean(runtimeConfig.public?.apiSecure),
		domain: String(runtimeConfig.public?.apiDomain),
		prefix: String(runtimeConfig.public?.apiPrefix),
		port: Number(runtimeConfig.public?.apiPort),
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
			articles: {
				path: 'article',
				allowOnlyWithAuth: [HttpMethod.POST, HttpMethod.PUT, HttpMethod.DELETE, HttpMethod.PATCH],
			},
		},
	}))

	return {
		services,
	}
})
