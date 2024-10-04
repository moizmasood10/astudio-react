// src/components/PageSizeDropdown.jsx
import React, { useContext } from 'react';
import { DataContext } from '../context/DataContext';

const PageSizeDropdown = () => {
  const { pageSize, setPageSize } = useContext(DataContext);
  const pageSizes = [5, 10, 20, 50];

  const handleChange = (event) => {
    setPageSize(Number(event.target.value));
  };

  return (
    <div className="mb-4">
      <label htmlFor="pageSize" className="mr-2">Page Size: </label>
      <select
        id="pageSize"
        value={pageSize}
        onChange={handleChange}
        className="border p-2 rounded"
      >
        {pageSizes.map(size => (
          <option key={size} value={size}>
            {size}
          </option>
        ))}
      </select>
    </div>
  );
};

export default PageSizeDropdown;
