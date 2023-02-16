import React, { useState, useRef, useEffect } from 'react';
import Modal from 'react-modal';
import keycode from 'keycode';
import { FixedSizeList as List } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';
import { useDebouncedCallback } from 'use-debounce';

import styles from './SearchLibraryModal.module.css';

function searchLib(str: string) {
  return fetch(`https://api.cdnjs.com/libraries?search=${str.trim()}`)
    .then((response) => response.json())
    .then((data) => data.results);
}

let currentRequest: object;

type Props = {
  isOpen: boolean;
  onRequestClose: () => void;
  onAdd: (url: string) => void;
};

function SearchLibraryModal({ isOpen, onRequestClose, onAdd }: Props) {
  const listEl = useRef<null | List>(null);
  const [loading, setLoading] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [selectedItemIndex, setSelectedItemIndex] = useState(0);
  const search = useDebouncedCallback((str) => {
    if (!str.trim()) return;
    setLoading(true);
    const request = searchLib(str)
      .then((data) => {
        if (request !== currentRequest) return;
        setLoading(false);
        setSearchResults(data);
      })
      .catch((error) => {
        if (request !== currentRequest) return;
        setLoading(false);
        alert(error.message);
      });
    currentRequest = request;
  }, 500);

  useEffect(() => {
    listEl.current?.scrollToItem(selectedItemIndex);
  }, [selectedItemIndex]);

  function close() {
    setSearchResults([]);
    onRequestClose();
  }

  return (
    <Modal isOpen={isOpen} onRequestClose={close}>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
        }}
      >
        <input
          style={{
            width: '100%',
            boxSizing: 'border-box',
            fontSize: 18,
            border: '1px #ddd solid',
            borderRadius: 4,
            padding: '4px 8px',
          }}
          autoFocus
          onChange={(e) => {
            search(e.target.value);
          }}
          onKeyDown={(e) => {
            if (!searchResults.length) return;
            switch (e.keyCode) {
              case keycode('up'):
                e.preventDefault();
                setSelectedItemIndex(
                  selectedItemIndex === 0
                    ? searchResults.length - 1
                    : selectedItemIndex - 1
                );
                return;
              case keycode('down'):
                e.preventDefault();
                setSelectedItemIndex(
                  selectedItemIndex === searchResults.length - 1
                    ? 0
                    : selectedItemIndex + 1
                );
                return;
              case keycode('enter'):
                if (searchResults[selectedItemIndex]) {
                  close();
                  onAdd(searchResults[selectedItemIndex]['latest']);
                }
                break;
              default:
                return;
            }
          }}
        />
        {loading && (
          <span
            style={{
              position: 'absolute',
              top: 4,
              fontSize: 12,
            }}
          >
            searching...
          </span>
        )}
        <div style={{ flex: 1, overflow: 'auto' }}>
          <AutoSizer>
            {({ height, width }) => (
              <List
                ref={listEl}
                height={height}
                itemCount={searchResults.length}
                itemSize={30}
                width={width}
              >
                {({ index, style }) => {
                  const { name, latest } = searchResults[index];
                  return (
                    <div
                      className={styles.item}
                      style={{
                        ...style,
                        backgroundColor:
                          selectedItemIndex === index ? '#ddd' : undefined,
                      }}
                    >
                      <strong>{name}</strong> - <a href={latest}>{latest}</a>
                    </div>
                  );
                }}
              </List>
            )}
          </AutoSizer>
        </div>
      </div>
    </Modal>
  );
}

export default SearchLibraryModal;
