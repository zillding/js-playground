import React, { useState } from 'react';

import KeyBindingsModal from './KeyBindingsModal';

const Seperator = () => <span style={{ margin: '0 4px' }}>|</span>;

function MenuBar({ editorVimModeEnabled, onToggleVimMode }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

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
      <label style={{ display: 'flex', cursor: 'pointer' }}>
        <input
          type="checkbox"
          style={{ cursor: 'pointer' }}
          checked={editorVimModeEnabled}
          onChange={onToggleVimMode}
        />
        {editorVimModeEnabled ? 'Vim On' : 'Vim Off'}
      </label>

      <button
        style={{ marginLeft: 'auto' }}
        onClick={() => {
          setIsModalOpen(true);
        }}
      >
        ?
      </button>
      <KeyBindingsModal
        isOpen={isModalOpen}
        onRequestClose={() => {
          setIsModalOpen(false);
        }}
      />
    </div>
  );
}

export default MenuBar;
