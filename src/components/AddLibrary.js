import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { isUri } from 'valid-url';

import { focusOnEditor } from './Editor';

let inputDom = null;

class AddLibrary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      url: ''
    };

    this._handleAddClick = this._handleAddClick.bind(this);
    this._handleInputChange = this._handleInputChange.bind(this);
    this._handleKeyPress = this._handleKeyPress.bind(this);
  }

  componentDidMount() {
    inputDom = this.refs.input;
  }

  _handleAddClick() {
    const { onAdd, onAddDefaultRequest, onResetDefaultRequest } = this.props;
    const { url } = this.state;

    // secret message to open the add default library
    // portal
    if (url === 'addmyown') {
      onAddDefaultRequest();
      this.setState({ url: '' });
    }

    if (url === 'reset') {
      onResetDefaultRequest();
      this.setState({ url: '' });
    }

    if (isUri(url)) {
      this.props.onAdd({ url });
      this.setState({ url: '' });
    }
  }

  _handleInputChange(e) {
    const url = e.target.value;
    this.setState({ url });
  }

  _handleKeyPress(e) {
    switch (e.which) {
      case 13:
        // enter
        return this._handleAddClick();
      case 27:
        // escape
        return focusOnEditor();
      default:
        return;
    }
  }

  render() {
    const { url } = this.state;

    return (
      <span>
        <input
          ref="input"
          type="text"
          value={url}
          placeholder="Paste script url here"
          onKeyUp={this._handleKeyPress}
          onChange={this._handleInputChange}
        />
        <button disabled={!isUri(url)} onClick={this._handleAddClick}>
          Add
        </button>
      </span>
    );
  }
}

AddLibrary.propTypes = {
  onAdd: PropTypes.func.isRequired,
  onAddDefaultRequest: PropTypes.func.isRequired,
  onResetDefaultRequest: PropTypes.func.isRequired
};

export default AddLibrary;

export function focusOnAddLibInput() {
  if (inputDom) inputDom.focus();
}
