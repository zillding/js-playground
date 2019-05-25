import React from 'react';
import { connect } from 'react-redux';

import {
  toggleLibraryList,
  toggleAddDefaultLibrary,
  resetDefaultLibraries,
  toggleEditorVimMode,
  addLibrary
} from './actions';

import DefaultLibraries from './DefaultLibraries';
import VimToggle from './VimToggle';
import LibraryLoadingIndicator from './LibraryLoadingIndicator';
import LibraryListPanelToggle from './LibraryListPanelToggle';

const Seperator = () => <span style={{ margin: '0 4px' }}>|</span>;

function MenuBar({
  defaultLibraries,
  libraryListIsOpen,
  editorVimModeEnabled,
  libraries,
  onToggleLibraryList,
  onToggleVimMode,
  onAddLibrary
}) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        overflow: 'auto',
        padding: 4
      }}
    >
      <span>JS Playground</span>
      <Seperator />
      <VimToggle on={editorVimModeEnabled} onToggle={onToggleVimMode} />
      <Seperator />
      <button>Add Library</button>
      <Seperator />
      <DefaultLibraries data={defaultLibraries} onSelect={onAddLibrary} />
      {libraries.length > 0 && (
        <div style={{ marginLeft: 'auto' }}>
          <LibraryLoadingIndicator libraries={libraries} />
          <LibraryListPanelToggle
            libraryListIsOpen={libraryListIsOpen}
            onToggleLibraryList={onToggleLibraryList}
          />
        </div>
      )}
    </div>
  );
}

const mapStateToProps = state => ({
  defaultLibraries: state.defaultLibraries,
  libraryListIsOpen: state.libraryListIsOpen,
  editorVimModeEnabled: state.editorVimModeEnabled,
  libraries: state.libraries
});

const mapDispatchToProps = dispatch => ({
  onAddLibrary: library => dispatch(addLibrary(library)),
  onToggleLibraryList: () => dispatch(toggleLibraryList()),
  onAddDefaultLibraryRequest: () => dispatch(toggleAddDefaultLibrary(true)),
  onResetDefaultLibrariesRequest: () => dispatch(resetDefaultLibraries()),
  onToggleVimMode: () => dispatch(toggleEditorVimMode())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MenuBar);
