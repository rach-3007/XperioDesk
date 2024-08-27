import React from 'react';
import { Box } from '@mui/material';
import { styled } from '@mui/system';
// Seat Container
const SeatContainer = styled(Box)({
    // backgroundColor: '#718096',
    height: '60px', // Increased height to accommodate backrest
    width: '50px',
    borderRadius: '4px',
    display: 'flex',
    flexDirection: 'column', // Column direction to stack backrest and seat area
    justifyContent: 'flex-end', // Align items to the bottom to make space for the backrest
    alignItems: 'center',
    color: '#FAFAFA',
    margin: '4px',
  });
  
  // Seat Area
  const SeatArea = styled(Box)({
    backgroundColor: '#4A5568',
    height: '20px', // Seating area height
    width: '30px',
    borderTopLeftRadius: '4px',
    borderTopRightRadius: '4px',
    borderBottomLeftRadius: '2px',
    borderBottomRightRadius: '2px',
  });
  
  // Backrest
  const Backrest = styled(Box)({
    backgroundColor: '#2D3748',
    height: '10px', // Backrest height
    width: '35px',
    borderTopLeftRadius: '4px',
    borderTopRightRadius: '4px',
    borderBottomLeftRadius: '2px',
    borderBottomRightRadius: '2px',
  });
  
  const Seat = () => {
    return (
      <SeatContainer>
        <Backrest />
        <SeatArea />
      </SeatContainer>
    );
  };
const ConferenceRoom = styled(Box)({
  backgroundColor: '#4A5568',
  height: '100px',
  width: '10px',
  borderRadius: '4px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  color: '#FAFAFA',
  margin: '4px',
});

const Cabin = styled(Box)({
  backgroundColor: '#2D3748',
  height: '75px',
  width: '75px',
  borderRadius: '4px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  color: '#FAFAFA',
  margin: '4px',
});

const Partition = styled(Box)({
  backgroundColor: '#2C5282',
  height: '50px',
  width: '200px',
  borderRadius: '4px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  color: '#FAFAFA',
  margin: '4px',
});

export { Seat, ConferenceRoom, Cabin, Partition };
