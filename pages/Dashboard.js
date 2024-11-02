import React, { useState } from 'react';
import Sidebar from '../components/Navbar/Sidebar';
import StatsCard from '../components/Results/StatsCard';
import { Box, Typography, Grid, Dialog, DialogTitle, DialogContent, DialogContentText,Divider, DialogActions, Button, IconButton } from '@mui/material';
import { MdTrendingUp, MdPerson, MdAttachMoney } from 'react-icons/md';
import { IoCloseCircleOutline } from "react-icons/io5";


const Dashboard = () => {
    const [open, setOpen] = useState(false);
    const [dialogTitle, setDialogTitle] = useState('');
    const [dialogContent, setDialogContent] = useState('');
    const [dialogSize, setDialogSize] = useState('md'); 
  
    const handleClickOpen = (title, content, size = 'md') => {
        setDialogTitle(title);
        setDialogContent(content);
        setDialogSize(size);
        setOpen(true);
      };
  
    const handleClose = () => {
      setOpen(false);
    };
  
    return (
        <Box display="flex">
          <Sidebar />
          <Box component="main" sx={{ flexGrow: 1, p: 3, ml: 0 }}>
            <Typography variant="h4" gutterBottom>
              Dashboard
            </Typography>
            <Typography variant="body1" gutterBottom>
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6} md={4}>
                <StatsCard
                  title="Total Sales"
                  value="$24,000"
                  description="Total sales this month"
                  icon={<MdAttachMoney size={40} color="rgb(128, 0, 128)" />}
                  onClick={() => handleClickOpen('Total Sales', 'Details about total sales...', 'lg')}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <StatsCard
                  title="New Users"
                  value="1,200"
                  description="New users this month"
                  icon={<MdPerson size={40} color="rgb(128, 0, 128)" />}
                  onClick={() => handleClickOpen('New Users', 'Details about new users...', 'sm')}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <StatsCard
                  title="Growth Rate"
                  value="15%"
                  description="Growth rate this month"
                  icon={<MdTrendingUp size={40} color="rgb(128, 0, 128)" />}
                  onClick={() => handleClickOpen('Growth Rate', 'Details about growth rate...', 'md')}
                />
              </Grid>
            </Grid>
    
            <Dialog open={open} onClose={handleClose} maxWidth={dialogSize} fullWidth>
              <DialogTitle>
                {dialogTitle}
                <IconButton
                  aria-label="close"
                  onClick={handleClose}
                  sx={{
                    position: 'absolute',
                    right: 8,
                    top: 8,
                    color: (theme) => theme.palette.grey[500],
                  }}
                >
                  <IoCloseCircleOutline size={24} />
                </IconButton>
              </DialogTitle>
              <Divider />
              <DialogContent>
                <DialogContentText>
                  {dialogContent}
                </DialogContentText>
              </DialogContent>
            </Dialog>
          </Box>
        </Box>
      );
    };
    
    export default Dashboard;