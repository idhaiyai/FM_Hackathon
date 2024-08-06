import React, { useState } from 'react';
import { sortData } from '../Util/sort';

const RejectedPoliciesTable = ({ setActiveTable }) => {
  const initialRejectedPolicies = [
    { name: 'Access Control', description: 'Control user access', rejectedBy: 'Mansi', lastUpdated: '2022-10-01', actions: ['View'] },
    { name: 'Data Encryption', description: 'Encrypt sensitive data', rejectedBy: 'Saurabh', lastUpdated: '2022-09-28', actions: ['View'] },
    { name: 'User Permissions', description: 'Manage user entitlements', rejectedBy: 'Praneeth', lastUpdated: '2022-09-30', actions: ['View'] },
    { name: 'Audit Trail', description: 'Track user actions', rejectedBy: 'Mansi', lastUpdated: '2022-10-02', actions: ['View'] },
    { name: 'Password Policy', description: 'Enforce password rules', rejectedBy: 'Saurabh', lastUpdated: '2022-10-05', actions: ['View'] },
    { name: 'Backup Policy', description: 'Regular data backups', rejectedBy: 'Praneeth', lastUpdated: '2022-10-03', actions: ['View'] },
    { name: 'Security Updates', description: 'Apply system patches', rejectedBy: 'Mansi', lastUpdated: '2022-10-04', actions: ['View'] },
    { name: 'Access Control', description: 'Control user access', rejectedBy: 'Mansi', lastUpdated: '2022-10-01', actions: ['View'] },
    { name: 'Data Encryption', description: 'Encrypt sensitive data', rejectedBy: 'Saurabh', lastUpdated: '2022-09-28', actions: ['View'] },
    { name: 'User Permissions', description: 'Manage user entitlements', rejectedBy: 'Praneeth', lastUpdated: '2022-09-30', actions: ['View'] },
    { name: 'Audit Trail', description: 'Track user actions', rejectedBy: 'Mansi', lastUpdated: '2022-10-02', actions: ['View'] },
    { name: 'Password Policy', description: 'Enforce password rules', rejectedBy: 'Saurabh', lastUpdated: '2022-10-05', actions: ['View'] },
    { name: 'Backup Policy', description: 'Regular data backups', rejectedBy: 'Praneeth', lastUpdated: '2022-10-03', actions: ['View'] },
    { name: 'Security Updates', description: 'Apply system patches', rejectedBy: 'Mansi', lastUpdated: '2022-10-04', actions: ['View'] },
  ];


  const [rejectedPolicies, setRejectedPolicies] = useState(initialRejectedPolicies);
  const [filteredPolicies, setFilteredPolicies] = useState([]);
  const [sortBy, setSortBy] = useState('name');
  const [sortDirection, setSortDirection] = useState('asc');

  const handleSort = (field) => {
    const direction = sortBy === field && sortDirection === 'asc' ? 'desc' : 'asc';
    setSortBy(field);
    setSortDirection(direction);
    setRejectedPolicies(sortData(rejectedPolicies, field, direction));
  };

  const handleFilterByDate = () => {
    const selectedDate = document.getElementById('filter-date').value;
    const filtered = initialRejectedPolicies.filter(policy => policy.lastUpdated === selectedDate);
    setFilteredPolicies(filtered);
  };

  const handleResetFilter = () => {
    setFilteredPolicies([]);
  };

  const policiesToDisplay = filteredPolicies.length > 0 ? filteredPolicies : rejectedPolicies;

  return (
    <div className="policy-table">
      <h2>Rejected Policies Overview</h2>
      <div className="archive-policies">
        <div className="filter-options">
          <label htmlFor="filter-date">Filter by Date</label>
          <input type="date" id="filter-date" name="filter-date" />
          <button onClick={handleFilterByDate}>View</button>
          <button onClick={handleResetFilter}>Reset Filter</button>
        </div>
      </div>
      <table>
        <thead>
          <tr>
            <th onClick={() => handleSort('name')}>Policy Name</th>
            <th onClick={() => handleSort('description')}>Description</th>
            <th onClick={() => handleSort('rejectedBy')}>Rejected By</th>
            <th onClick={() => handleSort('lastUpdated')}>Last Updated</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {policiesToDisplay.map((policy, index) => (
            <tr key={index}>
              <td>{policy.name}</td>
              <td>{policy.description}</td>
              <td>{policy.rejectedBy}</td>
              <td>{policy.lastUpdated}</td>
              <td>
                {policy.actions.map((action, idx) => (
                  <button key={idx}>{action}</button>
                ))}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RejectedPoliciesTable;
