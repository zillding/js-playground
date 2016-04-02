/**
state object:
{
  defaultLibraries: [{
    name: string,
    url: string
  }],
  editorContent: string,
  editorVimModeEnabled: boolean,
  libraryListIsOpen: boolean,
  libraries: [{
    name: string,
    url: string,
    status: 'loading'|'loaded'|'error'
  }]
}
 */

import { combineReducers } from 'redux'
import defaultLib from './lib/libraries.config'

function defaultLibraries(state = defaultLib, action) {
  return state
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
  libraryListIsOpen,
  libraries
})

export default app
