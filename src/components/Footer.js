import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';

const Footer = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '60px',
        backgroundColor: '#f5f5f5',
        mt: 'auto',
      }}
    >
      <Typography variant="body2" color="text.secondary" align="center">
        {'© '}
        <Link color="inherit" href="https://your-website.com/">
          FM_HACKETHON
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    </Box>
  );
};

export default Footer;
