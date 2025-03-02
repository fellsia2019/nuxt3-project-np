export default class {
	prevInnerWidth: number = 0
	functions: Array<() => unknown> | null = null
	withCheckHeight: boolean = false

	constructor(functions: Array<() => unknown>, withCheckHeight: boolean = false) {
		this.functions = functions
		this.withCheckHeight = withCheckHeight

		if (!functions?.length) {
			return
		}

		window.addEventListener('resize', this.resizeHandler.bind(this))
	}

	resizeHandler() {
		if ((!this.withCheckHeight && (window.innerWidth === this.prevInnerWidth)) || !this.functions?.length) {
			return
		}

		this.functions.forEach((fn) => {
			if (!(fn instanceof Function)) {
				return
			}

			fn()
		})

		this.prevInnerWidth = window.innerWidth
	}

	destroy() {
		window.removeEventListener('resize', this.resizeHandler.bind(this))
	}
}
