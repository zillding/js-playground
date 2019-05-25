import find from 'lodash/find';
import isString from 'lodash/isString';

import { loadJs, persistContent, setPersistVimMode } from './lib/utils';
import { addNotification } from './components/NotificationSystem';
import { focusOnEditor } from './components/Editor';

export function setEditorContent(text) {
  persistContent(text);
  return { type: 'SET_EDITOR_CONTENT', text };
}

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

    if (urlIsLoaded(libraries, url))
      return addNotification({
        title: 'This library is already loaded.',
        message: name || url,
        level: 'warning'
      });

    dispatch({ type: 'ADD_LIBRARY', library });

    loadJs(url)
      .then(e => {
        dispatch(finishLoadLibrary(index));
        addNotification({
          title: 'Js Loaded!',
          message: name || url,
          level: 'success'
        });
      })
      .catch(err => {
        dispatch(errorLoadLibrary(index));
        addNotification({
          title: 'Js Load Failed...',
          message: name || url,
          level: 'error'
        });
      });
  };
}

export function addDefaultLibrary(library) {
  return (dispatch, getState) => {
    const { defaultLibraries } = getState();
    const { name, url } = library;

    if (urlIsLoaded(defaultLibraries, url))
      return addNotification({
        title: 'This library is already loaded.',
        message: url,
        level: 'warning'
      });

    dispatch({ type: 'ADD_DEFAULT_LIBRARY', library });
    addNotification({
      title: 'Script added to default select!',
      message: name,
      level: 'success'
    });
  };
}

export function resetDefaultLibraries() {
  return { type: 'RESET_DEFAULT_LIBRARIES' };
}

export function toggleAddDefaultLibrary(mode) {
  return { type: 'TOGGLE_ADD_DEFAULT_LIBRARY', mode };
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
