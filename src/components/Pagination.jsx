// src/components/Pagination.jsx
import React from 'react';

const Pagination = ({ totalItems, currentPage, setCurrentPage }) => {
  const pageSize = 5;  // You can pass this as a prop or context if needed
  const totalPages = Math.ceil(totalItems / pageSize);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <div className="flex justify-center items-center mt-4 space-x-2">
      <button
        className="px-2 py-1 bg-gray-300 rounded"
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Previous
      </button>
      <span className="px-2 py-1">{currentPage} / {totalPages}</span>
      <button
        className="px-2 py-1 bg-gray-300 rounded"
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
