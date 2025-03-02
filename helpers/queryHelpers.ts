export function getUrlWithQuery(url: string, query: { [key: string]: string | number } | null = null) {
	let fetchUrl = url

	if (query) {
		const startSymbol = (new URL(url))?.search ? '&' : '?'

		const queryList = []

		for (const key in query) {
			const v = query[key]

			queryList.push(`${key}=${v}`)
		}

		if (queryList?.length) {
			fetchUrl += `${startSymbol}${queryList.join('&')}`
		}
	}

	return fetchUrl
}
