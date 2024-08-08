// import React from 'react';

// const Sidebar = ({ setActiveTable, userRole }) => {
//   return (
//     <div className="sidebar">
//       <ul>
//         {userRole === 'admin' && (
//           <>
//             <li onClick={() => setActiveTable('PolicyTable')}>Policies</li>
//             <li onClick={() => setActiveTable('ArchiveTable')}>Archive Table</li>
//             <li onClick={() => setActiveTable('UserTable')}>User Table</li>
//             <li onClick={() => setActiveTable('RoleTable')}>Role Table</li>
//             <li onClick={() => setActiveTable('RejectedPoliciesTable')}>Rejected Policies Table</li>
//           </>
//         )}
//         {userRole === 'creator' && (
//           <>
//             <li onClick={() => setActiveTable('PolicyTable')}>Policies</li>
//             <li onClick={() => setActiveTable('PolicyList')}>Create Policy</li>
//             <li onClick={() => setActiveTable('PolicyApprovalTable')}>Policy In Work</li>
            
//           </>
//         )}
//       </ul>
//     </div>
//   );
// };

// export default Sidebar;


import React from 'react';
import { List, ListItem, ListItemText, ListItemIcon, Drawer, useTheme } from '@mui/material';
import PolicyIcon from '@mui/icons-material/Policy';
import ArchiveIcon from '@mui/icons-material/Archive';
import PersonIcon from '@mui/icons-material/Person';
import GroupIcon from '@mui/icons-material/Group';
import BlockIcon from '@mui/icons-material/Block';
import CreateIcon from '@mui/icons-material/Create';
import WorkIcon from '@mui/icons-material/Work';

const drawerWidth = 240;

const Sidebar = ({ setActiveTable, userRole }) => {
  const theme = useTheme();

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: drawerWidth,
          boxSizing: 'border-box',
          backgroundColor: theme.palette.background.paper,
          mt: '64px',
        },
      }}
    >
      <List>
        {userRole === 'admin' && (
          <>
            <ListItem button onClick={() => setActiveTable('PolicyTable')}>
              <ListItemIcon>
                <PolicyIcon />
              </ListItemIcon>
              <ListItemText primary="Policies" />
            </ListItem>
            <ListItem button onClick={() => setActiveTable('ArchiveTable')}>
              <ListItemIcon>
                <ArchiveIcon />
              </ListItemIcon>
              <ListItemText primary="Archive Table" />
            </ListItem>
            <ListItem button onClick={() => setActiveTable('UserTable')}>
              <ListItemIcon>
                <PersonIcon />
              </ListItemIcon>
              <ListItemText primary="User Table" />
            </ListItem>
            <ListItem button onClick={() => setActiveTable('RoleTable')}>
              <ListItemIcon>
                <GroupIcon />
              </ListItemIcon>
              <ListItemText primary="Role Table" />
            </ListItem>
            <ListItem button onClick={() => setActiveTable('RejectedPoliciesTable')}>
              <ListItemIcon>
                <BlockIcon />
              </ListItemIcon>
              <ListItemText primary="Rejected Policies Table" />
            </ListItem>
          </>
        )}
        {userRole === 'creator' && (
          <>
            <ListItem button onClick={() => setActiveTable('PolicyTable')}>
              <ListItemIcon>
                <PolicyIcon />
              </ListItemIcon>
              <ListItemText primary="Policies" />
            </ListItem>
            <ListItem button onClick={() => setActiveTable('PolicyList')}>
              <ListItemIcon>
                <CreateIcon />
              </ListItemIcon>
              <ListItemText primary="Create Policy" />
            </ListItem>
            <ListItem button onClick={() => setActiveTable('PolicyApprovalTable')}>
              <ListItemIcon>
                <WorkIcon />
              </ListItemIcon>
              <ListItemText primary="Policy In Work" />
            </ListItem>
          </>
        )}
      </List>
    </Drawer>
  );
};

export default Sidebar;

