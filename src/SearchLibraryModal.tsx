import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { type RowComponentProps, List, useListRef } from 'react-window';
import { useDebouncedCallback } from 'use-debounce';

import styles from './SearchLibraryModal.module.css';

function searchLib(str: string) {
  return fetch(`https://api.cdnjs.com/libraries?search=${str.trim()}`)
    .then((response) => response.json())
    .then((data) => data.results);
}

let currentRequest: object;

function RowComponent({
  index,
  style,
  selectedIndex,
  items,
}: RowComponentProps<{
  selectedIndex: number;
  items: {
    name: string;
    latest: string;
  }[];
}>) {
  const data = items[index];
  return (
    <div
      className={styles.item}
      style={{
        ...style,
        backgroundColor: index === selectedIndex ? '#ddd' : undefined,
      }}
    >
      <strong>{data.name}</strong> - <a href={data.latest}>{data.latest}</a>
    </div>
  );
}

function SearchLibraryModal({
  isOpen,
  onRequestClose,
  onAdd,
}: {
  isOpen: boolean;
  onRequestClose: () => void;
  onAdd: (url: string) => void;
}) {
  const listRef = useListRef(null);
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
    listRef.current?.scrollToRow({ index: selectedItemIndex });
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
          onBlur={onRequestClose}
          onKeyDown={(e) => {
            if (!searchResults.length) return;
            switch (e.key) {
              case 'ArrowUp':
                e.preventDefault();
                setSelectedItemIndex(
                  selectedItemIndex === 0
                    ? searchResults.length - 1
                    : selectedItemIndex - 1
                );
                return;
              case 'ArrowDown':
                e.preventDefault();
                setSelectedItemIndex(
                  selectedItemIndex === searchResults.length - 1
                    ? 0
                    : selectedItemIndex + 1
                );
                return;
              case 'Enter':
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
          <List
            listRef={listRef}
            rowComponent={RowComponent}
            rowCount={searchResults.length}
            rowHeight={30}
            rowProps={{
              selectedIndex: selectedItemIndex,
              items: searchResults,
            }}
          />
        </div>
      </div>
    </Modal>
  );
}

export default SearchLibraryModal;
