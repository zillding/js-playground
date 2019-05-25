import React from 'react';
import { connect } from 'react-redux';

import { addDefaultLibrary, toggleAddDefaultLibrary } from './actions';

import AddDefaultLibrary from './AddDefaultLibrary';

const AddDefaultLibraryPanel = ({ addDefaultLibraryIsOpen, onAdd, onDone }) => {
  if (!addDefaultLibraryIsOpen) return <div />;

  return <AddDefaultLibrary onAdd={onAdd} onDone={onDone} />;
};

const mapStateToProps = state => {
  return {
    addDefaultLibraryIsOpen: state.addDefaultLibraryIsOpen
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onAdd: library => dispatch(addDefaultLibrary(library)),
    onDone: () => dispatch(toggleAddDefaultLibrary(false))
  };
};

const Panel = connect(
  mapStateToProps,
  mapDispatchToProps
)(AddDefaultLibraryPanel);

export default Panel;
