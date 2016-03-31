import { loadJs } from './utils'

export function setEditorContent(text) {
  return { type: 'SET_EDITOR_CONTENT', text }
}

export function toggleModal() {
  return  { type: 'TOGGLE_MODAL' }
}

export function addLibrary(url) {
  return (dispatch, getState) => {
    const { libraries } = getState()
    const index = libraries.length

    dispatch({ type: 'ADD_LIBRARY', url })

    loadJs(url)
      .then(e => {
        dispatch(finishLoadLibrary(index))
      })
      .catch(err => {
        dispatch(errorLoadLibrary(index))
      })
  }
}

function finishLoadLibrary(index) {
  return { type: 'FINISH_LOAD_LIBRARY', index }
}

function errorLoadLibrary(index) {
  return { type: 'ERROR_LOAD_LIBRARY', index }
}

export function evalText(text) {
  eval(`(function(){${text}})()`)
}
