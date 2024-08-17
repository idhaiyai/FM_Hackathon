import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { sortData } from '../Util/sort';

const PolicyTable = () => {
  const [policies, setPolicies] = useState([]);
  const [sortBy, setSortBy] = useState('dataPolicyName');
  const [sortDirection, setSortDirection] = useState('asc');

  useEffect(() => {
    // Fetch data from the API
    axios.get('http://localhost:8080/policies/working-policies')
      .then(response => {
        console.log('Fetched policies data:', response.data);
        setPolicies(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the data!', error);
      });
  }, []);

  const handleSort = (field) => {
    const direction = sortBy === field && sortDirection === 'asc' ? 'desc' : 'asc';
    setSortBy(field);
    setSortDirection(direction);
    setPolicies(sortData(policies, field, direction)); // Assume sortData is defined elsewhere
  };

  const handleViewClick = (id) => {
    if (id) {
      // Fetch the policy data using the id and open in a new tab
      axios.get(`http://localhost:8080/policies/unique/${id}`)
        .then(response => {
          const policyData = response.data;
          // Open a new window with the policy data
          const newWindow = window.open('', '_blank');
          if (newWindow) {
            newWindow.document.write(`
              <html>
                <head><title>Policy Detail</title></head>
                <body>
                  <h2>Policy Detail</h2>
                  <p><strong>Policy ID:</strong> ${policyData.dataPolicyId}</p>
                  <p><strong>Policy Name:</strong> ${policyData.dataPolicyName}</p>
                  <p><strong>Version:</strong> ${policyData.dataPolicyVersion}</p>
                  <p><strong>Region:</strong> ${policyData.dataPolicyRegion}</p>
                  <p><strong>Last Modified:</strong> ${policyData.dataPolicyLastModified}</p>
                  <p><strong>Status:</strong> ${policyData.dataPolicyStatus}</p>
                  <p><strong>Creator:</strong> ${policyData.dataPolicyCreator}</p>
                  <p><strong>Examiner:</strong> ${policyData.dataPolicyExaminer}</p>
                  <div>
                    <strong>Data Policy:</strong>
                    ${policyData.dataPolicy.map((policyItem, index) => `
                      <div key=${index}>
                        <p>Operator: ${policyItem.operator}</p>
                        ${policyItem.rules.map((rule, ruleIndex) => `
                          <div key=${ruleIndex}>
                            <p>Key: ${rule.key}</p>
                            <p>Operator: ${rule.operator}</p>
                            <p>Values: ${rule.values.join(', ')}</p>
                          </div>
                        `).join('')}
                      </div>
                    `).join('')}
                  </div>
                </body>
              </html>
            `);
            newWindow.document.close();
          } else {
            console.error('Failed to open new window');
          }
        })
        .catch(error => {
          console.error('There was an error fetching the policy details!', error);
        });
    } else {
      console.error('Invalid id:', id);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const formattedDate = date.toISOString().replace('T', ' ').replace(/\..+/, '') + ' UTC';
    return formattedDate;
  };

  return (
    <div className="policy-table">
      <h2>Policy Management Overview</h2>
      
      <table>
        <thead>
          <tr>
            <th onClick={() => handleSort('dataPolicyId')}>ID</th>
            <th onClick={() => handleSort('dataPolicyName')}>Policy Name</th>
            <th onClick={() => handleSort('dataPolicyVersion')}>Version</th>
            <th onClick={() => handleSort('dataPolicyLastModified')}>Last Modified</th>
            <th onClick={() => handleSort('dataPolicyCreator')}>Creator</th>
            <th onClick={() => handleSort('dataPolicyExaminer')}>Approver</th>
            <th onClick={() => handleSort('dataPolicyStatus')}>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {policies.map((policy, index) => (
            <tr key={index}>
              <td>{policy.dataPolicyId}</td>
              <td>{policy.dataPolicyName}</td>
              <td>{policy.dataPolicyVersion}</td>
              <td>{formatDate(policy.dataPolicyLastModified)}</td>
              <td>{policy.dataPolicyCreator}</td>
              <td>{policy.dataPolicyExaminer}</td>
              <td>{policy.dataPolicyStatus}</td>
              <td>
                <button onClick={() => handleViewClick(policy.id)}>View</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PolicyTable;
