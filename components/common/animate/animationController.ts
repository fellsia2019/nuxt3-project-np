export enum ANIMATIONS {
  FADE_IN_UP = 'FADE_IN_UP',
  FADE_IN_DOWN = 'FADE_IN_DOWN'
}

export const ANIMATE_STYLES: Record<ANIMATIONS, { [key: string]: { [key: string] : string | number }; }> = {
  [ANIMATIONS.FADE_IN_UP]: {
    hide: {
      opacity: 0,
      transform: 'translateY(15%) scale(0.85)'
    },
    show: {
      opacity: 1,
      transform: ''
    }
  },
  [ANIMATIONS.FADE_IN_DOWN]: {
    hide: {
      opacity: 0,
      transform: 'translateY(-15%) scale(1.15)'
    },
    show: {
      opacity: 1,
      transform: ''
    }
  }
}

interface IAnimationInitArgs {
  target: HTMLElement;
  animationName: ANIMATIONS;
  observerOptions: IntersectionObserverInit;
  intersectingHandler: () => void;
  paralaxOptions: {
    deltaPercent: number;
  }
}

export class Animation {
  isIntersecting = false
  startWindowScrollY = 0
  target: HTMLElement;
  animationName: ANIMATIONS;
  observerOptions: IntersectionObserverInit;
  intersectingHandler: () => void;
  paralaxOptions: { deltaPercent: number; };
  intersectionObserver: IntersectionObserver | null = null;

  constructor({ target, animationName, observerOptions, intersectingHandler, paralaxOptions }: IAnimationInitArgs) {
    this.target = target
    this.animationName = animationName
    this.observerOptions = observerOptions
    this.intersectingHandler = intersectingHandler
    this.paralaxOptions = paralaxOptions

    this.initEvents()
  }

  initEvents() {
    this.initObserver()

    if (this.paralaxOptions) {
      window.addEventListener('scroll', this.onScrollHandler.bind(this))
    }
  }

  removeEvents() {
    this.destroyObserver()
    window.removeEventListener('scroll', this.onScrollHandler.bind(this))
  }

  initObserver() {
    this.intersectionObserver = new IntersectionObserver(
      this.intersectionObserverHandler.bind(this),
      this.observerOptions
    )

    this.intersectionObserver.observe(this.target)
  }

  destroyObserver() {
    this.intersectionObserver?.unobserve(this.target)
  }

  intersectionObserverHandler(entries: Array<{ isIntersecting: any; }>) {
    this.isIntersecting = entries[0].isIntersecting
    if (entries[0].isIntersecting) {
      this.intersectingHandler()
    }
  }

  onScrollHandler() {
    const targetRect = this.target.getBoundingClientRect()

    if (!targetRect || !this.isIntersecting || !this.paralaxOptions) {
      return
    }

    if (!this.startWindowScrollY) {
      this.startWindowScrollY = window.scrollY
    }

    const delta = window.scrollY - this.startWindowScrollY
    const delta2 = (delta * this.paralaxOptions.deltaPercent) * -1

    if (this.isIntersecting) {
      this.target.style.transform = `translateY(${delta2}px)`
    }
  }
}
