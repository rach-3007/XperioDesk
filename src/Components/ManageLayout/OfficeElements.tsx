import { Box } from '@mui/material';
import { styled } from '@mui/system';
import React, { useState } from 'react';
import Draggable from 'react-draggable';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';

// import DeleteIcon from '@mui/icons-material/Delete';
import RotateRightIcon from '@mui/icons-material/RotateRight';

// Seat Container
const SeatContainer = styled(Box)<{ rotate: number }>(({ rotate }) => ({
  height: '60px',
  width: '50px',
  borderRadius: '4px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-end',
  alignItems: 'center',
  color: '#FAFAFA',
  margin: '4px',
  cursor: 'pointer',
  transform: `rotate(${rotate}deg)`,
  transition: 'transform 0.3s ease-in-out', // Smooth rotation transition
}));

// Seat Area
const SeatArea = styled(Box)({
  backgroundColor: '#4A5568',
  height: '20px',
  width: '30px',
  borderTopLeftRadius: '4px',
  borderTopRightRadius: '4px',
  borderBottomLeftRadius: '2px',
  borderBottomRightRadius: '2px',
  boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.9)',
});

// Backrest
const Backrest = styled(Box)({
  backgroundColor: '#2D3748',
  height: '10px',
  width: '35px',
  borderTopLeftRadius: '4px',
  borderTopRightRadius: '4px',
  borderBottomLeftRadius: '2px',
  borderBottomRightRadius: '2px',
  boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.9)',
});

// Controls
const Controls = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
  width: '100%',
  position: 'absolute',
  top: '0',
  padding: '4px',
});

// Seat Component
const Seat = ({ onDelete }) => {
  const [rotate, setRotate] = useState(0);

  const handleRotate = (e) => {
    e.stopPropagation(); // Prevents the click event from propagating to the seat container
    setRotate((prevRotate) => (prevRotate + 15) % 360); // Rotate in 90-degree increments
  };

  return (
    <Draggable>
      <div>
        <SeatContainer rotate={rotate}>
          <Backrest />
          <SeatArea />
          <Controls>
            <RotateRightIcon
              onClick={handleRotate}
              style={{ cursor: 'pointer', color: '#000000' }}
            />
            {/* <DeleteIcon
              onClick={onDelete}
              style={{ cursor: 'pointer', color: '#FF6347' }}
            /> */}
          </Controls>
        </SeatContainer>
      </div>
    </Draggable>
  );
};

// Rectangle Background
const RectangleBackground = styled(Box)({
  position: 'relative',
  height: '100px', // Height for the background
  width: '100px', // Width for the background
  borderRadius: '4px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  margin: '4px',
});

// Cabin Component
const Cabin = styled(RectangleBackground)({
  backgroundColor: '#2D3748', // Background color for Cabin
});

const CabinIcon = styled(LocationOnIcon)({
  fontSize: '48px', // Medium-large size
  color: '#4CAF50', // Green color
  position: 'absolute',
});

// Conference Room Component
const ConferenceRoom = styled(RectangleBackground)({
  backgroundColor: '#4A5568', // Background color for Conference Room
});

const ConferenceRoomIcon = styled(LocationOnIcon)({
  fontSize: '90px', // Large size
  color: '#FFA500', // Orange color
  position: 'absolute',
});

// Partition Component
const Partition = styled(Box)({
  backgroundColor: '#2C5282',
  height: '5px',
  width: '200px',
  borderRadius: '4px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  color: '#FAFAFA',
  margin: '4px',
});

// Entry Point Component
const EntryPointContainer = styled(Box)({
  position: 'relative',
  height: '100px', // Height for the background
  width: '100px', // Width for the background
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  margin: '4px',
});

const ArrowIcon = styled(ArrowDropUpIcon)({
  fontSize: '80px', // Size of the arrow
  color: '#000000', // Black color
  position: 'absolute',
  top: '0', // Position at the top
});

const EntranceText = styled(Box)({
  position: 'absolute',
  bottom: '10px', // Position text below the arrow
  color: '#000000', // Black color for text
  fontSize: '14px', // Font size for text
  fontWeight: 'bold',
});

// Cabin Component with Draggable
const CabinComponent = () => (
  <Draggable>
    <Cabin>
      <CabinIcon />
    </Cabin>
  </Draggable>
);

// Conference Room Component with Draggable
const ConferenceRoomComponent = () => (
  <Draggable>
    <ConferenceRoom>
      <ConferenceRoomIcon />
    </ConferenceRoom>
  </Draggable>
);

// Partition Component with Draggable
const PartitionComponent = () => (
  <Draggable>
    <Partition />
  </Draggable>
);

// Entry Point Component with Draggable
const EntryPointComponent = () => (
  <Draggable>
    <EntryPointContainer>
      <ArrowIcon />
      <EntranceText>Entrance</EntranceText>
    </EntryPointContainer>
  </Draggable>
);

export { Seat, CabinComponent as Cabin, ConferenceRoomComponent as ConferenceRoom, PartitionComponent as Partition, EntryPointComponent as EntryPoint };
