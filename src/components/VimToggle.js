import React from 'react';
import PropTypes from 'prop-types';

function VimToggle({ on, onToggle }) {
  const text = on ? 'Vim On' : 'Vim Off';

  return (
    <label>
      <input type="checkbox" checked={on} onChange={onToggle} />
      {text}
    </label>
  );
}

VimToggle.propTypes = {
  on: PropTypes.bool.isRequired,
  onToggle: PropTypes.func.isRequired
};

export default VimToggle;
