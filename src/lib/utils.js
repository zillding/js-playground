import { getPersist, setPersist } from './persist'

export function loadJs(src) {
  return new Promise((resolve, reject) => {
    var s
    s = document.createElement('script')
    s.src = src
    s.onload = resolve
    s.onerror = reject
    document.head.appendChild(s)
  })
}

const CONTENT_KEY = 'content'

export function persistContent(text) {
  setPersist(CONTENT_KEY, text)
}

export function getPersistContent() {
  return getPersist(CONTENT_KEY) || ''
}
