import React from 'react';
import { Box, Button, Modal, Typography, IconButton, FormControl, Select, MenuItem } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

interface ManageDUModalProps {
  open: boolean;
  handleClose: () => void;
}

const ManageDUModal: React.FC<ManageDUModalProps> = ({ open, handleClose }) => {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '50%',
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
          <Typography style={{ color: "#27314B", fontWeight: "bold" }} id="modal-title" variant="h6" component="h2">
            Manage DU
          </Typography>
          <IconButton onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </Box>
        {/* Modal Content */}
        <Box>
          <FormControl fullWidth>
            <Select defaultValue="Gayatri Block">
              <MenuItem value="Gayatri Block">Gayatri Block</MenuItem>
              <MenuItem value="Another Block">Another Block</MenuItem>
            </Select>
          </FormControl>
          <Box sx={{ mt: 2 }}>
            <Typography style={{color: "#27314B"}} variant="subtitle1">Module - 1</Typography>
            {/* Repeat this block for each module and DU */}
            <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
              <Button variant="contained">DU-1</Button>
              <Button variant="outlined">DU-2</Button>
              {/* Add more DU buttons as needed */}
            </Box>
          </Box>
          {/* Add more modules similarly */}
        </Box>
      </Box>
    </Modal>
  );
};

export default ManageDUModal;
