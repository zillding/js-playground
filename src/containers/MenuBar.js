import React from 'react'
import { connect } from 'react-redux'
import { Flex, Item } from 'react-flex'
require('react-flex/index.css')

import { toggleLibraryList, toggleEditorVimMode, addLibrary } from '../actions'

import Seperator from '../components/MenuBarSeperator'
import DefaultLibraries from '../components/DefaultLibraries'
import AddLibrary from '../components/AddLibrary'
import VimToggle from '../components/VimToggle'
import LibraryLoadingIndicator from '../components/LibraryLoadingIndicator'
import LibraryListPanelToggle from '../components/LibraryListPanelToggle'

const itemStyle = {
  margin: 5
}
const rightItemStyle = Object.assign({}, itemStyle, {
  marginLeft: 'auto'
})

const MenuBar = ({
  defaultLibraries,
  libraryListIsOpen,
  editorVimModeEnabled,
  libraries,
  onToggleLibraryList,
  onToggleVimMode,
  onAddLibrary
}) => (
  <Flex style={{overflow: 'auto'}}>
    <Item flex={0} style={itemStyle}>
      <span>JS Playground</span>
    </Item>
    <Seperator/>
    <Item flex={0} style={itemStyle}>
      <DefaultLibraries
        data={defaultLibraries}
        onSelect={onAddLibrary} />
    </Item>
    <Seperator/>
    <Item flex={0} style={itemStyle}>
      <AddLibrary onAdd={onAddLibrary} />
    </Item>
    <Seperator/>
    <Item flex={0} style={itemStyle}>
      <VimToggle
        on={editorVimModeEnabled}
        onToggle={onToggleVimMode} />
    </Item>
    {
      libraries.length > 0 ?
        <Item flex={0} style={rightItemStyle}>
          <LibraryLoadingIndicator libraries={libraries} />
          <LibraryListPanelToggle
            libraryListIsOpen={libraryListIsOpen}
            onToggleLibraryList={onToggleLibraryList} />
        </Item> :
        null
    }
  </Flex>
)

const mapStateToProps = state => {
  return {
    defaultLibraries: state.defaultLibraries,
    libraryListIsOpen: state.libraryListIsOpen,
    editorVimModeEnabled: state.editorVimModeEnabled,
    libraries: state.libraries
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onAddLibrary: library => dispatch(addLibrary(library)),
    onToggleLibraryList: () => dispatch(toggleLibraryList()),
    onToggleVimMode: () => dispatch(toggleEditorVimMode())
  }
}

const MenuBarComponent = connect(
  mapStateToProps,
  mapDispatchToProps
)(MenuBar)

export default MenuBarComponent
