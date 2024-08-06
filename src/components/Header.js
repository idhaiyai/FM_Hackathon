import React from 'react';

const Header = ({ activeTable, user, handleLogout }) => {
  const getPageTitle = () => {
    switch (activeTable) {
      case 'PolicyTable':
        return 'Policies';
      case 'ArchiveTable':
        return 'Archived Policies';
      case 'UserTable':
        return 'Users';
      case 'RoleTable':
        return 'Roles';
      case 'RejectedPoliciesTable':
        return 'Rejected Policies';
      case 'PolicyList':
        return 'Create Policy';
      case 'PolicyApprovalTable':
        return 'Policy In Work';
      default:
        return 'Policies';
    }
  };

  return (
    <header className="header">
      <nav className="nav-bar">
        <ul>
          <li className={ 'active' }>Dashboard</li>
          <li className={'active'}>{getPageTitle()}</li>
        </ul>
      </nav>
      <div className="right-side">
        <div className="search-bar">
          <input type="text" placeholder="Search..." />
        </div>
        <div className="user-profile">
          <button onClick={handleLogout}>Sign Out</button>
          {user && <img src={user.profilePicture} alt="User" />} {/* Display user's profile picture */}
        </div>
      </div>
    </header>
  );
};

export default Header;
