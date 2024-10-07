import React, { useContext, useState, useEffect } from 'react';
import { DataContext } from '../context/DataContext';
import Pagination from './Pagination';
import PageSizeDropdown from './PageSizeDropdown';
import SearchBar from './SearchBar';
import axios from 'axios';

const ProductList = () => {
  const { products, totalProducts, pageSize, fetchProducts } = useContext(DataContext);
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredProducts, setFilteredProducts] = useState(products);

  // Filters state
  const [showTitleFilter, setShowTitleFilter] = useState(false);
  const [showBrandFilter, setShowBrandFilter] = useState(false);
  const [titleFilter, setTitleFilter] = useState('');
  const [brandFilter, setBrandFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');

  useEffect(() => {
    setCurrentPage(1);
    fetchProducts(currentPage, pageSize);
  }, [pageSize]);

  useEffect(() => {
    fetchProducts(currentPage, pageSize);
  }, [currentPage]);

  useEffect(() => {
    setFilteredProducts(products);
  }, [products]);

  // Check if any filters are applied
  const areFiltersApplied = titleFilter || brandFilter || categoryFilter;

  // Handle API request when a filter is applied
  const applyFilter = async (filterType, filterValue) => {
    // Reset other filters when one filter is applied
    if (filterType !== 'title') setTitleFilter('');
    if (filterType !== 'brand') setBrandFilter('');
    if (filterType !== 'category') setCategoryFilter('');

    let url = 'https://dummyjson.com/products';
    if (filterType === 'title') url = `${url}/search?q=${filterValue}`;
    if (filterType === 'brand') url = `${url}/search?q=${filterValue}`;
    if (filterType === 'category') {
      url = `${url}/filter?key=category&value=${filterValue}`; // Correct category filter endpoint
    }

    try {
      const response = await axios.get(url);
      // Set the filtered products or fallback to an empty array
      setFilteredProducts(response.data.products || []);
    } catch (error) {
      console.error('Error fetching filtered products:', error);
      setFilteredProducts([]); // Clear filtered products on error
    }
  };

  const handleCategoryChange = (e) => {
    const selectedCategory = e.target.value;
    setCategoryFilter(selectedCategory);
    applyFilter('category', selectedCategory);
  };

  const handleSearch = (searchTerm) => {
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    const filtered = products.filter(product => {
      return (
        product.title.toLowerCase().includes(lowerCaseSearchTerm) ||
        product.brand.toLowerCase().includes(lowerCaseSearchTerm) ||
        product.category.toLowerCase().includes(lowerCaseSearchTerm)
      );
    });
    setFilteredProducts(filtered);
  };

  return (
    <div className="p-4">
      <h1 className="mb-4 text-2xl font-bold">Products</h1>

      {/* Filters and Search Bar in One Row */}
      <div className="flex items-center mb-4 space-x-4">
        <PageSizeDropdown />
        <SearchBar onSearch={handleSearch} />

        {/* Filters UI */}
        <div className="relative inline-block mr-4">
          <div className="flex items-center">
            <span>Title</span>
            <button onClick={() => setShowTitleFilter(!showTitleFilter)}>
              <i className="ml-2 text-sm">▼</i>
            </button>
          </div>
          {showTitleFilter && (
            <input
              type="text"
              placeholder="Filter by Title"
              className="p-2 mt-2 border border-gray-300"
              value={titleFilter}
              onChange={(e) => {
                setTitleFilter(e.target.value);
                applyFilter('title', e.target.value);
              }}
            />
          )}
        </div>

        <div className="relative inline-block mr-4">
          <div className="flex items-center">
            <span>Brand</span>
            <button onClick={() => setShowBrandFilter(!showBrandFilter)}>
              <i className="ml-2 text-sm">▼</i>
            </button>
          </div>
          {showBrandFilter && (
            <input
              type="text"
              placeholder="Filter by Brand"
              className="p-2 mt-2 border border-gray-300"
              value={brandFilter}
              onChange={(e) => {
                setBrandFilter(e.target.value);
                applyFilter('brand', e.target.value);
              }}
            />
          )}
        </div>

        <div className="inline-block">
          <label htmlFor="categoryFilter" className="mr-2">Category</label>
          <select
            id="categoryFilter"
            className="p-2 border border-gray-300"
            value={categoryFilter}
            onChange={handleCategoryChange}
          >
            <option value="">Select Category</option>
            <option value="laptops">Laptops</option>
            <option value="smartphones">Smartphones</option>
            {/* Add more categories as needed */}
          </select>
        </div>
      </div>

      {/* Render the product data in a table */}
      <div className="overflow-x-auto">
        <table className="min-w-full border border-grey">
          <thead className="bg-blue">
            <tr>
              <th className="px-4 py-2 text-center font-regular">Title</th>
              <th className="px-4 py-2 text-center font-regular">Brand</th>
              <th className="px-4 py-2 text-center font-regular">Category</th>
              <th className="px-4 py-2 text-center font-regular">Stock</th>
              <th className="px-4 py-2 text-center font-regular">Rating</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map(product => (
              <tr key={product.id} className="transition duration-300 border-t hover:bg-grey">
                <td className="px-4 py-2 text-center border border-grey font-regular">{product.title}</td>
                <td className="px-4 py-2 text-center border border-grey font-regular">{product.brand}</td>
                <td className="px-4 py-2 text-center border border-grey font-regular">{product.category}</td>
                <td className="px-4 py-2 text-center border border-grey font-regular">{product.stock}</td>
                <td className="px-4 py-2 text-center border border-grey font-regular">{product.rating}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Conditionally show pagination */}
      {!areFiltersApplied && (
        <Pagination totalItems={totalProducts} currentPage={currentPage} setCurrentPage={setCurrentPage} />
      )}
    </div>
  );
};

export default ProductList;
