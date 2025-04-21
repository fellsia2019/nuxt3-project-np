import { defineStore } from 'pinia'

import type { IInitiative } from '~/types/api/initiatives'
import type { TPaginationResponse, IPaginationApi, IApiViewListParams } from '~/types/api/common'

import { paginationPlaceholder } from '~/placeholders/api/pagination.placeholder'
import { useLoadingStore } from '~/store/common/loading'
import { HttpMethod } from '~/types/ApiService'

interface IInitiativesApiState {
	initiatives: Array<IInitiative>
	initiative: null | IInitiative
	pagination: IPaginationApi
}

const LOADING_SLUG = 'initiative-store'

export const useInitiativesStore = defineStore('initiatives', {
	state: (): IInitiativesApiState => ({
		initiatives: [],
		initiative: null,
		pagination: paginationPlaceholder,
	}),

	getters: {
		NEXT_PAGE_NUMBER: state => state.pagination.current_page + 1,

		HAS_NEXT_PAGE: state => state.pagination.total_pages > state.pagination.current_page,

		IS_LOADING: () => {
			const loadingStore = useLoadingStore()

			return loadingStore.loadingList.find(item => item === LOADING_SLUG)
		},

		PAGINATION: state => state.pagination,
	},

	actions: {
		SET_LOADING(isLoading: boolean) {
			const loadingStore = useLoadingStore()

			loadingStore.SET_LOADING(isLoading, LOADING_SLUG)
		},

		async LOAD_INITIATIVES(data: IApiViewListParams = { withReplace: true }) {
			try {
				if (this.IS_LOADING) {
					return
				}

				this.SET_LOADING(true)

				const pageNumber = Math.min(data.page || 1, this.pagination.total_pages)

				const response = await useCustomFetch<TPaginationResponse<Array<IInitiative>>>('initiatives', {
					query: { page: pageNumber, ...(data.params || {}) },
				})

				if (response?.ok && response?.data) {
					this.initiatives = data.withReplace ? response.data?.results : [...this.initiatives, ...(response.data?.results || [])]
					this.pagination = response.data?.pagination
				}
			}
			catch (e) {
				throw new Error(`store:initiatives | LOAD_INITIATIVES - ${e}`)
			}
			finally {
				this.SET_LOADING(false)
			}
		},

		async LOAD_INITIATIVE(id: string) {
			try {
				if (this.IS_LOADING) {
					return
				}

				this.SET_LOADING(true)

				const response = await useCustomFetch<IInitiative>(
					'initiatives',
					{
						method: HttpMethod.GET,
					},
					id,
				)

				if (response?.ok) {
					this.initiative = response?.data
				}
			}
			catch (e) {
				throw new Error(`store:initiatives | LOAD_INITIATIVE - ${e}`)
			}
			finally {
				this.SET_LOADING(false)
			}
		},

		CLEAR() {
			this.initiatives = []
			this.initiative = null
			this.pagination = paginationPlaceholder
		},
	},
})
