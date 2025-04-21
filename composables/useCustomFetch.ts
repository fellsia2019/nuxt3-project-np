import { useConfigApiStore } from '~/store/api/_config'
import { HttpMethod } from '~/types/ApiService'
import { useUserStore } from '~/store/api/user'
import { getUrlWithQuery } from '~/helpers/queryHelpers'
import type { IFetchResponse } from '~/types/api/common'

interface IOptions {
	query?: { [key: string]: string | number }
	method?: HttpMethod
	headers?: { [key: string]: string | number }
	body?: { [key: string]: unknown }
}

export async function useCustomFetch<T>(
	route: string,
	options?: IOptions,
	addionalToUrl?: string,
	noCheckAuth?: boolean,
	noCheckTokenVerify?: boolean,
): Promise<IFetchResponse<T> | null> {
	const store = useConfigApiStore()
	const userStore = useUserStore()
	const currentService = store.services

	if (!currentService.routes[route]?.path)
		throw createError({
			statusCode: 500,
			statusMessage:
        `getRoute: ${route}: no such route in service`,
		})

	const url = `${currentService.domain}/${currentService.routes[route].path}` + (addionalToUrl ? `/${addionalToUrl}/` : '/')
	const method = options?.method || HttpMethod.GET
	const needAuth = currentService.routes[route].allowOnlyWithAuth?.includes(method)

	if (needAuth && !noCheckAuth) {
		if (!userStore.ACCESS_TOKEN || !userStore.REFRESH_TOKEN) {
			if (import.meta.client) {
				const router = useRouter()

				router.push({ name: 'login' })
			}
			return null
		}

		if (userStore.ACCESS_TOKEN) {
			const isVerify = !noCheckTokenVerify ? await userStore.DO_VERIFY_TOKEN(userStore.ACCESS_TOKEN) : true

			if (!isVerify) {
				const refreshIsSuccess = await userStore.DO_REFRESH_TOKEN(userStore.REFRESH_TOKEN)

				if (!refreshIsSuccess) {
					if (import.meta.client) {
						const router = useRouter()

						router.push({ name: 'login' })
					}
					return null
				}
			}
		}
	}

	const fetchOptions: RequestInit = {
		method,
		headers: {
			'Content-Type': 'application/json',
			...(options?.headers || {}),
		},
	}

	if (needAuth) {
		fetchOptions.headers = {
			...fetchOptions.headers,
			Authorization: `Bearer ${userStore.ACCESS_TOKEN}`,
		}
	}

	if (options?.body) {
		fetchOptions.body = JSON.stringify(options.body)
	}

	const fetchUrl = getUrlWithQuery(url, options?.query)

	return fetch(
		fetchUrl,
		fetchOptions,
	)
		.then(async (res) => {
			let data = null

			try {
				data = await res.json()
			}
			catch {
				try {
					data = await res.text()
				}
				catch {
					data = null
				}
			}

			return { ok: res.ok, status: res.status, data: data }
		})
}
