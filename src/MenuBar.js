import React from 'react';
import { connect } from 'react-redux';
import find from 'lodash/find';

import { toggleLibraryList, toggleEditorVimMode } from './actions';

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
      <label style={{ cursor: 'pointer' }}>
        <input
          type="checkbox"
          style={{ cursor: 'pointer' }}
          checked={editorVimModeEnabled}
          onChange={onToggleVimMode}
        />
        {editorVimModeEnabled ? 'Vim On' : 'Vim Off'}
      </label>
      {libraries.length > 0 && (
        <div style={{ marginLeft: 'auto' }}>
          {find(libraries, { status: 'loading' }) ? (
            <i className="fa fa-spinner fa-pulse" />
          ) : (
            <i className="fa fa-check" />
          )}
          <button style={{ marginLeft: 5 }} onClick={onToggleLibraryList}>
            {libraryListIsOpen ? 'Hide Libraries' : 'Show Libraries'}
          </button>
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
