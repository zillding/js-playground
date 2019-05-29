/**
state object:
{
  editorVimModeEnabled: boolean,
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

const app = combineReducers({
  editorVimModeEnabled
});

export default app;
