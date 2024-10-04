import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Users from './pages/Users';
import Products from './pages/Products';
import DataProvider from './context/DataContext';

function App() {
  return (
    <DataProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/users" element={<Users />} />
          <Route path="/products" element={<Products />} />
        </Routes>
      </Router>
    </DataProvider>
  );
}

export default App;