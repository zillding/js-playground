import React from 'react'
import { connect } from 'react-redux'
import Modal from 'react-modal'

import { toggleModal, addLibrary } from '../actions'

import AddLibrary from '../components/AddLibrary'
import LibraryList from '../components/LibraryList'
import { focusOnEditor } from '../components/Editor'

const iconStyle = {
  float: 'right',
  cursor: 'pointer'
}

const MyModal = ({
  modalIsOpen,
  libraries,
  onToggleModal,
  onAddLibrary
}) => (
  <Modal
    isOpen={modalIsOpen}
    onRequestClose={onToggleModal}>
    <i
      className="fa fa-close fa-2x"
      style={iconStyle}
      onClick={onToggleModal}>
    </i>
    <h3>External Libraries</h3>
    <AddLibrary onAdd={onAddLibrary} />
    <LibraryList libraries={libraries} />
  </Modal>
)

const mapStateToProps = (state) => {
  return {
    modalIsOpen: state.modalIsOpen,
    libraries: state.libraries
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onToggleModal: () => {
      dispatch(toggleModal())
      focusOnEditor()
    },
    onAddLibrary: url => dispatch(addLibrary(url))
  }
}

const ModalComponent = connect(
  mapStateToProps,
  mapDispatchToProps
)(MyModal)

export default ModalComponent
