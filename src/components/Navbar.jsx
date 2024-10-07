import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();

  return (
    <nav className="p-4 text-black border-b border-gray-300 shadow-sm bg-yellow">
      <ul className="flex items-center justify-around">
        <li className="flex-1 text-center">
          <Link
            to="/users"
            className={`font-bold px-4 py-2 ${
              location.pathname === '/users'
                ? 'text-blue-600 underline underline-offset-8 decoration-2'
                : 'hover:text-blue-400 transition-colors'
            }`}
          >
            Users
          </Link>
        </li>
        <li className="flex-1 text-center border-l border-gray-300">
          <Link
            to="/products"
            className={`font-bold px-4 py-2 ${
              location.pathname === '/products'
                ? 'text-blue-600 underline underline-offset-8 decoration-2'
                : 'hover:text-blue-400 transition-colors'
            }`}
          >
            Products
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
