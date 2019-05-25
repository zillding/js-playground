import React from 'react';
import { connect } from 'react-redux';

import {
  toggleLibraryList,
  toggleAddDefaultLibrary,
  resetDefaultLibraries,
  toggleEditorVimMode,
  addLibrary
} from '../actions';

import Seperator from '../components/MenuBarSeperator';
import DefaultLibraries from '../components/DefaultLibraries';
import AddLibrary from '../components/AddLibrary';
import VimToggle from '../components/VimToggle';
import LibraryLoadingIndicator from '../components/LibraryLoadingIndicator';
import LibraryListPanelToggle from '../components/LibraryListPanelToggle';

const itemStyle = {
  flex: 0,
  margin: 5
};
const rightItemStyle = Object.assign({}, itemStyle, {
  marginLeft: 'auto'
});

const MenuBar = ({
  defaultLibraries,
  libraryListIsOpen,
  editorVimModeEnabled,
  libraries,
  onToggleLibraryList,
  onAddDefaultLibraryRequest,
  onResetDefaultLibrariesRequest,
  onToggleVimMode,
  onAddLibrary
}) => (
  <div style={{ display: 'flex', overflow: 'auto' }}>
    <div style={itemStyle}>
      <span>JS Playground</span>
    </div>
    <Seperator />
    <div style={itemStyle}>
      <DefaultLibraries data={defaultLibraries} onSelect={onAddLibrary} />
    </div>
    <Seperator />
    <div style={itemStyle}>
      <AddLibrary
        onAdd={onAddLibrary}
        onAddDefaultRequest={onAddDefaultLibraryRequest}
        onResetDefaultRequest={onResetDefaultLibrariesRequest}
      />
    </div>
    <Seperator />
    <div style={itemStyle}>
      <VimToggle on={editorVimModeEnabled} onToggle={onToggleVimMode} />
    </div>
    {libraries.length > 0
      ? <div style={rightItemStyle}>
          <LibraryLoadingIndicator libraries={libraries} />
          <LibraryListPanelToggle
            libraryListIsOpen={libraryListIsOpen}
            onToggleLibraryList={onToggleLibraryList}
          />
        </div>
      : null}
  </div>
);

const mapStateToProps = state => {
  return {
    defaultLibraries: state.defaultLibraries,
    libraryListIsOpen: state.libraryListIsOpen,
    editorVimModeEnabled: state.editorVimModeEnabled,
    libraries: state.libraries
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onAddLibrary: library => dispatch(addLibrary(library)),
    onToggleLibraryList: () => dispatch(toggleLibraryList()),
    onAddDefaultLibraryRequest: () => dispatch(toggleAddDefaultLibrary(true)),
    onResetDefaultLibrariesRequest: () => dispatch(resetDefaultLibraries()),
    onToggleVimMode: () => dispatch(toggleEditorVimMode())
  };
};

const MenuBarComponent = connect(mapStateToProps, mapDispatchToProps)(MenuBar);

export default MenuBarComponent;
