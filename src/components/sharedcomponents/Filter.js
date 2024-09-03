import React from 'react';

const Filter = ({ searchName, onSearchNameChange, onPageSizeChange, pageSize }) => {
  return (
    <div className="d-flex">
      <input
        type="text"
        value={searchName}
        onChange={onSearchNameChange}
        placeholder="Search by Name"
        className="form-control me-2"
      />
      <select
        value={pageSize}
        onChange={(e) => onPageSizeChange(Number(e.target.value))}
        className="form-select"
      >
        {[10, 25, 50].map(size => (
          <option key={size} value={size}>{size} per page</option>
        ))}
      </select>
    </div>
  );
};

export default Filter;