import React, { useState } from 'react';
import PropTypes from 'prop-types';

const TransactionSearchById = ({ onSearch }) => {
  const [id, setId] = useState('');

  const handleSearch = () => {
    onSearch(id);
  };

  return (
    <div>
      <h4>Search Transaction by ID</h4>
      <input
        type="text"
        value={id}
        onChange={(e) => setId(e.target.value)}
        placeholder="Enter Transaction ID"
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

TransactionSearchById.propTypes = {
  onSearch: PropTypes.func.isRequired,
};

export default TransactionSearchById;