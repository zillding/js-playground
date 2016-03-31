/**
state object:
{
  editorContent: string,
  modalIsOpen: boolean,
  libraries: [{
    url: string,
    loading: boolean
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

function modalIsOpen(state = false, action) {
  switch (action.type) {
    case 'TOGGLE_MODAL':
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
          loading: true
        }
      ]
    default:
      return state
  }
}

const app = combineReducers({
  editorContent,
  modalIsOpen,
  libraries
})

export default app
