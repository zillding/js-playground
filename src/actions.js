import find from 'lodash/find';
import { toast } from 'react-toastify';

import { loadJs, setPersistVimMode } from './lib/utils';
import { focusOnEditor } from './Editor';

export function toggleEditorVimMode() {
  focusOnEditor();
  return (dispatch, getState) => {
    const { editorVimModeEnabled } = getState();
    setPersistVimMode(!editorVimModeEnabled);
    dispatch({ type: 'TOGGLE_EDITOR_VIM_MODE' });
  };
}

export function toggleLibraryList() {
  focusOnEditor();
  return { type: 'TOGGLE_LIBRARY_LIST' };
}

export function addLibrary(library) {
  focusOnEditor();
  return (dispatch, getState) => {
    const { libraries } = getState();
    const index = libraries.length;
    const { url, name } = library;

    if (urlIsLoaded(libraries, url)) {
      toast.warn(`The library is already loaded: ${name || url}`);
      return;
    }

    dispatch({ type: 'ADD_LIBRARY', library });

    loadJs(url)
      .then(e => {
        dispatch(finishLoadLibrary(index));
        toast.success(`JS loaded: ${name || url}`);
      })
      .catch(err => {
        dispatch(errorLoadLibrary(index));
        toast.error(`JS load failed: ${name || url}`);
      });
  };
}

function finishLoadLibrary(index) {
  return { type: 'FINISH_LOAD_LIBRARY', index };
}

function errorLoadLibrary(index) {
  return { type: 'ERROR_LOAD_LIBRARY', index };
}

function urlIsLoaded(libraries, url) {
  if (find(libraries, { url, status: 'loaded' })) return true;
  return false;
}
