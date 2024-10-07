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
  const [searchTerm, setSearchTerm] = useState('');

  // Filters state
  const [showTitleFilter, setShowTitleFilter] = useState(false);
  const [showBrandFilter, setShowBrandFilter] = useState(false);
  const [titleFilter, setTitleFilter] = useState('');
  const [brandFilter, setBrandFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');

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

  useEffect(() => {
    // Check if the search term is a number
    const isNumeric = !isNaN(searchTerm) && !isNaN(parseFloat(searchTerm));
  
    const filtered = products.filter(product => {
      // Add checks to ensure product properties are defined
      const titleMatches = product.title?.toLowerCase().includes(searchTerm.toLowerCase());
      const brandMatches = product.brand?.toLowerCase().includes(searchTerm.toLowerCase());
      const categoryMatches = product.category?.toLowerCase().includes(searchTerm.toLowerCase());
  
      const stockMatches = isNumeric && product.stock?.toString() === searchTerm;
      const ratingMatches = isNumeric && product.rating?.toString() === searchTerm;
  
      return titleMatches || brandMatches || categoryMatches || stockMatches || ratingMatches;
    });
  
    setFilteredProducts(filtered);
  }, [searchTerm, products]);
  

  // Check if any filters are applied
  const areFiltersApplied = titleFilter || brandFilter || categoryFilter !== 'All';

  // Handle API request when a filter is applied
  const applyFilter = async (filterType, filterValue) => {
    // Reset other filters when one filter is applied
    if (filterType !== 'title') setTitleFilter('');
    if (filterType !== 'brand') setBrandFilter('');

    // Reset paginated view when filters are cleared
    if (filterValue === '' || filterValue === 'All') {
      fetchProducts(currentPage, pageSize);
      return;
    }

    let url = 'https://dummyjson.com/products';

    // Category filtering
    if (filterType === 'category') {
      if (filterValue === 'All') {
        // Fetch all products if "All" is selected
        const response = await axios.get(url);
        setFilteredProducts(response.data.products);
        return; // Exit the function early
      } else {
        // Fetch products by category
        url = `${url}/category/${filterValue.toLowerCase()}`; // Ensure category is in lowercase
      }
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

  return (
    <div className="p-4">
      <h1 className="mb-4 text-2xl font-bold font-neutra">Products</h1>

      {/* Align search bar and filters in a single row */}
      <div className="flex items-center mb-4 space-x-4">
        <PageSizeDropdown />
        <SearchBar onSearch={(term) => setSearchTerm(term)} />

        {/* Title Filter */}
        <div className="relative inline-block">
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

        {/* Brand Filter */}
        <div className="relative inline-block">
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

        {/* Category Filter */}
        <div className="inline-block">
          <label htmlFor="categoryFilter" className="mr-2">Category</label>
          <select
            id="categoryFilter"
            className="p-2 border border-gray-300"
            value={categoryFilter}
            onChange={handleCategoryChange}
          >
            <option value="All">All</option>
            <option value="laptops">Laptops</option>
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
