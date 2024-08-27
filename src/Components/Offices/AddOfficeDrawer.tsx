import React, { useState } from 'react';
import { Drawer, Button, Typography, TextField, MenuItem, FormControl, InputLabel, Select, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

interface AddOfficeDrawerProps {
  open: boolean;
  onClose: () => void;
}

const AddOfficeDrawer: React.FC<AddOfficeDrawerProps> = ({ open, onClose }) => {
  const navigate = useNavigate();
  const [officeName, setOfficeName] = useState('');
  const [moduleName, setModuleName] = useState('');

  const handleOfficeNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setOfficeName(event.target.value);
  };

  const handleModuleNameChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setModuleName(event.target.value as string);
  };

  const handleSave = () => {
    // Handle submission logic here
    console.log('Office Name:', officeName);
    console.log('Module Name:', moduleName);
    onClose();
    navigate('/manage-layout'); // Navigate to ManageLayout
  };

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      PaperProps={{ sx: { width: 400, padding: 2 } }}
    >
      <Typography variant="h6">Add Office</Typography>
      <Box mt={2}>
        <TextField
          label="Office Name"
          fullWidth
          value={officeName}
          onChange={handleOfficeNameChange}
        />
      </Box>
      <Box mt={2}>
        <FormControl fullWidth>
          <InputLabel>Module Name</InputLabel>
          <Select
            value={moduleName}
            onChange={handleModuleNameChange}
          >
            <MenuItem value="Module1">Module 1</MenuItem>
            <MenuItem value="Module2">Module 2</MenuItem>
            {/* Add more module options as needed */}
          </Select>
        </FormControl>
      </Box>
      <Box mt={2}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSave}
        >
          Set Layout
        </Button>
      </Box>
    </Drawer>
  );
};

export default AddOfficeDrawer;
