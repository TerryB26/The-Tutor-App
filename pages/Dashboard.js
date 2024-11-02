import React from 'react';
import Sidebar from '../components/Navbar/Sidebar';
import { Box, Typography } from '@mui/material';

const Dashboard = () => {
  return (
    <Box display="flex">
      <Sidebar />
      <Box component="main" sx={{ flexGrow: 1, p: 3, ml: 30 }}>
        
      </Box>
    </Box>
  );
};

export default Dashboard;