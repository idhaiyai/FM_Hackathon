import React from 'react';

const Sidebar = ({ setActiveTable, userRole }) => {
  return (
    <div className="sidebar">
      <ul>
        {userRole === 'admin' && (
          <>
            <li onClick={() => setActiveTable('PolicyTable')}>Policies</li>
            <li onClick={() => setActiveTable('ArchiveTable')}>Archive Table</li>
            <li onClick={() => setActiveTable('UserTable')}>User Table</li>
            <li onClick={() => setActiveTable('RoleTable')}>Role Table</li>
            <li onClick={() => setActiveTable('RejectedPoliciesTable')}>Rejected Policies Table</li>
          </>
        )}
        {userRole === 'creator' && (
          <>
            <li onClick={() => setActiveTable('PolicyTable')}>Policies</li>
            <li onClick={() => setActiveTable('PolicyList')}>Create Policy</li>
            <li onClick={() => setActiveTable('PolicyApprovalTable')}>Policy In Work</li>
            
          </>
        )}
      </ul>
    </div>
  );
};

export default Sidebar;
