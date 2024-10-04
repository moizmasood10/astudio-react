import React, { useContext, useState, useEffect } from 'react';
import { DataContext } from '../context/DataContext';
import Pagination from './Pagination';
import PageSizeDropdown from './PageSizeDropdown';
import SearchBar from './SearchBar';
import axios from 'axios';

const UserList = () => {
  const { users, totalUsers, pageSize, fetchUsers } = useContext(DataContext);
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredUsers, setFilteredUsers] = useState(users);

  // Filters state
  const [showNameFilter, setShowNameFilter] = useState(false);
  const [showEmailFilter, setShowEmailFilter] = useState(false);
  const [nameFilter, setNameFilter] = useState('');
  const [emailFilter, setEmailFilter] = useState('');
  const [genderFilter, setGenderFilter] = useState('');

  useEffect(() => {
    setCurrentPage(1);
    fetchUsers(currentPage, pageSize);
  }, [pageSize]);

  useEffect(() => {
    fetchUsers(currentPage, pageSize);
  }, [currentPage]);

  useEffect(() => {
    setFilteredUsers(users);
  }, [users]);

  // Handle API request when a filter is applied
  const applyFilter = async (filterType, filterValue) => {
    // Reset other filters when one filter is applied
    if (filterType !== 'name') setNameFilter('');
    if (filterType !== 'email') setEmailFilter('');
    if (filterType !== 'gender') setGenderFilter('');

    let url = 'https://dummyjson.com/users';
    if (filterType === 'name') url = `${url}/search?q=${filterValue}`;
    if (filterType === 'email') url = `${url}/search?q=${filterValue}`;
    if (filterType === 'gender') {
      url = `${url}/filter?key=gender&value=${filterValue}`; // Correct gender filter endpoint
    }

    try {
      const response = await axios.get(url);
      // Set the filtered users or fallback to an empty array
      setFilteredUsers(response.data.users || []);
    } catch (error) {
      console.error('Error fetching filtered users:', error);
      setFilteredUsers([]); // Clear filtered users on error
    }
  };

  const handleGenderChange = (e) => {
    const selectedGender = e.target.value;
    setGenderFilter(selectedGender);
    applyFilter('gender', selectedGender);
  };

  const handleSearch = (searchTerm) => {
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    const filtered = users.filter(user => {
      return (
        user.firstName.toLowerCase().includes(lowerCaseSearchTerm) ||
        user.lastName.toLowerCase().includes(lowerCaseSearchTerm) ||
        user.email.toLowerCase().includes(lowerCaseSearchTerm) ||
        user.username.toLowerCase().includes(lowerCaseSearchTerm) ||
        user.bloodGroup.toLowerCase().includes(lowerCaseSearchTerm) ||
        user.eyeColor.toLowerCase().includes(lowerCaseSearchTerm) ||
        user.age.toString().includes(lowerCaseSearchTerm)
      );
    });
    setFilteredUsers(filtered);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-neutra mb-4">Users</h1>

      {/* Filters and Search Bar in One Row */}
      <div className="flex items-center space-x-4 mb-4">
        <PageSizeDropdown />
        <SearchBar onSearch={handleSearch} />

        {/* Filters UI */}
        <div className="relative inline-block mr-4">
          <div className="flex items-center">
            <span>Name</span>
            <button onClick={() => setShowNameFilter(!showNameFilter)}>
              <i className="ml-2 text-sm">▼</i>
            </button>
          </div>
          {showNameFilter && (
            <input
              type="text"
              placeholder="Filter by Name"
              className="mt-2 border border-gray-300 p-2"
              value={nameFilter}
              onChange={(e) => {
                setNameFilter(e.target.value);
                applyFilter('name', e.target.value);
              }}
            />
          )}
        </div>

        <div className="relative inline-block mr-4">
          <div className="flex items-center">
            <span>Email</span>
            <button onClick={() => setShowEmailFilter(!showEmailFilter)}>
              <i className="ml-2 text-sm">▼</i>
            </button>
          </div>
          {showEmailFilter && (
            <input
              type="text"
              placeholder="Filter by Email"
              className="mt-2 border border-gray-300 p-2"
              value={emailFilter}
              onChange={(e) => {
                setEmailFilter(e.target.value);
                applyFilter('email', e.target.value);
              }}
            />
          )}
        </div>

        <div className="inline-block">
          <label htmlFor="genderFilter" className="mr-2">Gender</label>
          <select
            id="genderFilter"
            className="border border-gray-300 p-2"
            value={genderFilter}
            onChange={handleGenderChange}
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>
      </div>

      {/* Render the user data in a table */}
      <div className="overflow-x-auto">
        <table className="min-w-full border border-grey">
          <thead className="bg-blue text-white">
            <tr>
              <th className="px-4 py-2 text-center">First Name</th>
              <th className="px-4 py-2 text-center">Last Name</th>
              <th className="px-4 py-2 text-center">Maiden Name</th>
              <th className="px-4 py-2 text-center">Age</th>
              <th className="px-4 py-2 text-center">Gender</th>
              <th className="px-4 py-2 text-center">Email</th>
              <th className="px-4 py-2 text-center">Username</th>
              <th className="px-4 py-2 text-center">Blood Group</th>
              <th className="px-4 py-2 text-center">Eye Color</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map(user => (
              <tr key={user.id} className="border-t hover:bg-grey transition duration-300">
                <td className="px-4 py-2 text-center border border-grey">{user.firstName}</td>
                <td className="px-4 py-2 text-center border border-grey">{user.lastName}</td>
                <td className="px-4 py-2 text-center border border-grey">{user.maidenName}</td>
                <td className="px-4 py-2 text-center border border-grey">{user.age}</td>
                <td className="px-4 py-2 text-center border border-grey">{user.gender}</td>
                <td className="px-4 py-2 text-center border border-grey">{user.email}</td>
                <td className="px-4 py-2 text-center border border-grey">{user.username}</td>
                <td className="px-4 py-2 text-center border border-grey">{user.bloodGroup}</td>
                <td className="px-4 py-2 text-center border border-grey">{user.eyeColor}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination in the same row as filters and search bar */}
      <div className="mt-4 flex justify-end">
        <Pagination totalItems={totalUsers} currentPage={currentPage} setCurrentPage={setCurrentPage} />
      </div>
    </div>
  );
};

export default UserList;
