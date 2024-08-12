import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../Style/PolicyList.css';

const PolicyList = () => {
  const [policies, setPolicies] = useState([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [newPolicyName, setNewPolicyName] = useState('');
  const [dataPolicyId, setDataPolicyId] = useState('');
  const [dataPolicyRegion, setDataPolicyRegion] = useState(''); // Added state for region
  const [rules, setRules] = useState([{ key: '', operator: '', values: '' }]);
  const [editingPolicy, setEditingPolicy] = useState(null);

  useEffect(() => {
    // Fetch policies by examiner
    axios.get('http://localhost:8080/policies/ByCreator?creator=2013300')
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
      dataPolicyName: newPolicyName,
      dataPolicyId: dataPolicyId,
      dataPolicyRegion: dataPolicyRegion, // Include region in policy data
      dataPolicy: [
        {
          operator: "and",
          rules: rules.map(rule => ({
            key: rule.key,
            operator: rule.operator,
            values: rule.values.split(',').map(value => value.trim()) // Assuming values are comma-separated
          }))
        }
      ]
    };

    if (editingPolicy) {
      axios.put(`http://localhost:8080/policies/update/${editingPolicy.id}`, policyData)
        .then(response => {
          console.log('Policy updated successfully:', response.data);
          setPolicies(policies.map(policy =>
            policy.id === editingPolicy.id ? { ...policy, ...policyData, id: editingPolicy.id } : policy
          ));
          setIsPopupOpen(false);
          setNewPolicyName('');
          setDataPolicyId('');
          setDataPolicyRegion(''); // Reset the region
          setRules([{ key: '', operator: '', values: '' }]);
          setEditingPolicy(null);
        })
        .catch(error => {
          console.error('There was an error updating the policy:', error);
        });
    } else {
      axios.post('http://localhost:8080/policies/create/2013300', policyData)
        .then(response => {
          console.log('Policy saved successfully:', response.data);
          setPolicies([...policies, { ...policyData, id: response.data.id }]);
          setIsPopupOpen(false);
          setNewPolicyName('');
          setDataPolicyId('');
          setDataPolicyRegion(''); // Reset the region
          setRules([{ key: '', operator: '', values: '' }]);
        })
        .catch(error => {
          console.error('There was an error saving the policy:', error);
        });
    }
  };

  const handleViewPolicy = (policy) => {
    const policyJson = JSON.stringify(policy, null, 2);
    const newWindow = window.open();
    newWindow.document.write('<pre>' + policyJson + '</pre>');
  };

  const handleEditPolicy = (policy) => {
    setEditingPolicy(policy);
    setNewPolicyName(policy.dataPolicyName);
    setDataPolicyId(policy.dataPolicyId);
    setDataPolicyRegion(policy.dataPolicyRegion); // Set region for editing
    setRules(policy.dataPolicy[0].rules.map(rule => ({
      key: rule.key,
      operator: rule.operator,
      values: rule.values.join(', ')
    })));
    setIsPopupOpen(true);
  };

  const isPolicyDisabled = editingPolicy && (editingPolicy.dataPolicyStatus === 'APPROVED' || editingPolicy.dataPolicyStatus === 'ARCHIVED');

  return (
    <div className="policy-list">
      <h2>Policy Management</h2>
      <button className="create-policy-button" onClick={() => setIsPopupOpen(true)} disabled={isPolicyDisabled}>Create Policy</button>
      <table>
        <thead>
          <tr>
            <th>Policy Name</th>
            <th>Policy Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {policies.map((policy, index) => (
            <tr key={index}>
              <td>{policy.dataPolicyName}</td>
              <td>{policy.dataPolicyStatus}</td>
              <td>
                <button onClick={() => handleViewPolicy(policy)}>View</button>
                {policy.dataPolicyStatus !== 'APPROVED' && policy.dataPolicyStatus !== 'ARCHIVED' && (
                  <button onClick={() => handleEditPolicy(policy)}>Edit</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {isPopupOpen && (
        <div className="popup">
          <div className="popup-content">
            <h2>Create/Edit Policy</h2>
            <button onClick={() => setIsPopupOpen(false)}>Back to List</button>
            <div>
              <label>Policy ID:</label>
              <input
                type="text"
                value={dataPolicyId}
                onChange={(e) => setDataPolicyId(e.target.value)}
                disabled={isPolicyDisabled}
              />
            </div>
            <div>
              <label>Policy Name:</label>
              <input
                type="text"
                value={newPolicyName}
                onChange={(e) => setNewPolicyName(e.target.value)}
                disabled={isPolicyDisabled}
              />
            </div>
            <div>
              <label>Region:</label> {/* Added input for region */}
              <input
                type="text"
                value={dataPolicyRegion}
                onChange={(e) => setDataPolicyRegion(e.target.value)}
                disabled={isPolicyDisabled}
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
                    disabled={isPolicyDisabled}
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
                    disabled={isPolicyDisabled}
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
                    disabled={isPolicyDisabled}
                  />
                </div>
                <button onClick={() => handleRemoveRule(index)} disabled={isPolicyDisabled}>Remove Rule</button>
              </div>
            ))}
            <button onClick={handleAddRule} disabled={isPolicyDisabled}>Add Rule</button>
            <button onClick={handleSavePolicy} disabled={isPolicyDisabled}>
              {editingPolicy ? 'Update Policy' : 'Save Policy'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PolicyList;
