import React from 'react';
import PropTypes from 'prop-types';

function VimToggle({ on, onToggle }) {
  const text = on ? 'Vim On' : 'Vim Off';

  return (
    <label style={{ cursor: 'pointer' }}>
      <input
        type="checkbox"
        style={{ cursor: 'pointer' }}
        checked={on}
        onChange={onToggle}
      />
      {text}
    </label>
  );
}

VimToggle.propTypes = {
  on: PropTypes.bool.isRequired,
  onToggle: PropTypes.func.isRequired
};

export default VimToggle;
