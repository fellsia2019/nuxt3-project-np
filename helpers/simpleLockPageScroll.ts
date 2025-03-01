export default function (state: boolean) {
  const delta = window.innerWidth - document.documentElement.clientWidth
  const method = state ? 'add' : 'remove'

  document.body.classList[method]('scrollbar-is-locked')
  document.body.style.paddingRight = state ? `${delta}px` : ''
  document.documentElement.style.setProperty('--scroll-bar-width', `${delta}px`)
}
