/**
state object:
{
  defaultLibraries: [{
    name: string,
    url: string
  }],
  editorContent: string,
  editorVimModeEnabled: boolean,
  addDefaultLibraryIsOpen: boolean,
  libraryListIsOpen: boolean,
  libraries: [{
    name: string,
    url: string,
    status: 'loading'|'loaded'|'error'
  }]
}
 */

import { combineReducers } from 'redux'
import { getPersistDefaultLibraries, setPersistDefaultLibraries } from './lib/utils'

function defaultLibraries(state = getPersistDefaultLibraries(), action) {
  switch (action.type) {
    case 'ADD_DEFAULT_LIBRARY':
      const result = [
        ...state,
        action.library
      ]
      setPersistDefaultLibraries(result)
      return result
    case 'RESET_DEFAULT_LIBRARIES':
      setPersistDefaultLibraries([])
      return getPersistDefaultLibraries()
    default:
      return state
  }
}

function editorContent(state = '', action) {
  switch (action.type) {
    case 'SET_EDITOR_CONTENT':
      return action.text
    default:
      return state
  }
}

function editorVimModeEnabled(state = false, action) {
  switch (action.type) {
    case 'TOGGLE_EDITOR_VIM_MODE':
      return !state
    default:
      return state
  }
}

function addDefaultLibraryIsOpen(state = true, action) {
  switch (action.type) {
    case 'TOGGLE_ADD_DEFAULT_LIBRARY':
      if (typeof action.mode === 'undefined') return !state
      if (action.mode) return true
      return false
    default:
      return state
  }
}

function libraryListIsOpen(state = false, action) {
  switch (action.type) {
    case 'TOGGLE_LIBRARY_LIST':
      return !state
    default:
      return state
  }
}

function libraries(state = [], action) {
  switch (action.type) {
    case 'ADD_LIBRARY':
      return [
        ...state,
        Object.assign({}, action.library, {
          status: 'loading'
        })
      ]
    case 'FINISH_LOAD_LIBRARY':
      return state.map((library, index) => {
        if (index === action.index) {
          return Object.assign({}, library, {
            status: 'loaded'
          })
        }
        return library
      })
    case 'ERROR_LOAD_LIBRARY':
      return state.map((library, index) => {
        if (index === action.index) {
          return Object.assign({}, library, {
            status: 'error'
          })
        }
        return library
      })
    default:
      return state
  }
}

const app = combineReducers({
  defaultLibraries,
  editorContent,
  editorVimModeEnabled,
  addDefaultLibraryIsOpen,
  libraryListIsOpen,
  libraries
})

export default app
