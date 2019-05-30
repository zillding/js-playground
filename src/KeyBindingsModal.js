import React from 'react';
import Modal from 'react-modal';

const keys = [
  {
    mac: ['cmd', 'enter'],
    pc: ['ctrl', 'enter'],
    text: 'run code'
  },
  {
    mac: ['cmd', 'k'],
    pc: ['ctrl', 'k'],
    text: 'clear console'
  },
  {
    mac: ['cmd', 's'],
    pc: ['ctrl', 's'],
    text: 'format code'
  },
  {
    mac: ['cmd', 'o'],
    pc: ['ctrl', 'o'],
    text: 'search library'
  }
];

const Key = ({ style, ...rest }) => (
  <kbd
    style={{
      fontFamily: 'Consolas, "Lucida Console", monospace',
      fontSize: 18,
      display: 'inline-block',
      borderRadius: '3px',
      padding: '0px 4px',
      boxShadow: '1px 1px 1px #777',
      margin: '2px',
      verticalAlign: 'text-bottom',
      background: '#eee',
      fontWeight: '600',
      color: '#555',
      fontVariant: 'small-caps',
      ...style
    }}
    {...rest}
  />
);

function KeyBindingsModal({ isOpen, onRequestClose }) {
  return (
    <Modal
      style={{
        overlay: {
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        },
        content: { position: 'static' }
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
              <td style={{ padding: '2px 12px' }}>
                {mac.map(key => (
                  <Key key={key}>{key}</Key>
                ))}
              </td>
              <td style={{ padding: '2px 12px' }}>
                {pc.map(key => (
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
