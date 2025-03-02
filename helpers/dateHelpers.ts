export const monthsLong = [
	'января',
	'февраля',
	'марта',
	'апреля',
	'мая',
	'июня',
	'июля',
	'августа',
	'сентября',
	'октября',
	'ноября',
	'декабря',
]

export function getDateFromUnix(unix: number) {
	return new Date(unix * 1000)
}

export function detDateArticle(unix: number) {
	const date = getDateFromUnix(unix)

	return `${date.getDate()} ${monthsLong[date.getMonth()]} ${date.getFullYear()}`
}
