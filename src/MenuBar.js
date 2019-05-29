import React from 'react';
import { connect } from 'react-redux';

import { toggleEditorVimMode } from './actions';

const Seperator = () => <span style={{ margin: '0 4px' }}>|</span>;

function MenuBar({ editorVimModeEnabled, onToggleVimMode }) {
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
    </div>
  );
}

const mapStateToProps = state => ({
  editorVimModeEnabled: state.editorVimModeEnabled
});

const mapDispatchToProps = dispatch => ({
  onToggleVimMode: () => dispatch(toggleEditorVimMode())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MenuBar);
