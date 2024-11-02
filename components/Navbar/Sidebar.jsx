import React, { useState } from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, IconButton, Box, AppBar, Toolbar } from '@mui/material';
import { MdMenu, MdHome, MdSettings, MdInfo } from 'react-icons/md';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: 'rgb(128, 0, 128)', // Purple color in RGB format
    },
  },
});

const Sidebar = () => {
  const [open, setOpen] = useState(true);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <ThemeProvider theme={theme}>
      <Box display="flex">

        <Drawer
          variant="persistent"
          anchor="left"
          open={open}
          sx={{ 
            width: 240, 
            flexShrink: 0, 
            '& .MuiDrawer-paper': { 
              width: 240, 
              backgroundColor: 'rgba(128, 0, 128, 0.05)', // Subtle shaded color
              borderRight: '1px solid rgba(128, 0, 128, 0.25)',
              boxShadow: '2px 0px 8px -3px rgba(128, 0, 128, 0.4)', // Shadow on the right side
            } 
          }}
        >
          <Box p={2} textAlign="center" mt={8}>
            <img src="/path/to/your/logo.png" alt="System Logo" style={{ width: '80%' }} />
          </Box>
          <List sx={{ mt: 4 }}>
            {['Home', 'Settings', 'About'].map((text, index) => (
              <ListItem
                button
                key={text}
                sx={{
                  border: '1px solid rgba(128, 0, 128, 0.25)',
                  borderRight: 'none', // Simulate glued effect on the right side
                  borderRadius: '15px 0 0 15px', // Rounded left side only
                  mx: 0, // Align flush with the right side of the drawer
                  mb: 1,
                  marginLeft: '20px', // Adjusted margin to create gap on the left
                  boxShadow: '-2px 0px 8px -3px rgba(128, 0, 128, 0.4)', // Shadow on the left side
                  paddingRight: 2, // Add right padding for spacing
                }}
              >
                <ListItemIcon>
                  {index === 0 && <MdHome color="rgb(128, 0, 128)" />}
                  {index === 1 && <MdSettings color="rgb(128, 0, 128)" />}
                  {index === 2 && <MdInfo color="rgb(128, 0, 128)" />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
        </Drawer>
      </Box>
    </ThemeProvider>
  );
};

export default Sidebar;