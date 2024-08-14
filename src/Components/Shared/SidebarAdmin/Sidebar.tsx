// Sidebar.tsx
import React from 'react';
import { Drawer, List, ListItem, ListItemText, Typography } from '@mui/material';

const Sidebar: React.FC = () => {
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 240,
        '& .MuiDrawer-paper': { width: 240, boxSizing: 'border-box', backgroundColor: '#202a44' },
      }}
    >
      <Typography variant="h5" sx={{ color: 'white', padding: 2 }}>XperioDesk</Typography>
      <List>
        {['Home', 'Reports', 'Notifications', 'Assign Role', 'Book Desk', 'Locations'].map((text) => (
          <ListItem button key={text}>
            <ListItemText primary={text} sx={{ color: 'white' }} />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default Sidebar;
