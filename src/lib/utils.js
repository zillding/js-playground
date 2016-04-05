import isNull from 'lodash/isNull'
import random from 'lodash/random'

import { getPersist, setPersist } from './persist'

import defaultLibraries from './libraries.config'
import welcome from 'raw!./welcome.config.txt'

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

let previousNum = null
export function generateNonDupInt(low, high) {
  const result = random(low, high)

  // first time generate
  if (isNull(previousNum)) return result

  if (result !== previousNum) {
    previousNum = result
    return result
  }

  return generateNonDupInt(low, high)
}

const CONTENT_KEY = 'content'
export function persistContent(text) {
  setPersist(CONTENT_KEY, text)
}

export function getPersistContent() {
  const persistContent = getPersist(CONTENT_KEY) || ''
  return persistContent.trim() || welcome.trim()
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

const VIM_MODE_KEY = 'vim-mode-enabled'
export function setPersistVimMode(mode) {
  setPersist(VIM_MODE_KEY, mode)
}

export function getPersistVimMode() {
  return getPersist(VIM_MODE_KEY) || false
}
