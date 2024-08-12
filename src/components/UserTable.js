import React, { useState } from 'react';
import { sortData } from '../Util/sort'; // Import your sorting function

const UserTable = () => {
  const initialUsers = [
    { id: 1, name: 'Shashwat sirjam', role: 'Admin', email: 'Shashwat@sc.com', lastLogin: '2022-10-01', actions: ['Edit', 'Delete'] },
    { id: 2, name: 'Mansi', role: 'Creator', email: 'Mansi@sc.com', lastLogin: '2022-09-28', actions: ['Edit', 'Delete'] },
    { id: 3, name: 'Sourabh', role: 'Approver', email: 'Sourabh@sc.com', lastLogin: '2022-10-01', actions: ['Edit', 'Delete'] },
    { id: 4, name: 'Shankar', role: 'User', email: 'Shankar@sc.com', lastLogin: '2022-10-01', actions: ['Edit', 'Delete'] },
    { id: 5, name: 'Jayan', role: 'User', email: 'Jayan@sc.com', lastLogin: '2022-10-01', actions: ['Edit', 'Delete'] },
  ];

  const [users, setUsers] = useState(initialUsers);
  const [sortedUsers, setSortedUsers] = useState([]);
  const [sortBy, setSortBy] = useState('name');
  const [sortDirection, setSortDirection] = useState('asc');
  const [editIndex, setEditIndex] = useState(-1); // Track the index of the user being edited
  const [selectedRole, setSelectedRole] = useState(''); // Track the selected role for editing

  // Function to handle sorting
  const handleSort = (field) => {
    const direction = sortBy === field && sortDirection === 'asc' ? 'desc' : 'asc';
    setSortBy(field);
    setSortDirection(direction);
    setSortedUsers(sortData(users, field, direction));
  };

  // Function to delete a user
  const handleDelete = (id) => {
    const updatedUsers = users.filter(user => user.id !== id);
    setUsers(updatedUsers);
    setSortedUsers(sortData(updatedUsers, sortBy, sortDirection)); // Update sorted users if necessary
  };

  // Function to toggle edit mode for a user
  const toggleEdit = (index) => {
    setEditIndex(index === editIndex ? -1 : index); // Toggle edit mode
    if (index !== editIndex) {
      setSelectedRole(users[index].role); // Set selected role when entering edit mode
    } else {
      setSelectedRole(''); // Reset selected role when exiting edit mode
    }
  };

  // Function to save changes for a user
  const saveChanges = (index) => {
    const updatedUsers = [...users];
    updatedUsers[index].role = selectedRole; // Update user role with selected role
    setUsers(updatedUsers);
    setEditIndex(-1); // Exit edit mode
    // Additional logic (e.g., API calls) can be added here
  };

  // Determine which array to display (sorted or original)
  const usersToDisplay = sortedUsers.length > 0 ? sortedUsers : users;

  return (
    <div className="policy-table">
      <h2>User Management Overview</h2>
      <table>
        <thead>
          <tr>
            <th onClick={() => handleSort('name')}>Name</th>
            <th onClick={() => handleSort('role')}>Role</th>
            <th onClick={() => handleSort('email')}>Email</th>
            <th onClick={() => handleSort('lastLogin')}>Last Login</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {usersToDisplay.map((user, index) => (
            <tr key={index}>
              <td>{user.name}</td>
              <td>
                {editIndex === index ? (
                  <select value={selectedRole} onChange={(e) => setSelectedRole(e.target.value)}>
                    <option value="Admin">Admin</option>
                    <option value="User">User</option>
                    <option value="Creator">Creator</option>
                    <option value="Approver">Approver</option>
                  </select>
                ) : (
                  user.role
                )}
              </td>
              <td>{user.email}</td>
              <td>{user.lastLogin}</td>
              <td>
                {user.actions.map((action, idx) => (
                  <button key={idx} onClick={() => {
                    if (action === 'Delete') {
                      handleDelete(user.id); // Call delete function on click
                    } else if (action === 'Edit') {
                      toggleEdit(index); // Toggle edit mode on click
                    }
                  }}>{action}</button>
                ))}
                {editIndex === index && (
                  <button onClick={() => saveChanges(index)}>Save</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
