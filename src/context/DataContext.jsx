// src/context/DataContext.jsx
import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const DataContext = createContext();

const DataProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [pageSize, setPageSize] = useState(5); // default page size is 5
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalProducts, setTotalProducts] = useState(0);

  // Fetch users from the API with pagination
  const fetchUsers = async (page = 1, size = 5) => {
    try {
      const skip = (page - 1) * size;
      const response = await axios.get(`https://dummyjson.com/users?limit=${size}&skip=${skip}`);
      setUsers(response.data.users);
      setTotalUsers(response.data.total);  // Set total users for pagination
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  // Fetch products from the API with pagination
  const fetchProducts = async (page = 1, size = 5) => {
    try {
      const skip = (page - 1) * size;
      const response = await axios.get(`https://dummyjson.com/products?limit=${size}&skip=${skip}`);
      setProducts(response.data.products);
      setTotalProducts(response.data.total);  // Set total products for pagination
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    setLoading(false);
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <DataContext.Provider
      value={{
        users, 
        products, 
        pageSize, 
        totalUsers, 
        totalProducts, 
        fetchUsers, 
        fetchProducts, 
        setPageSize
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataProvider;
