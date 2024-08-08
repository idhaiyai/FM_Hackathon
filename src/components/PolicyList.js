import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../Style/PolicyList.css';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import { Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const PolicyList = () => {
  const [policies, setPolicies] = useState([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [newPolicyName, setNewPolicyName] = useState('');
  const [newPolicyID, setNewPolicyID] = useState('');
  const [rules, setRules] = useState([{ key: '', operator: '', values: '' }]);

  useEffect(() => {
    // Fetch policies by examiner
    axios.get('http://localhost:8080/policies/ByExaminer?examiner=669c9aa467df1ff4bf58cb2c')
      .then(response => {
        console.log('Fetched policies:', response.data);
        setPolicies(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the policies!', error);
      });
  }, []);

  const handleAddRule = () => {
    setRules([...rules, { key: '', operator: '', values: '' }]);
  };

  const handleRemoveRule = (index) => {
    const newRules = [...rules];
    newRules.splice(index, 1);
    setRules(newRules);
  };

  const handleSavePolicy = () => {
    const policyData = {
      dataPolicyId: newPolicyID,
      dataPolicyName: newPolicyName,
      dataPolicy: [
        {
          operator: "and", // Assuming "and" is the operator for this case; adjust as needed
          rules: rules.map(rule => ({
            key: rule.key,
            operator: rule.operator,
            values: rule.values.split(',').map(value => value.trim()) // Assuming values are comma-separated
          }))
        }
      ]
    };

    axios.post('http://localhost:8080/policies/create/669c9aa467df1ff4bf58cb2b', policyData)
      .then(response => {
        console.log('Policy saved successfully:', response.data);
        setPolicies([...policies, { name: newPolicyName }]); // Optionally add to local state
        setIsPopupOpen(false);
        setNewPolicyName('');
        setNewPolicyID('');
        setRules([{ key: '', operator: '', values: '' }]);
      })
      .catch(error => {
        console.error('There was an error saving the policy:', error);
      });
  };

  const handleViewPolicy = (policy) => {
    const policyJson = JSON.stringify(policy, null, 2);
    const newWindow = window.open();
    newWindow.document.write('<pre>' + policyJson + '</pre>');
  };

  return (
    <>
      <Typography variant="h5" component="h2" gutterBottom sx={{ marginTop: 4, marginBottom: 2 }}>
        Policy Creation Overview
      </Typography>
      {/* <button className="create-policy-button" onClick={() => setIsPopupOpen(true)}>Create Policy</button> */}
      <Button variant="contained" className="create-policy-button" onClick={() => setIsPopupOpen(true)} sx={{ marginTop: 4, marginBottom: 2 }}>
      Create Policy
      </Button>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              
              <StyledTableCell >Policy Name</StyledTableCell>
              
              <StyledTableCell>Actions</StyledTableCell>
            </TableRow>
          </TableHead>
          
          <TableBody>
            {policies.map((policy, index) => (
              <StyledTableRow key={index}>
                <StyledTableCell component="th" scope="row">
                  {policy.dataPolicyName}
                </StyledTableCell>
                
                
                <StyledTableCell>
                  <Button variant="contained" size="small" onClick={() => handleViewPolicy(policy)}>
                    View
                  </Button>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* <table>
        <thead>
          <tr>
            <th>Policy Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {policies.map((policy, index) => (
            <tr key={index}>
              <td>{policy.dataPolicyName}</td>
              <td>
                <button onClick={() => handleViewPolicy(policy)}>View</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table> */}
      {isPopupOpen && (
        <div className="popup">
          <div className="popup-content">
            <h2>Create/Edit Policy</h2>
            <button onClick={() => setIsPopupOpen(false)}>Back to List</button>
            <div>
              <label>Policy ID:</label>
              <input
                type="text"
                value={newPolicyID}
                onChange={(e) => setNewPolicyID(e.target.value)}
              />
            </div>
            <div>
              <label>Policy Name:</label>
              <input
                type="text"
                value={newPolicyName}
                onChange={(e) => setNewPolicyName(e.target.value)}
              />
            </div>
            <div>
              <label>Data Policy:</label>
            </div>
            {rules.map((rule, index) => (
              <div key={index} className="rule">
                <label>Rule:</label>
                <div>
                  <label>Key:</label>
                  <input
                    type="text"
                    value={rule.key}
                    onChange={(e) => {
                      const newRules = [...rules];
                      newRules[index].key = e.target.value;
                      setRules(newRules);
                    }}
                  />
                </div>
                <div>
                  <label>Operator:</label>
                  <input
                    type="text"
                    value={rule.operator}
                    onChange={(e) => {
                      const newRules = [...rules];
                      newRules[index].operator = e.target.value;
                      setRules(newRules);
                    }}
                  />
                </div>
                <div>
                  <label>Values:</label>
                  <input
                    type="text"
                    value={rule.values}
                    onChange={(e) => {
                      const newRules = [...rules];
                      newRules[index].values = e.target.value;
                      setRules(newRules);
                    }}
                  />
                </div>
                <button onClick={() => handleRemoveRule(index)}>Remove Rule</button>
              </div>
            ))}
            <button onClick={handleAddRule}>Add Rule</button>
            <button onClick={handleSavePolicy}>Save Policy</button>
          </div>
        </div>
      )}
    </>
  );
};

export default PolicyList;
