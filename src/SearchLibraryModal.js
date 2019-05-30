import React, { useState } from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root');

function searchLib(str) {
  return fetch(`https://api.cdnjs.com/libraries?search=${str.trim()}`)
    .then(response => response.json())
    .then(data => data.results);
}

function SearchLibraryModal({ isOpen, onRequestClose, onAdd }) {
  const [value, setValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [searchResults, setSearchResults] = useState([]);

  function close() {
    setValue('');
    setSearchResults([]);
    onRequestClose();
  }

  return (
    <Modal isOpen={isOpen} onRequestClose={close}>
      <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        <form
          onSubmit={e => {
            e.preventDefault();
            setLoading(true);
            searchLib(value)
              .then(data => {
                setLoading(false);
                setSearchResults(data);
              })
              .catch(error => {
                setLoading(false);
                alert(error.message);
              });
          }}
        >
          <input
            style={{ width: '100%', boxSizing: 'border-box' }}
            autoFocus
            disabled={loading}
            value={value}
            onChange={e => {
              setValue(e.target.value);
            }}
          />
        </form>
        <div style={{ flex: 1, overflow: 'auto' }}>
          <ul>
            {searchResults.map(({ name, latest }) => (
              <li key={name} style={{ margin: '2px 0' }}>
                <button
                  style={{ cursor: 'pointer' }}
                  onClick={() => {
                    close();
                    onAdd(latest);
                  }}
                >
                  <strong>{name}</strong> - {latest}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Modal>
  );
}

export default SearchLibraryModal;
