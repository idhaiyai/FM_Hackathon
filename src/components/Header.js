// import React from 'react';

// const Header = ({ activeTable, user, handleLogout }) => {
//   const getPageTitle = () => {
//     switch (activeTable) {
//       case 'PolicyTable':
//         return 'Policies';
//       case 'ArchiveTable':
//         return 'Archived Policies';
//       case 'UserTable':
//         return 'Users';
//       case 'RoleTable':
//         return 'Roles';
//       case 'RejectedPoliciesTable':
//         return 'Rejected Policies';
//       case 'PolicyList':
//         return 'Create Policy';
//       case 'PolicyApprovalTable':
//         return 'Policy In Work';
//       default:
//         return 'Policies';
//     }
//   };

//   return (
//     <header className="header">
//       <nav className="nav-bar">
//         <ul>
//           <li className={ 'active' }>Dashboard</li>
//           <li className={'active'}>{getPageTitle()}</li>
//         </ul>
//       </nav>
//       <div className="right-side">
//         <div className="search-bar">
//           <input type="text" placeholder="Search..." />
//         </div>
//         <div className="user-profile">
//           <button onClick={handleLogout}>Sign Out</button>
//           {user && <img src={user.profilePicture} alt="User" />} {/* Display user's profile picture */}
//         </div>
//       </div>
//     </header>
//   );
// };

// export default Header;


// import React from 'react';
// import AppBar from '@mui/material/AppBar';
// import Toolbar from '@mui/material/Toolbar';
// import Typography from '@mui/material/Typography';
// import IconButton from '@mui/material/IconButton';
// import MenuIcon from '@mui/icons-material/Menu';
// import { styled } from '@mui/material/styles';

// const drawerWidth = 240;

// const StyledAppBar = styled(AppBar, {
//   shouldForwardProp: (prop) => prop !== 'open',
// })(({ theme, open }) => ({
//   zIndex: theme.zIndex.drawer + 1,
//   transition: theme.transitions.create(['width', 'margin'], {
//     easing: theme.transitions.easing.sharp,
//     duration: theme.transitions.duration.leavingScreen,
//   }),
//   ...(open && {
//     marginLeft: drawerWidth,
//     width: `calc(100% - ${drawerWidth}px)`,
//     transition: theme.transitions.create(['width', 'margin'], {
//       easing: theme.transitions.easing.sharp,
//       duration: theme.transitions.duration.enteringScreen,
//     }),
//   }),
// }));

// const Header = ({ open, handleDrawerOpen }) => {
//   return (
//     <StyledAppBar position="fixed" open={open}>
//       <Toolbar>
//         <IconButton
//           color="inherit"
//           aria-label="open drawer"
//           onClick={handleDrawerOpen}
//           edge="start"
//           sx={{
//             marginRight: 5,
//             ...(open && { display: 'none' }),
//           }}
//         >
//           <MenuIcon />
//         </IconButton>
//         <Typography variant="h6" noWrap component="div">
//           Policy Management System 
//         </Typography>
//       </Toolbar>
//     </StyledAppBar>
//   );
// };

// export default Header;


import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { styled } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Button from '@mui/material/Button';

const drawerWidth = 240;

const StyledAppBar = styled(AppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.common.white,
  '&:hover': {
    backgroundColor: theme.palette.common.white,
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

const Header = ({ open, handleDrawerOpen }) => {
  return (
    <StyledAppBar position="fixed" open={open}>
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={handleDrawerOpen}
          edge="start"
          sx={{
            marginRight: 5,
            ...(open && { display: 'none' }),
          }}
        >
          {/* <MenuIcon /> */}
        </IconButton>
        <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
          Policy Management System
        </Typography>
        <Search>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Search…"
            inputProps={{ 'aria-label': 'search' }}
          />
        </Search>
        <IconButton color="inherit">
          <AccountCircle />
        </IconButton>
        <Button color="inherit">Sign Out</Button>
      </Toolbar>
    </StyledAppBar>
  );
};

export default Header;

