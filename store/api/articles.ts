import { defineStore } from 'pinia'

import type { IArticle } from '~/types/api/articles'
import type { TPaginationResponse, IPaginationApi, IApiViewListParams } from '~/types/api/common'

import { paginationPlaceholder } from '~/placeholders/api/pagination.placeholder'
import { useLoadingStore } from '~/store/common/loading'
import { HttpMethod } from '~/types/ApiService'

interface IArticlesApiState {
	articles: Array<IArticle>
	article: null | IArticle
	pagination: IPaginationApi
}

const LOADING_SLUG = 'article-store'

export const useArticlesStore = defineStore('articles', {
	state: (): IArticlesApiState => ({
		articles: [],
		article: null,
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

		async LOAD_ARTICLES(data: IApiViewListParams = { withReplace: true }) {
			try {
				if (this.IS_LOADING) {
					return
				}

				this.SET_LOADING(true)

				const pageNumber = Math.min(data.page || 1, this.pagination.total_pages)

				const response = await useCustomFetch<TPaginationResponse<Array<IArticle>>>('articles', {
					query: { page: pageNumber, ...(data.params || {}) },
				})

				if (response?.ok && response?.data) {
					this.articles = data.withReplace ? response.data?.results : [...this.articles, ...(response.data?.results || [])]
					this.pagination = response.data?.pagination
				}
			}
			catch (e) {
				throw new Error(`store:articles | LOAD_ARTICLES - ${e}`)
			}
			finally {
				this.SET_LOADING(false)
			}
		},

		async LOAD_ARTICLE(id: string) {
			try {
				if (this.IS_LOADING) {
					return
				}

				this.SET_LOADING(true)

				const response = await useCustomFetch<IArticle>(
					'articles',
					{
						method: HttpMethod.GET,
					},
					id,
				)

				if (response?.ok) {
					this.article = response?.data
				}
			}
			catch (e) {
				throw new Error(`store:articles | LOAD_ARTICLE - ${e}`)
			}
			finally {
				this.SET_LOADING(false)
			}
		},

		CLEAR() {
			this.articles = []
			this.article = null
			this.pagination = paginationPlaceholder
		},
	},
})
