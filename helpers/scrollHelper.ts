export function scrollToBlock(block: HTMLElement, withHeaderHeight = true, offset = 0) {
	if (!block || !(block instanceof HTMLElement)) {
		return
	}

	const headerHeight: number = withHeaderHeight
		? Number.parseInt(
				document.documentElement.style.getPropertyValue('--header-height'),
				10,
			)
		: 0

	const { top } = block.getBoundingClientRect()

	const resultTop = top - (headerHeight || 0) + window.scrollY - offset

	window.scrollTo({
		top: resultTop,
		behavior: 'smooth',
	})
}
