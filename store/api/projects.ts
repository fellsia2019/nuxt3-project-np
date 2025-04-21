import { defineStore } from 'pinia'

import type { IProject } from '~/types/api/projects'
import type { TPaginationResponse, IPaginationApi, TResponseError, IApiViewListParams } from '~/types/api/common'
import { NotificationStatus } from '~/types/common/Notification'

import { paginationPlaceholder } from '~/placeholders/api/pagination.placeholder'
import { useNotificationStore } from '~/store/common/notification'
import { useLoadingStore } from '~/store/common/loading'
import { HttpMethod } from '~/types/ApiService'

interface IProjectsApiState {
	projects: Array<IProject>
	project: null | IProject
	pagination: IPaginationApi
}

const LOADING_SLUG = 'projects-store'

export const useProjectsStore = defineStore('projects', {
	state: (): IProjectsApiState => ({
		projects: [],
		project: null,
		pagination: paginationPlaceholder,
	}),

	getters: {
		NEXT_PAGE_NUMBER: state => state.pagination.current_page + 1,

		HAS_NEXT_PAGE: state => state.pagination.total_pages > state.pagination.current_page,

		IS_LOADING: () => {
			const loadingStore = useLoadingStore()

			return Boolean(loadingStore.loadingList.find(item => item === LOADING_SLUG))
		},

		PAGINATION: state => state.pagination,
	},

	actions: {
		SET_LOADING(isLoading: boolean) {
			const loadingStore = useLoadingStore()

			loadingStore.SET_LOADING(isLoading, LOADING_SLUG)
		},

		async LOAD_PROJECTS(data: IApiViewListParams = { withReplace: true }) {
			try {
				if (this.IS_LOADING) {
					return
				}

				this.SET_LOADING(true)

				const pageNumber = Math.min(data.page || 1, this.pagination.total_pages)

				const response = await useCustomFetch<TPaginationResponse<Array<IProject>>>('projects', {
					query: { page: pageNumber, ...(data.params || {}) },
				})

				if (response?.ok && response?.data) {
					this.projects = data.withReplace ? response.data?.results : [...this.projects, ...(response.data?.results || [])]
					this.pagination = response.data?.pagination
				}
			}
			catch (e) {
				throw new Error(`store:projects | LOAD_PROJECTS - ${e}`)
			}
			finally {
				this.SET_LOADING(false)
			}
		},

		async LOAD_PROJECT(id: string) {
			try {
				if (this.IS_LOADING) {
					return
				}

				this.SET_LOADING(true)

				const response = await useCustomFetch<IProject>(
					'projects',
					{
						method: HttpMethod.GET,
					},
					id,
				)

				if (response?.ok && response?.data) {
					this.project = response?.data
				}
			}
			catch (e) {
				throw new Error(`store:projects | LOAD_PROJECTS - ${e}`)
			}
			finally {
				this.SET_LOADING(false)
			}
		},

		async CREATE_PROJECT(body: { title: string, content: string }) {
			try {
				if (this.IS_LOADING) {
					return
				}

				this.SET_LOADING(true)

				const response = await useCustomFetch<IProject | TResponseError>(
					'projects',
					{
						method: HttpMethod.POST,
						body: body,
					},
				)

				if (response?.ok && response?.data?.id) {
					const notificationStore = useNotificationStore()
					notificationStore.PUSH_NOTIFICATION({ title: 'Успех!', text: 'Проект успешно создан.', status: NotificationStatus.SUCCESS })

					return true
				}

				if (!response?.ok && response?.data) {
					setNotificationFromResponseError(response?.data)

					return false
				}
			}
			catch (e) {
				throw new Error(`store:projects | CREATE_PROJECT - ${e}`)
			}
			finally {
				this.SET_LOADING(false)
			}
		},

		CLEAR() {
			this.projects = []
			this.project = null
			this.pagination = paginationPlaceholder
		},
	},
})
