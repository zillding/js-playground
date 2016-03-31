import React from 'react'
import { connect } from 'react-redux'
import Modal from 'react-modal'

import { toggleModal } from '../actions'

import { focusOnEditor } from '../components/Editor'
import LibrarySettings from './LibrarySettings'

const iconStyle = {
  float: 'right',
  cursor: 'pointer'
}

const MyModal = ({
  modalIsOpen,
  onToggleModal
}) => (
  <Modal
    isOpen={modalIsOpen}
    onRequestClose={onToggleModal}>
    <i
      className="fa fa-close fa-2x"
      style={iconStyle}
      onClick={onToggleModal}>
    </i>
    <LibrarySettings/>
  </Modal>
)

const mapStateToProps = (state) => {
  return {
    modalIsOpen: state.modalIsOpen
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onToggleModal: () => {
      dispatch(toggleModal())
      focusOnEditor()
    }
  }
}

const ModalComponent = connect(
  mapStateToProps,
  mapDispatchToProps
)(MyModal)

export default ModalComponent
