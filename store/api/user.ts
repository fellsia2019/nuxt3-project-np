import { defineStore } from 'pinia';
import { HttpMethod } from '~/types/ApiService';

const LS_TOKEN_ACCESS_NAME = '_token_access_'
const LS_TOKEN_REFRESH_NAME = '_token_refresh_'

interface IUserApiState {
  user: any;
  tokens: {
    access: null | string;
    refresh: null | string;
  }
}

export const useUserStore = defineStore('user', {
  state: (): IUserApiState => ({
    user: null,
    tokens: {
      access: null,
      refresh: null
    }
  }),

  getters: {
    ACCESS_TOKEN: (state) => state.tokens.access || (import.meta.client ? window.localStorage.getItem(LS_TOKEN_ACCESS_NAME) : null),
    REFRESH_TOKEN: (state) => state.tokens.refresh || (import.meta.client ? window.localStorage.getItem(LS_TOKEN_REFRESH_NAME) : null),
  },

  actions: {
    async AUTH(body: { username: string; password: string }) {
      try {
        const response = await getFetch(
          'auth',
          {
            method: HttpMethod.POST,
            body: body,
          },
        )

        const successResponse = response?.data?.value

        if (successResponse?.refresh && successResponse?.access) {
          this.tokens = {
            access: successResponse?.access,
            refresh: successResponse.refresh
          }

          window.localStorage.setItem(LS_TOKEN_ACCESS_NAME, successResponse?.access)
          window.localStorage.setItem(LS_TOKEN_REFRESH_NAME, successResponse?.refresh)

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
      }
    },

    async GET_USER_DATA() {
      try {
        const isVerify = this.ACCESS_TOKEN ? await this.DO_VERIFY_TOKEN(this.ACCESS_TOKEN) : false

        if (isVerify) {
          this.GET_USER()
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
          console.log('success', successResponse)
          this.tokens.access = successResponse?.access
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
