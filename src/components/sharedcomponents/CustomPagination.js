// import React from 'react'; 
 
// const Pagination = ({ totalItems, pageSize, currentPage, onPageChange }) => { 
//   const totalPages = Math.ceil(totalItems / pageSize); 
 
//   const handlePageChange = (page) => { 
//     if (page > 0 && page <= totalPages) { 
//       onPageChange(page); 
//     } 
//   }; 
 
//   return ( 
//     <div className="pagination"> 
//       <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}> 
//         Previous 
//       </button> 
//       <span>Page {currentPage} of {totalPages}</span> 
//       <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}> 
//         Next 
//       </button> 
//     </div> 
//   ); 
// }; 
 
// export default Pagination;

import React from 'react';
import PropTypes from 'prop-types';

const Pagination = ({ currentPage, totalItems, itemsPerPage, onPageChange }) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handlePageClick = (page) => {
    if (page > 0 && page <= totalPages) {
      onPageChange(page);
    }
  };

  return (
    <div className="pagination">
      <button 
        className="btn btn-outline-primary" 
        onClick={() => handlePageClick(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Previous
      </button>
      <span className="mx-2">
        Page {currentPage} of {totalPages}
      </span>
      <button 
        className="btn btn-outline-primary" 
        onClick={() => handlePageClick(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </div>
  );
};

Pagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  totalItems: PropTypes.number.isRequired,
  itemsPerPage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};

export default Pagination;