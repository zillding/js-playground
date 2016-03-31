export function setEditorContent(text) {
  return { type: 'SET_EDITOR_CONTENT', text }
}

export function evalText(text) {
  eval(`(function(){${text}})()`)
}
