export function setEditorContent(text) {
  return { type: 'SET_EDITOR_CONTENT', text }
}

export function toggleModal() {
  return  { type: 'TOGGLE_MODAL' }
}

export function addLibrary(url) {
  // TODO: load script
  return { type: 'ADD_LIBRARY', url }
}

export function evalText(text) {
  eval(`(function(){${text}})()`)
}
