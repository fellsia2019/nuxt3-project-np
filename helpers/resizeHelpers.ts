export default class {
  prevInnerWidth: number = 0;
  functions: Array<Function> | null = null;

  constructor(functions: Array<Function>) {
    this.functions = functions

    if (!functions?.length) {
      return
    }

    window.addEventListener('resize', this.resizeHandler.bind(this))
  }

  resizeHandler() {
    if (window.innerWidth === this.prevInnerWidth || !this.functions?.length) {
      return
    }

    this.functions.forEach(fn => {
      if (!(fn instanceof Function)) {
        return
      }

      fn()
    })

    this.prevInnerWidth = window.innerWidth
  }
}
