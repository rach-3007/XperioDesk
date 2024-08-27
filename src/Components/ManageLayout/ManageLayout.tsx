import React, { useState } from 'react';
import { Box, Toolbar, TextField, Button, Divider, Typography, Paper, Dialog, DialogTitle, DialogContent, DialogActions, Slide } from '@mui/material';
import { styled } from '@mui/system';
import { Seat, ConferenceRoom, Cabin, Partition, EntryPoint } from './OfficeElements'; // Assuming these are in a separate file

const ManageLayoutContainer = styled(Box)({
  display: 'flex',
  height: '100%',
  backgroundColor: '#1A202C',
  color: '#FAFAFA',
});

const Sidebar = styled(Toolbar)({
  width: '200px',
  display: 'flex',
  flexDirection: 'column',
  padding: '16px',
  backgroundColor: '#2D3748',
  gap: '16px',
});

const ContentArea = styled(Box)({
  flexGrow: 1,
  padding: '24px',
  backgroundColor: '#1A202C',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});

const LayoutContainer = styled(Paper)({
  width: '100%',
  height: '100%',
  padding: '16px',
  backgroundColor: '#2D3748',
  color: '#FAFAFA',
  boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.2)',
  borderRadius: '8px',
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
  overflow: 'auto',
});

const StyledTextField = styled(TextField)({
  '& .MuiInputBase-input': {
    color: '#FAFAFA',
  },
  '& .MuiInputLabel-root': {
    color: '#FAFAFA',
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: '#4A5568',
    },
    '&:hover fieldset': {
      borderColor: '#718096',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#FAFAFA',
    },
  },
});

const StyledButton = styled(Button)({
  backgroundColor: '#4A5568',
  color: '#FAFAFA',
  '&:hover': {
    backgroundColor: '#718096',
  },
});

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="right" ref={ref} {...props} />;
});

const ManageLayout: React.FC = () => {
  const [seatsPerCubicle, setSeatsPerCubicle] = useState<number | string>(4);
  const [cubiclesPerRow, setCubiclesPerRow] = useState<number | string>(2);
  const [totalRows, setTotalRows] = useState<number | string>(2);
  const [elements, setElements] = useState<JSX.Element[]>([]);
  const [markEntryPoint, setMarkEntryPoint] = useState<boolean>(false);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [seatNumbers, setSeatNumbers] = useState<string>('');
  const [moduleName, setModuleName] = useState<string>('');
  const [accessDUs, setAccessDUs] = useState<string>('');

  const handleInputChange = (setter: React.Dispatch<React.SetStateAction<number | string>>) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setter(event.target.value);
  };

  const handleMarkEntryPoint = () => {
    setMarkEntryPoint(!markEntryPoint);
  };

  const addElement = (element: JSX.Element) => {
    setElements([...elements, element]);
  };
  

  const handleSaveLayout = () => {
    // Implement your save logic here
    alert('Layout saved!');
  };

  const handleConfirmLayout = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleSaveModal = () => {
    // Save the layout with the provided details
    alert('Layout details saved!');
    setOpenModal(false);
  };

  const renderCubicle = () => {
    const rows = 2;
    const columns = Math.ceil(Number(seatsPerCubicle) / rows);

    const seatComponents = [];
    for (let i = 0; i < Number(seatsPerCubicle); i++) {
      seatComponents.push(<Seat key={i} sx={{ width: '20px', height: '20px' }} />);
    }

    return (
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        key={Math.random()}
        style={{ position: 'relative', padding: '4px', border: '0px solid #4A5568', borderRadius: '8px' }}
      >
        <Partition sx={{ position: 'absolute', top: 0, width: '100%', height: '5px' }} />
        <Partition sx={{ position: 'absolute', bottom: 0, width: '100%', height: '5px' }} />
        <Box
          display="grid"
          gridTemplateColumns={`repeat(${columns}, 1fr)`}
          gap="4px"
          style={{ width: '100%' }}
        >
          {seatComponents}
        </Box>
      </Box>
    );
  };

  const renderRow = () => {
    const cubicleComponents = [];
    for (let i = 0; i < Number(cubiclesPerRow); i++) {
      cubicleComponents.push(renderCubicle());
    }

    return (
      <Box display="flex" flexDirection="row" justifyContent="center" alignItems="center" key={Math.random()} style={{ margin: '4px' }}>
        {cubicleComponents}
      </Box>
    );
  };

  const renderLayout = () => {
    const rowComponents = [];
    for (let i = 0; i < Number(totalRows); i++) {
      rowComponents.push(renderRow());
    }

    return rowComponents;
  };

  return (
    <ManageLayoutContainer>
      <Sidebar>
        <Typography variant="h6" gutterBottom>
          Manage Layout
        </Typography>
        
        <StyledTextField
          label="Module Name"
          variant="outlined"
          size="small"
        />
        <Divider style={{ backgroundColor: '#4A5568', margin: '16px 0' }} />
        <StyledTextField
          label="Seats Per Cubicle"
          variant="outlined"
          size="small"
          value={seatsPerCubicle}
          onChange={handleInputChange(setSeatsPerCubicle)}
        />
        <StyledTextField
          label="Cubicles Per Row"
          variant="outlined"
          size="small"
          value={cubiclesPerRow}
          onChange={handleInputChange(setCubiclesPerRow)}
        />
        <StyledTextField
          label="Total Number of Rows"
          variant="outlined"
          size="small"
          value={totalRows}
          onChange={handleInputChange(setTotalRows)}
        />
        <StyledButton variant="contained" onClick={handleMarkEntryPoint}>
          {markEntryPoint ? 'Cancel Entry Point' : 'Mark Entry Point'}
        </StyledButton>
        <Divider style={{ backgroundColor: '#4A5568', margin: '16px 0' }} />
        <StyledButton variant="contained" onClick={() => addElement(<Seat sx={{ width: '20px', height: '20px' }} />)}>Add Seat</StyledButton>
        <StyledButton variant="contained" onClick={() => addElement(<ConferenceRoom sx={{ width: '100px', height: '100px' }} />)}>Add Conference Room</StyledButton>
        <StyledButton variant="contained" onClick={() => addElement(<Cabin sx={{ width: '50px', height: '50px' }} />)}>Add Cabins</StyledButton>
        <StyledButton variant="contained" onClick={() => addElement(<Partition sx={{ width: '10px', height: '10px' }} />)}>Add Partitions</StyledButton>
        <Divider style={{ backgroundColor: '#4A5568', margin: '16px 0' }} />
        <StyledButton variant="contained" onClick={handleConfirmLayout}>
          Confirm Layout
        </StyledButton>
      </Sidebar>
      <ContentArea>
        <LayoutContainer>
          <Typography variant="h5" gutterBottom>
            Layout Preview
          </Typography>
          <Box sx={{ height: '100%', width: '90vw', backgroundColor: 'white', borderRadius: '8px', display: 'flex', flexDirection: 'column', overflow: 'auto' }}>
            {renderLayout()}
            {elements}
            {markEntryPoint && <EntryPoint />}
          </Box>
        </LayoutContainer>
      </ContentArea>
      
      <Dialog
        open={openModal}
        onClose={handleCloseModal}
        TransitionComponent={Transition}
        keepMounted
        fullWidth
        maxWidth="sm"
        PaperProps={{
          style: {
            backgroundColor: '#2D3748',
            color: '#FAFAFA',
            borderRadius: '8px',
            boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.2)',
          },
        }}
      >
        <DialogTitle>Confirm Layout</DialogTitle>
        <DialogContent>
          <Typography variant="body1" gutterBottom>
            Number of Seats: {Number(seatsPerCubicle) * Number(totalRows) * Number(cubiclesPerRow)}
          </Typography>
          <StyledTextField
            label="Unique Seat Numbers (comma separated)"
            variant="outlined"
            size="small"
            fullWidth
            value={seatNumbers}
            onChange={(e) => setSeatNumbers(e.target.value)}
          />
          <StyledTextField
            label="Module Name"
            variant="outlined"
            size="small"
            fullWidth
            value={moduleName}
            onChange={(e) => setModuleName(e.target.value)}
            style={{ marginTop: '16px' }}
          />
          <StyledTextField
            label="DUs with Access (comma separated)"
            variant="outlined"
            size="small"
            fullWidth
            value={accessDUs}
            onChange={(e) => setAccessDUs(e.target.value)}
            style={{ marginTop: '16px' }}
          />
          <Typography variant="caption" color="textSecondary" style={{ marginTop: '16px' }}>
            Note: You can change the DUs with access later in the settings.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal} color="inherit">
            Cancel
          </Button>
          <Button onClick={handleSaveModal} variant="contained" color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </ManageLayoutContainer>
  );
};

export default ManageLayout;
