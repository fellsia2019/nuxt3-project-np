import { defineStore } from 'pinia'

import type { IArticle } from '~/types/api/articles'
import type { TPaginationResponse, IPaginationApi } from '~/types/api/common'

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
		pagination: {
			count: 0,
			next: null,
			previous: null,
			limit: 0,
			offset: 0,
			total_pages: Number.POSITIVE_INFINITY,
			current_page: 0,
		},
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

		async LOAD_ARTICLES(withReplace: boolean = true, page: number = 1) {
			try {
				if (this.IS_LOADING) {
					return
				}

				this.SET_LOADING(true)

				const pageNumber = Math.min(page, this.pagination.total_pages)

				const response = await useCustomFetch<TPaginationResponse<Array<IArticle>>>('articles', {
					query: { page: pageNumber },
				})

				if (response?.ok && response?.data) {
					this.articles = withReplace ? response.data?.results : [...this.articles, ...(response.data?.results || [])]
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
	},
})
