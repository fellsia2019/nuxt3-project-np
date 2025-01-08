import { defineStore } from 'pinia';

import type { IProject } from '~/types/api/projects';
import type { TPaginationResponse, IPaginationApi } from '~/types/api/common';

import { useLoadingStore } from '~/store/common/loading'
import { HttpMethod } from '~/types/ApiService';

interface IProjectsApiState {
  projects: Array<IProject>;
  project: null | IProject;
  pagination: IPaginationApi;
}

const LOADING_SLUG = 'projects-store'

export const useProjectsStore = defineStore('projects', {
  state: (): IProjectsApiState => ({
    projects: [],
    project: null,
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

      return Boolean(loadingStore.loadingList.find(item => item === LOADING_SLUG))
    }
  },

  actions: {
    SET_LOADING(isLoading: boolean) {
      const loadingStore = useLoadingStore()

      loadingStore.SET_LOADING(isLoading, LOADING_SLUG)
    },

    async LOAD_PROJECTS(withReplace: boolean = true, page: number = 1) {
      console.log('LOAD_PROJECTS', this.IS_LOADING)
      try {
        if (this.IS_LOADING) {
          return
        }

        this.SET_LOADING(true)

        const pageNumber = Math.min(page, this.pagination.total_pages)

        const response = await getFetch('projects', {
          query: { page: pageNumber },
        })

        const result: TPaginationResponse<Array<IProject>> | null = response?.data?.value

        if (!result) return
        // TODO: minor - добавить нотифийку

        this.projects = withReplace ? result.results : [...this.projects, ...result.results]
        this.pagination = result.pagination
      } catch (e) {
        throw new Error(`store:projects | LOAD_PROJECTS - ${e}`)
      } finally {
        this.SET_LOADING(false)
      }
    },

    async LOAD_PROJECT(id: string) {
      try {
        if (this.IS_LOADING) {
          return
        }

        this.SET_LOADING(true)

        const response = await getFetch(
          'projects',
          {
            method: HttpMethod.GET,
          },
          id
        )

        const result: IProject | null = response?.data?.value

        if (!result) return
        // TODO: minor - добавить нотифийку

        this.project = result
      } catch (e) {
        throw new Error(`store:projects | LOAD_PROJECTS - ${e}`)
      } finally {
        this.SET_LOADING(false)
      }
    },

    async CREATE_PROJECT(body: { title: string; content: string }) {
      try {
        if (this.IS_LOADING) {
          return
        }

        this.SET_LOADING(true)

        const response = await getFetch(
          'projects',
          {
            method: HttpMethod.POST,
            body: body,
            // onResponseError({ response }) {
            //   // console.log('onResponseError', response?._data)
            // },
            // onResponse({ response }) {
            //   console.log('onResponse', response?._data)
            // }
          },
        )

        // console.log('data', response?.data)
        // console.log('error', response?.error)


      } catch (e) {
        throw new Error(`store:projects | LOAD_PROJECTS - ${e}`)
      } finally {
        this.SET_LOADING(false)
      }
    }
  },
});
