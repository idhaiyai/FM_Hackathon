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
import Footer from './Footer';
import SideNav from './SideNav';
import { Box } from '@mui/material';
import CssBaseline from '@mui/material';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTable, setActiveTable] = useState('PolicyTable');
  const [user, setUser] = useState(null);
  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleLogin = (userInfo) => {
    setIsLoggedIn(true);
    setUser(userInfo);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUser(null);
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
      case 'PolicyApprovalTable': // Add this case
        return <PolicyApprovalTable />;
      default:
        return <PolicyTable />;
    }
  };

  return (
    // <div className="app">
    //   {!isLoggedIn && <Login handleLogin={handleLogin} />}
    //   {isLoggedIn && (
    //     <>
    //       <Sidebar setActiveTable={setActiveTable} userRole={user.role} />
    //       <div className="main-content">
    //         <Header activeTable={activeTable} user={user} handleLogout={handleLogout} />
    //         
    //       </div>

    //     </>
    //   )}
    // </div>
    // <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
    //   {!isLoggedIn && <Login handleLogin={handleLogin} />}

    //   {isLoggedIn && (
    //     <>
    //       //<Header activeTable={activeTable} user={user} handleLogout={handleLogout} />
    //       <Sidebar setActiveTable={setActiveTable} userRole={user.role} />
    //       <Box component="main" sx={{
    //       flexGrow: 1,
    //       p: 3,
    //       marginTop: '64px', // Adjust this value if your header height is different
    //     }}>
    //         {/* {renderTable()} */}
    //         <h1>Hello</h1>
    //       </Box>
    //       <Footer />
    //     </>
    //   )}
    // </Box>

    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {!isLoggedIn && <Login handleLogin={handleLogin} />
      }
      {isLoggedIn && (
        <>
           <Header activeTable={activeTable} user={user} handleLogout={handleLogout} />
          <Box sx={{ display: 'flex', flexGrow: 1 }}>
            <Sidebar setActiveTable={setActiveTable} userRole={user.role} />
            <Box
              component="main"
              sx={{
                flexGrow: 1,
                p: 3,
                marginTop: '64px', // Adjust this value if your header height is different
              }}
            >

              {renderTable()}
            </Box>
          </Box>
          <Footer />
        </>)}
    </Box>


  );
}

export default App;
