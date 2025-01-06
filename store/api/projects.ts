import { defineStore } from 'pinia';

import type { IProject } from '~/types/api/projects';
import type { TPaginationResponse, IPaginationApi } from '~/types/api/common';

interface IProjectsApiState {
  projects: Array<IProject>;
  pagination: IPaginationApi;
}

export const useProjectsStore = defineStore('projects', {
  state: (): IProjectsApiState => ({
    projects: [],
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
    HAS_NEXT_PAGE: (state) => state.pagination.total_pages > state.pagination.current_page
  },

  actions: {
    async LOAD_PROJECTS(withReplace: boolean = true, page: number = 1) {
      console.log("LOAD_PROJECTS !!!!!!!!!!!!!!!!!!!!!!!!")
      try {
        const url = getRoute('projects')
        const pageNumber = Math.min(page, this.pagination.total_pages)

        const res: TPaginationResponse<Array<IProject>> = await $fetch(url, {
          params: { page: pageNumber },
        })

        if (!res) return
        // TODO: добавить нотифийку

        this.projects = withReplace ? res.results : [...this.projects, ...res.results]
        this.pagination = res.pagination
        return res
      } catch (e) {
        throw new Error(`store:projects | LOAD_PROJECTS - ${e}`)
      } finally {
      }
    },
  },
});
