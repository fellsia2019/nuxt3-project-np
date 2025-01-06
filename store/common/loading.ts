import { defineStore } from 'pinia';


interface ILoadingState {
  isLoading: boolean;
}

export const useLoadingStore = defineStore('loading', {
  state: (): ILoadingState => ({
    isLoading: false
  }),

  getters: {
    IS_LOADING: (state) => state.isLoading
  },

  actions: {
    SET_LOADING(isLoading: boolean) {
      console.log('SET_LOADING', isLoading)
      this.isLoading = isLoading
    }
  },
});
