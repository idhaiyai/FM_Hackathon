import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { sortData } from '../Util/sort'; // Adjust path if needed

const UserDataTable = () => {
  const [data, setData] = useState([]);
  const [sortBy, setSortBy] = useState('reporterISO3');
  const [sortDirection, setSortDirection] = useState('asc');

  useEffect(() => {
    axios.get('http://localhost:8080/data/669c9aa467df1ff4bf58cb2e') // Ensure this URL is correct
      .then(response => {
        console.log('Fetched user data:', response.data);
        setData(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the data!', error);
      });
  }, []);

  const handleSort = (field) => {
    const direction = sortBy === field && sortDirection === 'asc' ? 'desc' : 'asc';
    setSortBy(field);
    setSortDirection(direction);
    setData(sortData(data, field, direction)); // Assume sortData is defined elsewhere
  };

  return (
    <div className="user-data-table">
      <h2>User Data Overview</h2>
      <table>
        <thead>
          <tr>
            <th onClick={() => handleSort('_id')}>ID</th>
            <th onClick={() => handleSort('reporterISO3')}>Reporter ISO3</th>
            <th onClick={() => handleSort('reporterName')}>Reporter Name</th>
            <th onClick={() => handleSort('partnerISO3')}>Partner ISO3</th>
            <th onClick={() => handleSort('partnerName')}>Partner Name</th>
            <th onClick={() => handleSort('year')}>Year</th>
            <th onClick={() => handleSort('tradeFlowName')}>Trade Flow Name</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td>{item._id}</td>
              <td>{item.reporterISO3}</td>
              <td>{item.reporterName}</td>
              <td>{item.partnerISO3}</td>
              <td>{item.partnerName}</td>
              <td>{item.year}</td>
              <td>{item.tradeFlowName}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserDataTable;
