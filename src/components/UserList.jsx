// src/components/UserList.jsx
import React, { useContext, useState, useEffect } from 'react';
import { DataContext } from '../context/DataContext';
import Pagination from './Pagination';
import PageSizeDropdown from './PageSizeDropdown';

const UserList = () => {
  const { users, totalUsers, pageSize, fetchUsers } = useContext(DataContext);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setCurrentPage(1);  // Reset to page 1 when component mounts
    fetchUsers(currentPage, pageSize);  // Fetch initial data
  }, [pageSize]);  // Refetch when pageSize changes

  useEffect(() => {
    fetchUsers(currentPage, pageSize);  // Fetch data when page changes
  }, [currentPage]);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-neutra mb-4">Users</h1>
      <PageSizeDropdown />
      <ul className="space-y-4">
        {users.map(user => (
          <li key={user.id} className="bg-grey p-4 rounded-lg shadow-md">
            <p className="text-lg font-semibold">{user.firstName} {user.lastName}</p>
            <p className="text-sm text-gray-600">{user.email}</p>
          </li>
        ))}
      </ul>
      <Pagination totalItems={totalUsers} currentPage={currentPage} setCurrentPage={setCurrentPage} />
    </div>
  );
};

export default UserList;
