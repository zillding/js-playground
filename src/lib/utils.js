import { getPersist, setPersist } from './persist';

import welcome from './welcome.txt';

export function loadJs(src) {
  return new Promise((resolve, reject) => {
    var s;
    s = document.createElement('script');
    s.src = src;
    s.onload = resolve;
    s.onerror = reject;
    document.head.appendChild(s);
  });
}

const CONTENT_KEY = 'content';
export function persistContent(text) {
  setPersist(CONTENT_KEY, text.trim());
}

export function getPersistContent() {
  const persistContent = getPersist(CONTENT_KEY) || '';
  return `${persistContent.trim() || welcome.trim()}\n`;
}

const VIM_MODE_KEY = 'vim-mode-enabled';
export function setPersistVimMode(mode) {
  setPersist(VIM_MODE_KEY, mode);
}

export function getPersistVimMode() {
  return getPersist(VIM_MODE_KEY) || false;
}
