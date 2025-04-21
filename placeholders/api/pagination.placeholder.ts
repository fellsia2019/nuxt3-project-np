import type { IPaginationApi } from '~/types/api/common'

export const paginationPlaceholder: Readonly<IPaginationApi> = {
	count: 0,
	next: null,
	previous: null,
	limit: 0,
	offset: 0,
	total_pages: Number.POSITIVE_INFINITY,
	current_page: 0,
}
