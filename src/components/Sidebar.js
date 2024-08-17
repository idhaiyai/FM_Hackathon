import React from 'react';
import '../Style/sidebar.css';
import logo from '../Assert/logo.png'
import Role from '../Assert/roleTable2.png'
import User from '../Assert/userTable.png'
import Policy from '../Assert/policyTable.png'
import Archive from '../Assert/archiveTable.png'
import Reject from '../Assert/rejectTable.png'
import create from '../Assert/cerateTable.png'
import work from '../Assert/workTable.png'
import Data from '../Assert/dataTable.png'


const Sidebar = ({ setActiveTable, userRole }) => {
  return (
    <div className="sidebar">
      <div><img className='logoSCB' src = {logo} alt="Standard Chartered Bank"/></div>
      <ul>
        {userRole === 'admin' && (
          <>
            <li onClick={() => setActiveTable('RoleTable')}><img src={Role} /> Role Management</li>
            <li onClick={() => setActiveTable('UserTable')}><img src={User} /> Users</li>
            <li onClick={() => setActiveTable('PolicyTable')}><img src={Policy} /> Policies</li>
            <li onClick={() => setActiveTable('ArchiveTable')}><img src={Archive} /> Archive</li>
            <li onClick={() => setActiveTable('RejectedPoliciesTable')}><img src={Reject} /> Rejected Policies</li>
          </>
        )}
        {userRole === 'creator' && (
          <>
            <li onClick={() => setActiveTable('PolicyTable')}><img src={Policy} /> Policies</li>
            <li onClick={() => setActiveTable('PolicyList')}><img src={create} /> Create Policy</li>

          </>
        )}
        {userRole === 'approver' && (
          <>
            <li onClick={() => setActiveTable('PolicyTable')}><img src={Policy} /> Policies</li>
            <li onClick={() => setActiveTable('PolicyApprovalTable')}><img src={work} /> Policy In Work</li>
            
          </>
        )}
        {userRole === 'user' && (
          <>
            <li onClick={() => setActiveTable('UserDataTable')}><img src={Data} /> Data Table</li>  
          </>
        )}        
      </ul>
    </div>
  );
};

export default Sidebar;
