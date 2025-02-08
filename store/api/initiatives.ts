import { defineStore } from 'pinia';

import type { IInitiative } from '~/types/api/initiatives';
import type { TPaginationResponse, IPaginationApi } from '~/types/api/common';

import { useLoadingStore } from '~/store/common/loading'
import { HttpMethod } from '~/types/ApiService';

interface IInitiativesApiState {
  initiatives: Array<IInitiative>;
  initiative: null | IInitiative;
  pagination: IPaginationApi;
}

const LOADING_SLUG = 'initiative-store'

export const useInitiativesStore = defineStore('initiatives', {
  state: (): IInitiativesApiState => ({
    initiatives: [],
    initiative: null,
    pagination: {
      count: 0,
      next: null,
      previous: null,
      limit: 0,
      offset: 0,
      total_pages: Number.POSITIVE_INFINITY,
      current_page: 0
    },
  }),

  getters: {
    NEXT_PAGE_NUMBER: (state) => state.pagination.current_page + 1,

    HAS_NEXT_PAGE: (state) => state.pagination.total_pages > state.pagination.current_page,

    IS_LOADING: () => {
      const loadingStore = useLoadingStore()

      return loadingStore.loadingList.find(item => item === LOADING_SLUG)
    }
  },

  actions: {
    SET_LOADING(isLoading: boolean) {
      const loadingStore = useLoadingStore()

      loadingStore.SET_LOADING(isLoading, LOADING_SLUG)
    },

    async LOAD_INITIATIVES(withReplace: boolean = true, page: number = 1) {

      try {
        if (this.IS_LOADING) {
          return
        }

        this.SET_LOADING(true)

        const pageNumber = Math.min(page, this.pagination.total_pages)

        const response: TPaginationResponse<Array<IInitiative>> | null = await useCustomFetch('initiatives', {
          query: { page: pageNumber },
        })

        if (!response) return

        this.initiatives = withReplace ? response.results : [...this.initiatives, ...response.results]
        this.pagination = response.pagination
      } catch (e) {
        throw new Error(`store:initiatives | LOAD_INITIATIVES - ${e}`)
      } finally {
        this.SET_LOADING(false)
      }
    },

    async LOAD_INITIATIVE(id: string) {
      try {
        if (this.IS_LOADING) {
          return
        }

        this.SET_LOADING(true)

        const response: IInitiative | null = await useCustomFetch(
          'projects',
          {
            method: HttpMethod.GET,
          },
          id
        )

        if (!response) return

        this.initiative = response
      } catch (e) {
        throw new Error(`store:initiatives | LOAD_INITIATIVE - ${e}`)
      } finally {
        this.SET_LOADING(false)
      }
    },
  },
});
