import React, { useState } from 'react';
import { Box, Button, Typography,} from '@mui/material';

import ManageDU from './ManageDU'; // Component we'll create in the next step
import HeaderBarAdmin from '../Shared/HeaderBarAdmin/HeaderBarAdmin';

const SettingsPage: React.FC = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Box sx={{ display: 'flex', height: '100vh',  width: "84vw", overFlowX: "hidden", backgroundColor:'#F6F7FF' }}>
      <Box sx={{ flexGrow: 1 }}>
        <HeaderBarAdmin title="Settings" username="Rachel Rajan" />
        <Box sx={{backgroundColor:'white', p: 3,mt:10 }}>
          <Typography style={{ color: "#27314B", fontWeight: "bold" }} variant="h6">Maximum Booking Period</Typography>
          <Box></Box>
          <Box mt={2}>
            <Button style={{ color: "#27314B", fontWeight: "bold" }} variant="contained" onClick={handleOpen}>
              Manage DU
            </Button>
          </Box>
        </Box>
      </Box>

      {/* Modal Component */}
      <ManageDU open={open} handleClose={handleClose} />
      </Box>
    
  );
};

export default SettingsPage;
