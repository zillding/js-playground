/**
state object:
{
  editorVimModeEnabled: boolean,
  libraryListIsOpen: boolean,
  libraries: [{
    name: string,
    url: string,
    status: 'loading'|'loaded'|'error'
  }]
}
 */

import { combineReducers } from 'redux';
import { getPersistVimMode } from './lib/utils';

function editorVimModeEnabled(state = getPersistVimMode(), action) {
  switch (action.type) {
    case 'TOGGLE_EDITOR_VIM_MODE':
      return !state;
    default:
      return state;
  }
}

function libraryListIsOpen(state = false, action) {
  switch (action.type) {
    case 'TOGGLE_LIBRARY_LIST':
      return !state;
    default:
      return state;
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
      ];
    case 'FINISH_LOAD_LIBRARY':
      return state.map((library, index) => {
        if (index === action.index) {
          return Object.assign({}, library, {
            status: 'loaded'
          });
        }
        return library;
      });
    case 'ERROR_LOAD_LIBRARY':
      return state.map((library, index) => {
        if (index === action.index) {
          return Object.assign({}, library, {
            status: 'error'
          });
        }
        return library;
      });
    default:
      return state;
  }
}

const app = combineReducers({
  editorVimModeEnabled,
  libraryListIsOpen,
  libraries
});

export default app;
