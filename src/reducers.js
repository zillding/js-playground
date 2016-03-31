/**
state object:
{
  editorContent: string,
  libraryListIsOpen: boolean,
  libraries: [{
    url: string,
    status: 'loading'|'loaded'|'error'
  }]
}
 */

import { combineReducers } from 'redux'

function editorContent(state = '', action) {
  switch (action.type) {
    case 'SET_EDITOR_CONTENT':
      return action.text
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
        {
          url: action.url,
          status: 'loading'
        }
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
  editorContent,
  libraryListIsOpen,
  libraries
})

export default app
