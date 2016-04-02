import { getPersist, setPersist } from './persist'

import defaultLibraries from './libraries.config'

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

const DEFAULT_LIBRARIES_KEY = 'default-libraries'
export function setPersistDefaultLibraries(libraries) {
  setPersist(DEFAULT_LIBRARIES_KEY, libraries)
}

export function getPersistDefaultLibraries() {
  const libs = getPersist(DEFAULT_LIBRARIES_KEY)
  if (libs && libs.length > 0) return libs
  return defaultLibraries
}
