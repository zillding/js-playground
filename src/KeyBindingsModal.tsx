import React from 'react';
import Modal from 'react-modal';

import styles from './KeyBindingsModal.module.css';

const keys = [
  {
    mac: ['cmd', 'enter'],
    pc: ['ctrl', 'enter'],
    text: 'run code',
  },
  {
    mac: ['cmd', 'k'],
    pc: ['ctrl', 'k'],
    text: 'clear console',
  },
  {
    mac: ['cmd', 'f'],
    pc: ['ctrl', 'f'],
    text: 'format code',
  },
  {
    mac: ['cmd', 'o'],
    pc: ['ctrl', 'o'],
    text: 'search library',
  },
];

type KeyProps = {
  key: string;
  children: React.ReactNode;
};

const Key = (props: KeyProps) => <kbd className={styles.key} {...props} />;

type ModalProps = {
  isOpen: boolean;
  onRequestClose: () => void;
};

function KeyBindingsModal({ isOpen, onRequestClose }: ModalProps) {
  return (
    <Modal
      style={{
        overlay: {
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        },
        content: { position: 'static' },
      }}
      isOpen={isOpen}
      onRequestClose={onRequestClose}
    >
      <h4 style={{ marginTop: 0 }}>Key Bindings</h4>
      <table style={{ width: '100%' }}>
        <thead>
          <tr>
            <th>mac</th>
            <th>pc</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {keys.map(({ mac, pc, text }) => (
            <tr key={text}>
              <td className={styles.td}>
                {mac.map((key) => (
                  <Key key={key}>{key}</Key>
                ))}
              </td>
              <td className={styles.td}>
                {pc.map((key) => (
                  <Key key={key}>{key}</Key>
                ))}
              </td>
              <td>{text}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Modal>
  );
}

export default KeyBindingsModal;
