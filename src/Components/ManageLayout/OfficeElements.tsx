import { Box, Typography } from '@mui/material';
import { styled } from '@mui/system';
import React, { useState } from 'react';
import Draggable from 'react-draggable';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import conerenceroom from '../../assets/conferenceroom.png'
import cabin from '../../assets/cabin4.png'
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
const Seat = ({style,backrestStyle, seatAreaStyle, onClick }) => {
  const [rotate, setRotate] = useState(0);

  // const handleRotate = (e) => {
  //   e.stopPropagation(); // Prevents the click event from propagating to the seat container
  //   setRotate((prevRotate) => (prevRotate + 15) % 360); // Rotate in 90-degree increments
  // };
  // const SeatContent = (
  //   <SeatContainer style={style} rotate={rotate}>
  //     <Backrest />
  //     <SeatArea />
  //     <Controls>
  //       <RotateRightIcon
  //         onClick={handleRotate}
  //         style={{ cursor: 'pointer', color: '#000000' }}
  //       />
  //     </Controls>
  //   </SeatContainer>
  // );

  return (
    <Draggable>
      <div style={style} onClick={onClick}>
        <SeatContainer rotate={rotate}>
          <Backrest style={backrestStyle} />
          <SeatArea style={seatAreaStyle} />
          <Controls>
            {/* <RotateRightIcon
              onClick={handleRotate}
              style={{ cursor: 'pointer', color: '#000000' }}
            /> */}
           
          </Controls>
        </SeatContainer>
      </div>
    </Draggable>
  );
};

// Rectangle Background
// const RectangleBackgroundConf = styled(Box)({
//   position: 'relative',
//   height: '150px', // Height for the background
//   width: '100px', // Width for the background
//   borderRadius: '4px',
//   display: 'flex',
//   justifyContent: 'center',
//   alignItems: 'center',
//   margin: '4px',
// });
const RectangleBackgroundCab = styled(Box)({
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
const Cabin = styled(RectangleBackgroundCab)({
  backgroundImage: `url(${cabin})`, // Use the imported image directly
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  width: '130px',
  height: '100px',});

const CabinIcon = styled(LocationOnIcon)({
  fontSize: '48px', // Medium-large size
  color: '#4CAF50', // Green color
  position: 'absolute',
});

// Conference Room Component
const ConferenceRoom = styled(Box)({
  backgroundImage: `url(${conerenceroom})`, // Use the imported image directly
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  width: '200px',
  height: '100px',
});



const ConferenceRoomIcon = styled(LocationOnIcon)({
  fontSize: '90px', // Large size
  color: '#FFA500', // Orange color
  position: 'absolute',
  
});

// Partition Component
const Partition = styled(Box)({
  backgroundColor: '#E0D7D2', // Neutral beige/taupe color for the wall
  height: '5px', 
  width: '170px',
  borderRadius: '4px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  color: '#FAFAFA',
  margin: '0px',
  boxShadow: `
    inset 0 4px 8px rgba(0, 0, 0, 0.2), // Softer inner shadow for a neutral wall
    0 6px 10px rgba(0, 0, 0, 0.1), // Lighter outer shadow for 3D effect
    0 7px 9px rgba(255, 255, 255, 0.2) // Subtle light reflection on top
  `,
  transform: 'perspective(9px) rotateX(18deg) rotateY(1deg)',
  background: 'linear-gradient(145deg, #F5F3F2, #E0D7D2, #D1C9C2)', // Lighter gradient for a softer look
  borderTop: '2px solid rgba(255, 255, 255, 0.4)', // Light top border for soft highlight
  borderBottom: '2px solid rgba(0, 0, 0, 0.1)', // Softer bottom border for subtle shadow
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
const CabinComponent = ({style}) => (
  <Draggable>
    <div style={style}>
    <Cabin>
    <Typography sx={{fontColor:'white'}}>Cabin</Typography>
    </Cabin>
    </div>
  </Draggable>
);

// Conference Room Component with Draggable
const ConferenceRoomComponent = ({style}) => (
  <Draggable>
    <div style={style}>
    <ConferenceRoom>
      <Typography sx={{fontColor:'white'}}>Conference <br/> Room</Typography>
    </ConferenceRoom>
    </div>
  </Draggable>
);

// Partition Component with Draggable
const PartitionComponent = ({style }) => (
  <Draggable>
    <div style={style}>
    <Partition />
    </div>
  </Draggable>
);

// Entry Point Component with Draggable
const EntryPointComponent = ({style }) => (
  <Draggable>
    <div style={style}>
    <EntryPointContainer>
      <ArrowIcon />
      <EntranceText>Entrance</EntranceText>
    </EntryPointContainer>
    </div>
  </Draggable>
);

export { Seat, CabinComponent as Cabin, ConferenceRoomComponent as ConferenceRoom, PartitionComponent as Partition, EntryPointComponent as EntryPoint };
