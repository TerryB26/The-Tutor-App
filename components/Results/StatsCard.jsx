// components/Results/StatsCard.jsx
import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';

const StatsCard = ({ title, value, description, icon, onClick }) => {
  return (
    <Card sx={{ minWidth: 275, m: 2, boxShadow: 3, cursor: 'pointer' }} onClick={onClick}>
      <CardContent>
        <Box display="flex" alignItems="center">
          <Box mr={2}>{icon}</Box>
          <Box>
            <Typography variant="h5" component="div">
              {title}
            </Typography>
            <Typography variant="h4" color="primary">
              {value}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              {description}
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default StatsCard;