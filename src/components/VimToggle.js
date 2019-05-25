import React from 'react';
import PropTypes from 'prop-types';
import Toggle from 'react-toggle';
import 'react-toggle/style.css';

const VimToggle = ({ on, onToggle }) => {
  const text = on ? 'Vim On' : 'Vim Off';

  return (
    <label>
      <Toggle checked={on} onChange={onToggle} />
      <span style={{ verticalAlign: 'middle' }}>{text}</span>
    </label>
  );
};

VimToggle.propTypes = {
  on: PropTypes.bool.isRequired,
  onToggle: PropTypes.func.isRequired
};

export default VimToggle;
