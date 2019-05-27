import React from 'react';
import { connect } from 'react-redux';

const style = {
  marginLeft: 10
};
function Icon({ status }) {
  switch (status) {
    case 'loaded':
      return (
        <i
          className="fa fa-check"
          style={{
            ...style,
            color: 'green'
          }}
        />
      );
    case 'error':
      return (
        <i
          className="fa fa-times"
          style={{
            ...style,
            color: 'red'
          }}
        />
      );
    default:
      return <i className="fa fa-spinner fa-pulse" style={style} />;
  }
}

const LibraryListPanel = ({ libraryListIsOpen, libraries }) => {
  if (!libraryListIsOpen) return <div />;

  return (
    <div style={{ padding: 10 }}>
      <strong>External Libraries</strong>
      <ul style={{ margin: 5 }}>
        {libraries.map(({ name, url, status }) => (
          <li key={url}>
            <a href={url}>{name || url}</a>
            <Icon status={status} />
          </li>
        ))}
      </ul>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    libraryListIsOpen: state.libraryListIsOpen,
    libraries: state.libraries
  };
};

const Panel = connect(mapStateToProps)(LibraryListPanel);

export default Panel;
