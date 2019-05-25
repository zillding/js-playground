import React from 'react';
import { connect } from 'react-redux';

import { toggleLibraryList, toggleEditorVimMode } from './actions';

import VimToggle from './VimToggle';
import LibraryLoadingIndicator from './LibraryLoadingIndicator';
import LibraryListPanelToggle from './LibraryListPanelToggle';

const Seperator = () => <span style={{ margin: '0 4px' }}>|</span>;

function MenuBar({
  libraryListIsOpen,
  editorVimModeEnabled,
  libraries,
  onToggleLibraryList,
  onToggleVimMode
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
  libraryListIsOpen: state.libraryListIsOpen,
  editorVimModeEnabled: state.editorVimModeEnabled,
  libraries: state.libraries
});

const mapDispatchToProps = dispatch => ({
  onToggleLibraryList: () => dispatch(toggleLibraryList()),
  onToggleVimMode: () => dispatch(toggleEditorVimMode())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MenuBar);
