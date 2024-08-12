import React from 'react';

const Sidebar = ({ setActiveTable, userRole }) => {
  return (
    <div className="sidebar">
      <ul>
        {userRole === 'admin' && (
          <>
            <li onClick={() => setActiveTable('RoleTable')}>Role Table</li>
            <li onClick={() => setActiveTable('UserTable')}>User Table</li>
            <li onClick={() => setActiveTable('PolicyTable')}>Policies</li>
            <li onClick={() => setActiveTable('ArchiveTable')}>Archive Table</li>
            <li onClick={() => setActiveTable('RejectedPoliciesTable')}>Rejected Policies Table</li>
          </>
        )}
        {userRole === 'creator' && (
          <>
            <li onClick={() => setActiveTable('PolicyTable')}>Policies</li>
            <li onClick={() => setActiveTable('PolicyList')}>Create Policy</li>

          </>
        )}
        {userRole === 'approver' && (
          <>
            <li onClick={() => setActiveTable('PolicyTable')}>Policies</li>
            <li onClick={() => setActiveTable('PolicyApprovalTable')}>Policy In Work</li>
            
          </>
        )}
        {userRole === 'user' && (
          <>
            <li onClick={() => setActiveTable('UserDataTable')}>Data Table</li>  
          </>
        )}        
      </ul>
    </div>
  );
};

export default Sidebar;
