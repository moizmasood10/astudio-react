// src/components/Navbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    
    <nav className="bg-yellow text-black p-4">
      <ul className="flex justify-around">
        <li>
          <Link to="/users" className="font-bold hover:text-blue">Users</Link>
        </li>
        <li>
          <Link to="/products" className="font-bold hover:text-blue">Products</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
