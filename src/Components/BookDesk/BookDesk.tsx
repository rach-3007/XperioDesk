import React, { useEffect, useState } from 'react';
import { Seat, Cabin, ConferenceRoom, Partition, EntryPoint } from '../ManageLayout/OfficeElements';
import BookingModal from './BookingModal'; // Import BookingModal component
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
const BookDesk = () => {
  const [layout, setLayout] = useState(null);
  const [error, setError] = useState(null);
  const [selectedSeat, setSelectedSeat] = useState(null); // State to manage selected seat
  const [isModalOpen, setIsModalOpen] = useState(false); // State to manage modal visibility


  // Fetch layout from the backend
  useEffect(() => {
    const fetchLayout = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/layouts/16/entities');
        if (!response.ok) {
          throw new Error('Failed to fetch layout data');
        }
        const data = await response.json();
        console.log('Fetched layout data:', data);
        setLayout(data.layout);
      } catch (error) {
        setError(error.message);
      }
    };
  
    fetchLayout();
  }, []);
  
  // Function to handle seat click
  const handleSeatClick = (seat) => {
    console.log('Seat clicked:', seat); 
    setSelectedSeat(seat); // Set selected seat
    setIsModalOpen(true);  // Open the modal
  };

  const renderEntity = (entity) => {
    console.log('Entity Data:', entity);
    const { type, rotation } = entity;
    const xPosition = parseInt(entity['x_position'], 10) || 0; 
    const yPosition = parseInt(entity['y_position'], 10) || 0;
  
    const commonProps = {
      style: {
        position: 'relative',
        left: `${xPosition}px`,
        top: `${yPosition}px`,
        transform: `rotate(${rotation}deg)`,
      },
      draggable: false,
      onClick: () => handleSeatClick(entity), // Add onClick to handle seat click
    };

    switch (type.toLowerCase()) {
      case 'seat':
        return <Seat key={entity.id} {...commonProps}/>;
      case 'cabin':
        return <Cabin key={entity.id} {...commonProps} />;
      case 'conference_room':
        return <ConferenceRoom key={entity.id} {...commonProps} />;
      case 'partition':
        return <Partition key={entity.id} {...commonProps} />;
      case 'entry_point':
        return <EntryPoint key={entity.id} {...commonProps} />;
      default:
        return null;
    }
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      {layout ? layout.original.layout_entities.map((entity) => renderEntity(entity)) : <p>Loading...</p>}
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <BookingModal 
        open={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        seat={selectedSeat} // Pass selected seat to BookingModal
      />
      </LocalizationProvider>
    </div>
  );
};

export default BookDesk;
