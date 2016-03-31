/**
state object:
{
  editorContent: string
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

const app = combineReducers({
  editorContent
})

export default app
