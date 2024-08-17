import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { sortData } from '../Util/sort';

const RejectedPoliciesTable = ({ setActiveTable }) => {
  const [rejectedPolicies, setRejectedPolicies] = useState([]);
  const [filteredPolicies, setFilteredPolicies] = useState([]);
  const [sortBy, setSortBy] = useState('dataPolicyName');
  const [sortDirection, setSortDirection] = useState('asc');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPolicies = async () => {
      try {
        const response = await axios.get('http://localhost:8080/policies/ByStatus?status=REJECTED');
        setRejectedPolicies(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch policies');
        setLoading(false);
      }
    };

    fetchPolicies();
  }, []);

  const handleSort = (field) => {
    const direction = sortBy === field && sortDirection === 'asc' ? 'desc' : 'asc';
    setSortBy(field);
    setSortDirection(direction);
    setRejectedPolicies(sortData(rejectedPolicies, field, direction));
  };

  const handleFilterByDate = () => {
    const selectedDate = document.getElementById('filter-date').value;
    const filtered = rejectedPolicies.filter(policy => policy.dataPolicyLastModified.slice(0, 10) === selectedDate);
    setFilteredPolicies(filtered);
  };

  const handleResetFilter = () => {
    setFilteredPolicies([]);
  };

  const policiesToDisplay = filteredPolicies.length > 0 ? filteredPolicies : rejectedPolicies;

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="policy-table">
      <h2>Rejected Policies Overview</h2>
      <div className="archive-policies">
        <div className="filter-options">
          <label htmlFor="filter-date">Filter by Date</label>
          <input type="date" id="filter-date" name="filter-date"  className='cale'/>
          <button onClick={handleFilterByDate} className='view'>View</button>
          <button onClick={handleResetFilter} className='view'>Reset Filter</button>
        </div>
      </div>
      <br></br>
      <table>
        <thead>
          <tr>
            <th onClick={() => handleSort('dataPolicyName')}>Policy Name</th>
            <th onClick={() => handleSort('dataPolicyActionReason')}>Description</th>
            <th onClick={() => handleSort('dataPolicyExaminer')}>Rejected By</th>
            <th onClick={() => handleSort('dataPolicyLastModified')}>Last Updated</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {policiesToDisplay.map((policy, index) => (
            <tr key={index}>
              <td>{policy.dataPolicyName}</td>
              <td>{policy.dataPolicyActionReason}</td>
              <td>{policy.dataPolicyExaminer}</td>
              <td>{policy.dataPolicyLastModified.slice(0, 10)}</td>
              <td>
                {/* If you have specific actions, you can handle them here */}
                <button>View</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RejectedPoliciesTable;
