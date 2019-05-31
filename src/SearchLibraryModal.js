import React, { useState, useCallback } from 'react';
import Modal from 'react-modal';
import debounce from 'lodash/debounce';

function searchLib(str) {
  return fetch(`https://api.cdnjs.com/libraries?search=${str.trim()}`)
    .then(response => response.json())
    .then(data => data.results);
}

let currentRequest;

function SearchLibraryModal({ isOpen, onRequestClose, onAdd }) {
  const [loading, setLoading] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const search = useCallback(
    debounce(str => {
      if (!str.trim()) return;
      setLoading(true);
      const request = searchLib(str)
        .then(data => {
          if (request !== currentRequest) return;
          setLoading(false);
          setSearchResults(data);
        })
        .catch(error => {
          if (request !== currentRequest) return;
          setLoading(false);
          alert(error.message);
        });
      currentRequest = request;
    }, 500),
    []
  );

  function close() {
    setSearchResults([]);
    onRequestClose();
  }

  return (
    <Modal isOpen={isOpen} onRequestClose={close}>
      <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        <input
          style={{
            width: '100%',
            boxSizing: 'border-box',
            fontSize: 18,
            border: '1px #ddd solid',
            borderRadius: 4,
            padding: '4px 8px'
          }}
          autoFocus
          onChange={e => {
            search(e.target.value);
          }}
        />
        {loading ? (
          <span>searching...</span>
        ) : (
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
        )}
      </div>
    </Modal>
  );
}

export default SearchLibraryModal;
