import React, { useState } from 'react';

import { IEditor } from './Editor';
import KeyBindingsModal from './KeyBindingsModal';

const Seperator = () => <span style={{ margin: '0 4px' }}>|</span>;

type Props = {
  editor?: IEditor;
  editorVimModeEnabled: boolean;
  onToggleVimMode: React.FormEventHandler;
};

function MenuBar({ editor, editorVimModeEnabled, onToggleVimMode }: Props) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        overflow: 'auto',
        padding: 4,
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
          editor?.focus();
        }}
      />
    </div>
  );
}

export default MenuBar;
