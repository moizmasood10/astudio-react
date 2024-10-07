import React, { useContext } from 'react';
import { DataContext } from '../context/DataContext';

const Pagination = ({ currentPage, setCurrentPage, totalItems }) => {
  const { pageSize } = useContext(DataContext); // Get pageSize from context
  const totalPages = Math.ceil(totalItems / pageSize); // Calculate total pages based on total items and pageSize

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  // Generate page numbers based on the current page
  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxVisiblePages = 5; // Adjust how many page numbers you want visible at once
    const leftLimit = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    const rightLimit = Math.min(totalPages, leftLimit + maxVisiblePages - 1);

    for (let i = leftLimit; i <= rightLimit; i++) {
      pageNumbers.push(i);
    }

    // Add "..." for pages not displayed in the middle
    if (rightLimit < totalPages) {
      pageNumbers.push('...');
      pageNumbers.push(totalPages);
    }
    if (leftLimit > 1) {
      pageNumbers.unshift('...');
      pageNumbers.unshift(1);
    }

    return pageNumbers;
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className="flex items-center justify-center mt-4 space-x-2">
      {/* Previous Button */}
      <button
        className="p-2"
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-5 h-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>

      {/* Page Numbers */}
      {pageNumbers.map((page, index) => (
        <button
          key={index}
          onClick={() => typeof page === 'number' && handlePageChange(page)}
          className={`px-2 py-1 ${
            page === currentPage
              ? 'text-yellow-500 text-lg font-bold underline' // Enlarged and highlighted current page
              : 'text-gray-700'
          }`}
          disabled={page === '...'}
        >
          {page}
        </button>
      ))}

      {/* Next Button */}
      <button
        className="p-2"
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-5 h-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>
    </div>
  );
};

export default Pagination;
