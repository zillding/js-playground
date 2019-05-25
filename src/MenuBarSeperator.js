import React from 'react';

const Seperator = ({ margin }) => {
  const style = {
    marginLeft: margin || 0,
    marginRight: margin || 0
  };

  return <span style={style}>|</span>;
};

export default Seperator;
