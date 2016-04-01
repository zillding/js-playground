import { loadJs } from './utils'
import { addNotification } from './components/NotificationSystem'
import { focusOnEditor } from './components/Editor'

export function setEditorContent(text) {
  return { type: 'SET_EDITOR_CONTENT', text }
}

export function toggleLibraryList() {
  focusOnEditor()
  return { type: 'TOGGLE_LIBRARY_LIST' }
}

export function addLibrary(library) {
  return (dispatch, getState) => {
    const { libraries } = getState()
    const index = libraries.length
    const { url } = library

    dispatch({ type: 'ADD_LIBRARY', library })

    loadJs(url)
      .then(e => {
        dispatch(finishLoadLibrary(index))
        addNotification({
          title: 'Js Loaded!',
          message: url,
          level: 'success'
        })
      })
      .catch(err => {
        dispatch(errorLoadLibrary(index))
        addNotification({
          title: 'Js Load Failed...',
          message: url,
          level: 'error'
        })
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
