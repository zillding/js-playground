import React from 'react'
import { connect } from 'react-redux'

import { toggleModal } from '../actions'

const MenuBar = ({ onToggleModal }) => (
  <div>
    <span style={{margin: 10}}>Playground</span>
    <button onClick={onToggleModal}>Libraries</button>
  </div>
)

const mapStateToProps = state => {
  return {}
}

const mapDispatchToProps = dispatch => {
  return {
    onToggleModal: () => dispatch(toggleModal())
  }
}

const MenuBarComponent = connect(
  mapStateToProps,
  mapDispatchToProps
)(MenuBar)

export default MenuBarComponent
