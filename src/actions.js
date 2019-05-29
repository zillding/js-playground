import { setPersistVimMode } from './lib/utils';
import { focusOnEditor } from './Editor';

export function toggleEditorVimMode() {
  focusOnEditor();
  return (dispatch, getState) => {
    const { editorVimModeEnabled } = getState();
    setPersistVimMode(!editorVimModeEnabled);
    dispatch({ type: 'TOGGLE_EDITOR_VIM_MODE' });
  };
}
