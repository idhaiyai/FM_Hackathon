import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../Style/ApprovalTable.css'; // Adjust the path as necessary

const PolicyApprovalTable = () => {
  const [policies, setPolicies] = useState([]);
  const [selectedPolicy, setSelectedPolicy] = useState(null);
  const [approvalReason, setApprovalReason] = useState('');
  const [action, setAction] = useState('');
  const [showApprovalPopup, setShowApprovalPopup] = useState(false);

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
    setSelectedPolicy(policy);
    setAction('approve');
    setShowApprovalPopup(true);
  };

  const submitAction = () => {
    const url = 'http://localhost:8080/policies/approve/669c9aa467df1ff4bf58cb2c'; // Update endpoint as needed
    const requestBody = {
      approve: action === 'approve',
      reason: approvalReason,
      policy_id: selectedPolicy.id // Adjust this to match your API's expected field
    };

    axios.post(url, requestBody)
      .then(response => {
        console.log(action === 'approve' ? 'Policy approved:' : 'Policy rejected:', response.data);
        setPolicies(policies.filter(p => p.id !== selectedPolicy.id));
        setApprovalReason('');
        setAction('');
        setShowApprovalPopup(false);
        setSelectedPolicy(null);
      })
      .catch(error => {
        console.error('There was an error submitting the policy action!', error);
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
            <tr key={policy.id}>
              <td>{policy.dataPolicyName}</td>
              <td>{policy.dataPolicyDescription}</td>
              <td>{policy.dataPolicyCreator}</td>
              <td>{new Date(policy.dataPolicyLastModified).toLocaleDateString()}</td>
              <td>
                <button onClick={() => handleApprove(policy)}>Approve</button>
                <button onClick={() => {
                  setSelectedPolicy(policy);
                  setAction('reject');
                  setShowApprovalPopup(true);
                }}>Reject</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showApprovalPopup && (
        <div className="popup">
          <div className="popup-content">
            <h2>{action === 'approve' ? 'Approve Policy' : 'Reject Policy'}</h2>
            <button onClick={() => {
              setShowApprovalPopup(false);
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
                submitAction();
              } else {
                alert('Please provide a reason.');
              }
            }}>Submit</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PolicyApprovalTable;
