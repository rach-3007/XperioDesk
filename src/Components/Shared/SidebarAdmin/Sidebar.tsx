import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook
import { Button, Drawer, List, ListItem, ListItemIcon, ListItemText, Typography } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import ReportIcon from '@mui/icons-material/Assessment';
// import NotificationsIcon from '@mui/icons-material/Notifications';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import DeskIcon from '@mui/icons-material/DesktopWindows';
import OfficeIcon from '@mui/icons-material/Business';
import SettingsIcon from '@mui/icons-material/Settings';
import { useMsal } from '@azure/msal-react';

const Sidebar: React.FC = () => {
  const navigate = useNavigate(); // Initialize useNavigate
  const {instance}=useMsal();

  const menuItems = [
    { text: 'Dashboard', icon: <DashboardIcon sx={{ color: 'gray' }} />, path: '/home' },
    { text: 'Analytics', icon: <AnalyticsIcon sx={{ color: 'gray' }} />, path: '/analytics' },
    { text: 'Reports', icon: <ReportIcon sx={{ color: 'gray' }} />, path: '/reports' },
    // { text: 'Notifications', icon: <NotificationsIcon sx={{ color: 'gray' }} />, path: '/notifications' },
    { text: 'Assign Role', icon: <AssignmentIndIcon sx={{ color: 'gray' }} />, path: '/assign-role' },
    { text: 'Book Desk', icon: <DeskIcon sx={{ color: 'gray' }} />, path: '/book-desk' },
    
    { text: 'Edit Layout', icon: <DeskIcon sx={{ color: 'gray' }} />, path: '/edit-layout' },
    { text: 'Offices', icon: <OfficeIcon sx={{ color: 'gray' }} />, path: '/offices' },
    { text: 'Settings', icon: <SettingsIcon sx={{ color: 'gray' }} />, path: '/settings' },
    
  ];
  
  const handleLogoutRedirect = () => {
    sessionStorage.clear();
    instance.logoutPopup({});
    window.location.reload();
  };

  return (
    
    <Drawer
      variant="permanent"
      sx={{
        width: 200,
        '& .MuiDrawer-paper': { width: 200, boxSizing: 'border-box', backgroundColor: '#202a44' },
      }}
    >
      <Typography variant="h5" sx={{ color: 'white', padding: 2 }}>XperioDesk</Typography>
      <List>
        {menuItems.map((item) => (
          <ListItem button key={item.text} onClick={() => navigate(item.path)}>
            <ListItemIcon sx={{ minWidth: 40 }}>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} sx={{ color: 'grey' }} />
          </ListItem>
        ))}
      </List>
      <Button
                      onClick={handleLogoutRedirect}
                      sx={{
                        
                        color: "#aaa",
                        "&:hover": {
                          backgroundColor: "#b71c1c",
                        },
                        width: "100%",
                        justifyContent: "center",
                      }}>
                      Log Out
                     
                    </Button>
    </Drawer>
    
    
  );
};

export default Sidebar;
