import React from 'react';
import find from 'lodash/find';

const LibraryLoadingIndicator = ({ libraries }) => {
  if (find(libraries, { status: 'loading' }))
    return <i className="fa fa-spinner fa-pulse" />;

  return <i className="fa fa-check" />;
};

export default LibraryLoadingIndicator;
