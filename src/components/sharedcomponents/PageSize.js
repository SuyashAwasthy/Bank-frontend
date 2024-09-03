import React from 'react';
import PropTypes from 'prop-types';

const PageSize = ({ pageSize, onPageSizeChange }) => {
  const handleSizeChange = (e) => {
    onPageSizeChange(Number(e.target.value));
  };

  return (
    <div>
      <label htmlFor="pageSize">Items per page: </label>
      <select id="pageSize" value={pageSize} onChange={handleSizeChange}>
        <option value={10}>10</option>
        <option value={20}>20</option>
        <option value={50}>50</option>
      </select>
    </div>
  );
};

PageSize.propTypes = {
  pageSize: PropTypes.number.isRequired,
  onPageSizeChange: PropTypes.func.isRequired,
};

export default PageSize;