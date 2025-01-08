import { defineStore } from 'pinia';
import { HttpMethod } from '~/types/ApiService';

import { useLoadingStore } from '~/store/common/loading'

const LS_TOKEN_ACCESS_NAME = '_token_access_'
const LS_TOKEN_REFRESH_NAME = '_token_refresh_'

const LOADING_SLUG = 'user-store'

interface IUserApiState {
  user: any;
  tokens: {
    access: null | string;
    refresh: null | string;
  },
}

export const useUserStore = defineStore('user', {
  state: (): IUserApiState => ({
    user: null,
    tokens: {
      access: null,
      refresh: null
    },
  }),

  getters: {
    ACCESS_TOKEN: (state) => state.tokens.access || (import.meta.client ? window.localStorage.getItem(LS_TOKEN_ACCESS_NAME) : null),

    REFRESH_TOKEN: (state) => state.tokens.refresh || (import.meta.client ? window.localStorage.getItem(LS_TOKEN_REFRESH_NAME) : null),

    IS_AUTH: (state) => Boolean(state.user?.id),

    IS_LOADING: () => {
      const loadingStore = useLoadingStore()

      return Boolean(loadingStore.loadingList.find(item => item === LOADING_SLUG))
    }
  },

  actions: {
    SAVE_ACCESS_TOKEN(token :string) {
      this.tokens.access = token
      window.localStorage.setItem(LS_TOKEN_ACCESS_NAME, token)
    },

    SAVE_REFRESH_TOKEN(token :string) {
      this.tokens.refresh = token
      window.localStorage.setItem(LS_TOKEN_REFRESH_NAME, token)
    },

    SET_LOADING(isLoading: boolean) {
      const loadingStore = useLoadingStore()

      loadingStore.SET_LOADING(isLoading, LOADING_SLUG)
    },

    async AUTH(body: { username: string; password: string }) {
      try {
        if (this.IS_LOADING) {
          return
        }

        this.SET_LOADING(true)

        const response = await getFetch(
          'auth',
          {
            method: HttpMethod.POST,
            body: body,
          },
        )

        const successResponse = response?.data?.value

        if (successResponse?.refresh && successResponse?.access) {
          this.SAVE_ACCESS_TOKEN(successResponse?.access)
          this.SAVE_REFRESH_TOKEN(successResponse?.refresh)

          useRouter().push({ name: 'lk' })
          this.GET_USER()

          return true
        }

        const errorResponse = response?.error?.value?.data
        if (errorResponse) {

          if (typeof errorResponse === 'object') {
            if (Array.isArray(errorResponse)) {
              errorResponse.forEach(error => {
                console.log('ERROR', error)
              })
            } else {
              for (let key in errorResponse) {
                const value = errorResponse[key]

                console.log('ERROR', key, value)
              }
            }
          }

          return false
        }
      } catch (e) {
        throw new Error(`store:user | AUTH - ${e}`)
      } finally {
        this.SET_LOADING(false)
      }
    },

    async GET_USER_DATA() {
      console.log('GET_USER_DATA')
      try {
        if (!this.ACCESS_TOKEN || !this.REFRESH_TOKEN) {
          return
        }

        const isVerify = await this.DO_VERIFY_TOKEN(this.ACCESS_TOKEN)
        console.log('GET_USER_DATA isVerify', isVerify)

        if (isVerify) {
          await this.GET_USER()
        } else {
          const refreshIsSuccess = await this.DO_REFRESH_TOKEN(this.REFRESH_TOKEN)
          console.log('GET_USER_DATA refreshIsSuccess', refreshIsSuccess)

          if (refreshIsSuccess) {
            await this.GET_USER()
          }
        }
      } catch (e) {
        throw new Error(`store:user | GET_USER_DATA - ${e}`)
      }
    },

    async GET_USER() {
      try {
        const response = await getFetch(
          'user',
        )

        const successResponse = response?.data?.value

        if (successResponse) {
          this.user = successResponse

          console.log('success', this.user)
          return true
        }

        const errorResponse = response?.error?.value?.data
        if (errorResponse) {
          if (typeof errorResponse === 'object') {
            if (Array.isArray(errorResponse)) {
              errorResponse.forEach(error => {
                console.log('ERROR', error)
              })
            } else {
              for (let key in errorResponse) {
                const value = errorResponse[key]
                console.log('ERROR', key, value)
              }
            }
          }
          return false
        }

      } catch (e) {
        throw new Error(`store:user | GET_USER - ${e}`)
      }
    },

    async DO_VERIFY_TOKEN(token: string) {
      try {
        const { data, error } = await getFetch(
          'tokenVerify',
          {
            method: HttpMethod.POST,
            body: { token }
          }
        )

        const successResponse = data?.value

        if (successResponse) {
          return true
        }

        const errorResponse = error?.value?.data
        if (errorResponse) {

          if (typeof errorResponse === 'object') {
            if (Array.isArray(errorResponse)) {
              errorResponse.forEach(error => {
                console.log('ERROR', error)
              })
            } else {
              for (let key in errorResponse) {
                const value = errorResponse[key]

                console.log('ERROR', key, value)
              }
            }
          }
          return false
        }

      } catch(e) {
        throw new Error(`store:user | DO_VERIFY_TOKEN - ${e}`)
      }
    },

    async DO_REFRESH_TOKEN(token: string) {
      try {
        const { data, error } = await getFetch(
          'tokenRefresh',
          {
            method: HttpMethod.POST,
            body: { refresh: token }
          }
        )

        const successResponse = data?.value

        if (successResponse?.access) {
          this.SAVE_ACCESS_TOKEN(successResponse?.access)
          return true
        }

        const errorResponse = error?.value?.data
        if (errorResponse) {

          if (typeof errorResponse === 'object') {
            if (Array.isArray(errorResponse)) {
              errorResponse.forEach(error => {
                console.log('ERROR', error)
              })
            } else {
              for (let key in errorResponse) {
                const value = errorResponse[key]

                console.log('ERROR', key, value)
              }
            }
          }
          return false
        }

      } catch(e) {
        throw new Error(`store:user | DO_REFRESH_TOKEN - ${e}`)
      }
    }
  },
});
