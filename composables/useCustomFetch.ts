import { useConfigApiStore } from '~/store/api/_config';
import { HttpMethod } from '~/types/ApiService'
import { useUserStore } from '~/store/api/user'

export async function useCustomFetch (
  route: string,
  options?: any,
  addionalToUrl?: string,
  noCheckAuth?: boolean,
  noCheckTokenVerify?: boolean,
): Promise<any> {
  const store = useConfigApiStore()
  const userStore = useUserStore()
  const currentService = store.services;

  if (!currentService.routes[route]?.path)
    throw createError({
      statusCode: 500,
      statusMessage:
        `getRoute: ${route}: no such route in service`,
    });

  const url = `${currentService.domain}/${currentService.routes[route].path}` + (addionalToUrl ? `/${addionalToUrl}/` : '/')
  const method = options?.method || HttpMethod.GET
  const needAuth = currentService.routes[route].allowOnlyWithAuth?.includes(method)

  if (needAuth && !noCheckAuth) {

    if (!userStore.ACCESS_TOKEN || !userStore.REFRESH_TOKEN) {
      if (import.meta.client) {
        const router = useRouter()

        router.push({ name: 'login' })
      }
      return
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
          return
        }
      }
    }
  }

  const requestOptions = {
    ...(options || {}),
    method,
    headers: {
      ...(options?.headers || {}),
      'Content-Type': 'application/json'
    }
  }

  if (needAuth) {
    requestOptions.headers = {
      ...requestOptions.headers,
      Authorization: `Bearer ${userStore.ACCESS_TOKEN}`
    }
  }

  const fetchOptions = {}

  if (requestOptions.headers) {
    fetchOptions.headers = { ...(requestOptions.headers || {}) }
  }
  if (requestOptions.body) {
    fetchOptions.body = JSON.stringify(requestOptions.body)
    fetchOptions.method = 'POST'
  }

  let fetchUrl = url
  if (requestOptions.query) {
    const startSymbol = (new URL(url))?.search ? '&' : '?'

    const queryList = []

    for (let key in requestOptions.query) {
      const v = requestOptions.query[key]

      queryList.push(`${key}=${v}`)
    }

    if (queryList?.length) {
      fetchUrl += `${startSymbol}${queryList.join('&')}`
    }
  }

  return fetch(
    fetchUrl,
    fetchOptions
  )
  .then(res => res.json())
}
