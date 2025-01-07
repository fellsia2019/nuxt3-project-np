import { useConfigApiStore } from '~/store/api/_config';
import { HttpMethod } from '~/types/ApiService'
import { useUserStore } from '~/store/api/user'

export default async function (
  route: string,
  options?: any,
  addionalToUrl?: string
): Promise<any> {
  const store = useConfigApiStore()
  const userStore = useUserStore()
  const router = useRouter()

  const currentService = store.services;

  if (!currentService.routes[route]?.path)
    throw createError({
      statusCode: 500,
      statusMessage:
        'getRoute: ' + route + ': no such route in service',
    });

  const url = `${currentService.domain}/${currentService.routes[route].path}` + (addionalToUrl ? `/${addionalToUrl}/` : '/')
  const method = options?.method || HttpMethod.GET
  const needAuth = currentService.routes[route].allowOnlyWithAuth?.includes(method)

  if (needAuth) {
    if (!userStore.ACCESS_TOKEN || !userStore.REFRESH_TOKEN) {
      router.push({ name: 'auth' })
      return
    }

    if (userStore.ACCESS_TOKEN) {
      const isVerify = await userStore.DO_VERIFY_TOKEN(userStore.ACCESS_TOKEN)

      if (!isVerify) {
        const refreshIsSuccess = await userStore.DO_REFRESH_TOKEN(userStore.REFRESH_TOKEN)

        if (!refreshIsSuccess) {
          router.push({ name: 'auth' })
          return
        }
      }
    }
  }

  const requestOptions = {
    watch: false,
    ...options,
    method,
  }

  if (needAuth) {
    requestOptions.headers = {
      Authorization: `Bearer ${userStore.ACCESS_TOKEN}`
    }
  }

  return useFetch(url, {
    ...requestOptions
  })
}
