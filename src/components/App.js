import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import PolicyTable from './PolicyTable';
import ArchiveTable from './ArchiveTable';
import UserTable from './UserTable';
import RoleTable from './RoleTable';
import RejectedPoliciesTable from './RejectedPoliciesTable';
import PolicyList from './PolicyList';
import Login from './Login';
import PolicyApprovalTable from './PolicyApprovalTable'; // Import the new component
import '../Style/App.css';
import UserDataTable from './UserDataTable';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTable, setActiveTable] = useState('PolicyTable');
  const [user, setUser] = useState(null);

  const handleLogin = (userInfo) => {
    setIsLoggedIn(true);
    setUser(userInfo);

    // Set the default activeTable based on the user's role
    switch (userInfo.role) {
      case 'admin':
        setActiveTable('PolicyTable');
        break;
      case 'creator':
        setActiveTable('PolicyList');
        break;
      case 'approver':
        setActiveTable('PolicyApprovalTable');
        break;
      case 'user':
        setActiveTable('UserDataTable');
        break;
      default:
        setActiveTable('PolicyTable');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUser(null);
    setActiveTable('PolicyTable'); // Reset to default when logging out
  };

  const renderTable = () => {
    if (user.role === 'creator' && activeTable === 'PolicyList') {
      return <PolicyList />;
    } else if (user.role === 'creator' && activeTable === 'PolicyTable') {
      return <PolicyTable />;
    }
    switch (activeTable) {
      case 'PolicyTable':
        return <PolicyTable />;
      case 'ArchiveTable':
        return <ArchiveTable />;
      case 'UserTable':
        return <UserTable />;
      case 'RoleTable':
        return <RoleTable />;
      case 'RejectedPoliciesTable':
        return <RejectedPoliciesTable />;
      case 'PolicyApprovalTable': 
        return <PolicyApprovalTable />;
      case 'UserDataTable':
        return <UserDataTable />
      default:
        return <PolicyTable />;
    }
  };

  return (
    <div className="app">
      {!isLoggedIn && <Login handleLogin={handleLogin} />}
      {isLoggedIn && (
        <>
          <Sidebar setActiveTable={setActiveTable} userRole={user.role} />
          <div className="main-content">
            <Header activeTable={activeTable} user={user} handleLogout={handleLogout} />
            {renderTable()}
          </div>
        </>
      )}
    </div>
  );
}

export default App;
