import find from 'lodash/find';
import isString from 'lodash/isString';
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

export function evalText(text) {
  // eval the js code in the global context
  // so can access everything in the developer console
  const result = eval.call(window, text); // eslint-disable-line no-eval

  console.log(
    '%c→',
    'color: darkgrey',
    isString(result) ? JSON.stringify(result) : result
  );
}

export function clearConsole() {
  console.clear && console.clear();
}

function urlIsLoaded(libraries, url) {
  if (find(libraries, { url, status: 'loaded' })) return true;
  return false;
}
