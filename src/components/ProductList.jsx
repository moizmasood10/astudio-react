// src/components/ProductList.jsx
import React, { useContext, useState, useEffect } from 'react';
import { DataContext } from '../context/DataContext';
import Pagination from './Pagination';
import PageSizeDropdown from './PageSizeDropdown';

const ProductList = () => {
  const { products, totalProducts, pageSize, fetchProducts } = useContext(DataContext);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setCurrentPage(1);  // Reset to page 1 when component mounts
    fetchProducts(currentPage, pageSize);  // Fetch initial data
  }, [pageSize]);  // Refetch when pageSize changes

  useEffect(() => {
    fetchProducts(currentPage, pageSize);  // Fetch data when page changes
  }, [currentPage]);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-neutra mb-4">Products</h1>
      <PageSizeDropdown />
      <ul className="space-y-4">
        {products.map(product => (
          <li key={product.id} className="bg-blue p-4 rounded-lg shadow-md">
            <p className="text-lg font-semibold">{product.title}</p>
            <p className="text-sm text-gray-600">{product.price}</p>
          </li>
        ))}
      </ul>
      <Pagination totalItems={totalProducts} currentPage={currentPage} setCurrentPage={setCurrentPage} />
    </div>
  );
};

export default ProductList;
