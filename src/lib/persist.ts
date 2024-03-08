import welcome from './welcome.txt';

const PERSIST_KEY_PREFIX = 'js-playground-by-zill';

const storage =
  import.meta.env.DEV ? sessionStorage : localStorage;

function getPersist(key: string) {
  try {
    const item = storage.getItem(`${PERSIST_KEY_PREFIX}-${key}`);
    return JSON.parse(item as string);
  } catch (err) {
    return null;
  }
}

function setPersist(key: string, value: string | boolean) {
  storage.setItem(`${PERSIST_KEY_PREFIX}-${key}`, JSON.stringify(value));
}

const CONTENT_KEY = 'content';
export function persistContent(text: string) {
  setPersist(CONTENT_KEY, text.trim());
}

export function getPersistContent() {
  const persistContent = getPersist(CONTENT_KEY) || '';
  return `${persistContent.trim() || welcome.trim()}\n`;
}

const VIM_MODE_KEY = 'vim-mode-enabled';
export function setPersistVimMode(mode: boolean) {
  setPersist(VIM_MODE_KEY, mode);
}

export function getPersistVimMode() {
  return getPersist(VIM_MODE_KEY) || false;
}
