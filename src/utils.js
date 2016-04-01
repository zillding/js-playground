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

const PERSIST_CONTENT_KEY = 'js-playground-persist-content'

export function persistContent(text) {
  localStorage.setItem(PERSIST_CONTENT_KEY, text)
}

export function getPersistContent() {
  return localStorage.getItem(PERSIST_CONTENT_KEY)
}
