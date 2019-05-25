import React, { useState } from 'react';
import { connect } from 'react-redux';

import { toggleLibraryList, toggleEditorVimMode, addLibrary } from './actions';

import VimToggle from './VimToggle';
import LibraryLoadingIndicator from './LibraryLoadingIndicator';
import LibraryListPanelToggle from './LibraryListPanelToggle';
import SearchLibraryModal from './SearchLibraryModal';

const Seperator = () => <span style={{ margin: '0 4px' }}>|</span>;

function MenuBar({
  libraryListIsOpen,
  editorVimModeEnabled,
  libraries,
  onToggleLibraryList,
  onToggleVimMode,
  onAddLibrary
}) {
  const [modalIsOpen, setModalIsOpen] = useState(true);

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
      <button onClick={() => setModalIsOpen(true)}>Add Library</button>
      {libraries.length > 0 && (
        <div style={{ marginLeft: 'auto' }}>
          <LibraryLoadingIndicator libraries={libraries} />
          <LibraryListPanelToggle
            libraryListIsOpen={libraryListIsOpen}
            onToggleLibraryList={onToggleLibraryList}
          />
        </div>
      )}

      <SearchLibraryModal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        onAdd={onAddLibrary}
      />
    </div>
  );
}

const mapStateToProps = state => ({
  libraryListIsOpen: state.libraryListIsOpen,
  editorVimModeEnabled: state.editorVimModeEnabled,
  libraries: state.libraries
});

const mapDispatchToProps = dispatch => ({
  onAddLibrary: library => dispatch(addLibrary(library)),
  onToggleLibraryList: () => dispatch(toggleLibraryList()),
  onToggleVimMode: () => dispatch(toggleEditorVimMode())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MenuBar);
