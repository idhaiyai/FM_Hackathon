import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../Style/ApprovalTable.css'; // Adjust the path as necessary

const PolicyApprovalTable = () => {
  const [policies, setPolicies] = useState([]);
  const [selectedPolicy, setSelectedPolicy] = useState(null);
  const [approvalReason, setApprovalReason] = useState('');
  const [action, setAction] = useState('');

  useEffect(() => {
    // Fetch policies with WIP status
    axios.get('http://localhost:8080/policies/ByStatus?status=WIP')
      .then(response => {
        console.log('Fetched WIP policies:', response.data);
        setPolicies(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the WIP policies!', error);
      });
  }, []);

  const handleApprove = (policy) => {
    const creatorId = policy.id;
    const approverId = '669c9aa467df1ff4bf58cb2c';
    const url = `http://localhost:8080/policies/approve/${creatorId}/${approverId}?approve=true`;

    axios.post(url, {})
      .then(response => {
        console.log('Policy approved:', response.data);
        setPolicies(policies.filter(p => p.dataPolicyId !== policy.dataPolicyId));
      })
      .catch(error => {
        console.error('There was an error approving the policy!', error);
      });
  };

  const handleReject = (policy) => {
    const creatorId = policy.id;
    const approverId = '669c9aa467df1ff4bf58cb2c';
    const url = `http://localhost:8080/policies/approve/${creatorId}/${approverId}?approve=false`;

    axios.post(url, { reason: approvalReason })
      .then(response => {
        console.log('Policy rejected:', response.data);
        setPolicies(policies.filter(p => p.dataPolicyId !== policy.dataPolicyId));
        setApprovalReason('');
      })
      .catch(error => {
        console.error('There was an error rejecting the policy!', error);
      });
  };

  return (
    <div className="policy-approval-table">
      <h2>Policy Approval & Rejection</h2>
      <table>
        <thead>
          <tr>
            <th>Policy Name</th>
            <th>Description</th>
            <th>Created By</th>
            <th>Last Updated</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {policies.map((policy) => (
            <tr key={policy.dataPolicyId}>
              <td>{policy.dataPolicyName}</td>
              <td>{policy.dataPolicyDescription}</td>
              <td>{policy.dataPolicyCreator}</td>
              <td>{new Date(policy.dataPolicyLastModified).toLocaleDateString()}</td>
              <td>
                <button onClick={() => handleApprove(policy)}>Approve</button>
                <button onClick={() => {
                  setSelectedPolicy(policy);
                  setAction('reject');
                }}>Reject</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {action === 'reject' && selectedPolicy && (
        <div className="popup">
          <div className="popup-content">
            <h2>Reject Policy</h2>
            <button onClick={() => {
              setAction('');
              setSelectedPolicy(null);
            }}>Close</button>
            <div>
              <label>Reason:</label>
              <textarea
                value={approvalReason}
                onChange={(e) => setApprovalReason(e.target.value)}
              />
            </div>
            <button onClick={() => {
              if (approvalReason.trim() !== '') {
                handleReject(selectedPolicy);
              } else {
                alert('Please provide a reason for rejection.');
              }
            }}>Submit</button>
          </div>
        </div>
      )}
    </div>

    
  );
};

export default PolicyApprovalTable;
