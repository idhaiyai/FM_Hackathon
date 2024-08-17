import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { sortData } from '../Util/sort'; // Ensure sortData function handles sorting correctly

const ArchiveTable = () => {
  const [archivedPolicies, setArchivedPolicies] = useState([]);
  const [filteredPolicies, setFilteredPolicies] = useState([]);
  const [sortBy, setSortBy] = useState('dataPolicyName');
  const [sortDirection, setSortDirection] = useState('asc');
  const [selectedDate, setSelectedDate] = useState('');

  useEffect(() => {
    // Fetch archived policies from backend
    axios.get('http://localhost:8080/policies/archive')
      .then(response => {
        console.log('Fetched archived policies data:', response.data);
        setArchivedPolicies(response.data);
        setFilteredPolicies(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the archived policies data!', error);
      });
  }, []);

  const handleSort = (field) => {
    const direction = sortBy === field && sortDirection === 'asc' ? 'desc' : 'asc';
    setSortBy(field);
    setSortDirection(direction);
    setFilteredPolicies(sortData(archivedPolicies, field, direction));
  };

  const handleFilterByDate = () => {
    const filtered = archivedPolicies.filter(policy => {
      const policyDate = policy.dataPolicyLastModified.split('T')[0]; // Extract date part only
      return policyDate === selectedDate;
    });
    setFilteredPolicies(filtered);
  };

  const handleResetFilter = () => {
    setFilteredPolicies(archivedPolicies);
    setSelectedDate('');
  };

  const formatDate = (dateStr) => {
    if (dateStr) {
      return new Date(dateStr).toLocaleDateString(); // Adjust format as needed
    }
    return '';
  };

  return (
    <div className="policy-table"> {/* Use the same class as PolicyTable */}
      <h2>Archived Policies Overview</h2>
      <div className="archive-policies">
        <div className="filter-options">
          <label htmlFor="filter-date-archive">Filter by Date</label>
          <input
            type="date"
            id="filter-date-archive"
            name="filter-date-archive"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className='cale'

          />  
          <button onClick={handleFilterByDate} className='view' >View</button>
          <button onClick={handleResetFilter} className='view'>Reset Filter</button>
        </div>
      </div>
      <br></br>
      <table>
        <thead>
          <tr>
            <th onClick={() => handleSort('dataPolicyName')}>Policy Name</th>
            <th onClick={() => handleSort('dataPolicyCreator')}>Created By</th>
            <th onClick={() => handleSort('dataPolicyLastModified')}>Last Updated</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredPolicies.map((policy, index) => (
            <tr key={index}>
              <td>{policy.dataPolicyName}</td>
              <td>{policy.dataPolicyExaminer}</td>
              <td>{formatDate(policy.dataPolicyLastModified)}</td>
              <td>
                <button onClick={() => window.open(`http://localhost:8080/policies/${policy.dataPolicyId}`, '_blank')}>View</button>
                {/* Add more action buttons as needed */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ArchiveTable;
