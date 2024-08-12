import React, { useState } from 'react';
import { sortData } from '../Util/sort'; // Import your sorting function

const RoleTable = () => {
  const initialRoles = [
    { name: 'Admin', description: 'Full access to all resources', createdBy: 'System', actions: ['Edit', 'Delete'] },
    { name: 'User', description: 'Limited access to resources', createdBy: 'System', actions: ['Edit', 'Delete'] },
    { name: 'Creator', description: 'Full access to all resources', createdBy: 'System', actions: ['Edit', 'Delete'] },
    { name: 'Approver', description: 'Limited access to resources', createdBy: 'System', actions: ['Edit', 'Delete'] },
  ];

  const [roles, setRoles] = useState(initialRoles);
  const [sortedRoles, setSortedRoles] = useState([]);
  const [sortBy, setSortBy] = useState('name');
  const [sortDirection, setSortDirection] = useState('asc');
  const [editIndex, setEditIndex] = useState(-1); // State to track which role is being edited
  const [permissions, setPermissions] = useState({
    edit: false,
    upload: false,
    view: false
  }); // State to manage permissions

  // Function to handle sorting
  const handleSort = (field) => {
    const direction = sortBy === field && sortDirection === 'asc' ? 'desc' : 'asc';
    setSortBy(field);
    setSortDirection(direction);
    setSortedRoles(sortData(roles, field, direction));
  };

  // Function to delete a role
  const handleDelete = (index) => {
    // Create a new array of roles excluding the role at the specified index
    const updatedRoles = [...roles];
    updatedRoles.splice(index, 1); // Remove the role at index
    setRoles(updatedRoles); // Update the roles state
    setSortedRoles(sortData(updatedRoles, sortBy, sortDirection)); // Update sorted roles if necessary
  };

  // Function to toggle edit mode and open modal for permissions
  const toggleEdit = (index) => {
    setEditIndex(index === editIndex ? -1 : index); // Toggle edit mode
    if (index !== editIndex) {
      // Reset permissions for new edit
      setPermissions({
        edit: false,
        upload: false,
        view: false
      });
    }
  };

  // Function to save changes and update role
  const saveChanges = (index) => {
    const updatedRoles = [...roles];
    updatedRoles[index].createdBy = 'Admin'; // Update createdBy to 'Admin'
    updatedRoles[index].permissions = permissions; // Update permissions
    setRoles(updatedRoles);
    setEditIndex(-1); // Exit edit mode
    // Additional logic (e.g., API calls) can be added here
  };

  // Handle input change for editing fields
  const handleInputChange = (e, index, field) => {
    const updatedRoles = [...roles];
    updatedRoles[index][field] = e.target.value;
    setRoles(updatedRoles);
  };

  // Determine which array to display (sorted or original)
  const rolesToDisplay = sortedRoles.length > 0 ? sortedRoles : roles;

  return (
    <div className="policy-table">
      <h2>Role Management Overview</h2>
      <table>
        <thead>
          <tr>
            <th onClick={() => handleSort('name')}>Role Name</th>
            <th onClick={() => handleSort('description')}>Description</th>
            <th onClick={() => handleSort('createdBy')}>Created By</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {rolesToDisplay.map((role, index) => (
            <tr key={index}>
              <td>{editIndex === index ? <input type="text" value={role.name} onChange={(e) => handleInputChange(e, index, 'name')} /> : role.name}</td>
              <td>{editIndex === index ? <input type="text" value={role.description} onChange={(e) => handleInputChange(e, index, 'description')} /> : role.description}</td>
              <td>{role.createdBy}</td>
              <td>
                {editIndex === index ? (
                  <>
                    <label>
                      Edit <input type="checkbox" checked={permissions.edit} onChange={(e) => setPermissions({ ...permissions, edit: e.target.checked })} />
                    </label>
                    <label>
                      Upload <input type="checkbox" checked={permissions.upload} onChange={(e) => setPermissions({ ...permissions, upload: e.target.checked })} />
                    </label>
                    <label>
                      View <input type="checkbox" checked={permissions.view} onChange={(e) => setPermissions({ ...permissions, view: e.target.checked })} />
                    </label>
                    <button onClick={() => saveChanges(index)}>Save</button>
                  </>
                ) : (
                  <>
                    <button onClick={() => toggleEdit(index)}>Edit</button>
                    <button onClick={() => handleDelete(index)}>Delete</button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RoleTable;
