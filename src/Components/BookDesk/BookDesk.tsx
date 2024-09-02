import React, { useEffect, useState, useCallback } from 'react';
import { Seat, Cabin, ConferenceRoom, Partition, EntryPoint } from '../ManageLayout/OfficeElements';
import BookingModal from './BookingModal';

const ViewLayout = () => {
  const [layout, setLayout] = useState(null);
  const [error, setError] = useState(null);
  const [selectedSeat, setSelectedSeat] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSeatClick = useCallback((seat) => {
    setSelectedSeat(seat);
    setIsModalOpen(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
    setSelectedSeat(null);
  }, []);

  useEffect(() => {
    const fetchLayout = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/layouts/1/entities');
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

  const renderEntity = (entity) => {
    const { type, rotation, id } = entity;
    const xPosition = entity['x-position'];
    const yPosition = entity['y-position'];

    const commonProps = {
      style: {
        position: 'absolute',
        left: `${xPosition}px`,
        top: `${yPosition}px`,
        transform: `rotate(${rotation}deg)`,
        cursor: type.toLowerCase() === 'seat' ? 'pointer' : 'default',
      },
      onClick: () => {
        if (type.toLowerCase() === 'seat') {
          handleSeatClick(entity);
        }
      },
    };

    switch (type.toLowerCase()) {
      case 'seat':
        return <Seat key={id} {...commonProps} />;
      case 'cabin':
        return <Cabin key={id} {...commonProps} />;
      case 'conference_room':
        return <ConferenceRoom key={id} {...commonProps} />;
      case 'partition':
        return <Partition key={id} {...commonProps} />;
      case 'entry_point':
        return <EntryPoint key={id} {...commonProps} />;
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
      {selectedSeat && (
        <BookingModal
          open={isModalOpen}
          onClose={handleCloseModal}
          selectedSeat={selectedSeat}
        />
      )}
    </div>
  );
};

export default ViewLayout;
