import { defineStore } from 'pinia';


interface ILoadingState {
  isLoading: boolean;
  loadingList: Array<string>
}

export const useLoadingStore = defineStore('loading', {
  state: (): ILoadingState => ({
    isLoading: false,
    loadingList: []
  }),

  getters: {
    IS_LOADING: (state) => state.loadingList?.length > 0
  },

  actions: {
    SET_LOADING(isLoading: boolean, slug: string) {
      if (isLoading) {
        this.loadingList.push(slug)
      } else {
        this.loadingList = this.loadingList.filter(item => item !== slug)
      }
    }
  },
});
