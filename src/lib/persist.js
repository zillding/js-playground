const PERSIST_KEY_PREFIX = 'js-playground-by-zill'

const { NODE_ENV } = process.env
const storage = NODE_ENV === 'production' ? localStorage : sessionStorage

export function getPersist(key) {
  try {
    const item = storage.getItem(`${PERSIST_KEY_PREFIX}-${key}`)
    return JSON.parse(item)
  } catch(err) {
    return null
  }
}

export function setPersist(key, value) {
  storage.setItem(`${PERSIST_KEY_PREFIX}-${key}`, JSON.stringify(value))
}
