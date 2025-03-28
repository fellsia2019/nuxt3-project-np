import { defineStore } from 'pinia'

import type { IProject } from '~/types/api/projects'
import type { TPaginationResponse, IPaginationApi, IFetchResponse } from '~/types/api/common'
import { NotificationStatus } from '~/types/common/Notification'

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

			return Boolean(loadingStore.loadingList.find(item => item === LOADING_SLUG))
		},

		PAGINATION: state => state.pagination,
	},

	actions: {
		SET_LOADING(isLoading: boolean) {
			const loadingStore = useLoadingStore()

			loadingStore.SET_LOADING(isLoading, LOADING_SLUG)
		},

		async LOAD_PROJECTS(withReplace: boolean = true, page: number = 1) {
			try {
				if (this.IS_LOADING) {
					return
				}

				this.SET_LOADING(true)

				const pageNumber = Math.min(page, this.pagination.total_pages)

				const response: IFetchResponse<TPaginationResponse<Array<IProject>>> | null = await useCustomFetch('projects', {
					query: { page: pageNumber },
				})

				if (response?.ok && response?.data) {
					this.projects = withReplace ? response.data?.results : [...this.projects, ...(response.data?.results || [])]
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

				const response: IFetchResponse<IProject> = await useCustomFetch(
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

				const response = await useCustomFetch(
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
	},
})
