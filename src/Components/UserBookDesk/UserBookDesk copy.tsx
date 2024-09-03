import React, { useEffect, useState } from 'react';
import { Seat, Cabin, ConferenceRoom, Partition, EntryPoint } from './OfficeElements';
import BookingModal from './BookingModal'; // Import the BookingModal

const modules = [
  { id: 1, name: 'Module 1' },
  { id: 2, name: 'Module 2' },
  // Add more modules as needed
];

const BookDesk = () => {
  const [layout, setLayout] = useState(null);
  const [error, setError] = useState(null);
  const [selectedModule, setSelectedModule] = useState(modules[0]?.id || null);
  const [bookingDate, setBookingDate] = useState('');
  const [maxDate, setMaxDate] = useState('');
  const [modalOpen, setModalOpen] = useState(false); // State for modal visibility
  const [selectedSeat, setSelectedSeat] = useState(null); // State for selected seat

  useEffect(() => {
    const today = new Date();
    const maxDate = new Date();
    maxDate.setDate(today.getDate() + 2);
    setMaxDate(maxDate.toISOString().split('T')[0]);

    const fetchLayout = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/api/layouts/6/entities`);
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
  }, [selectedModule]);

  const handleModuleChange = (event) => {
    setSelectedModule(event.target.value);
  };

  const handleDateChange = (event) => {
    setBookingDate(event.target.value);
  };

  const openBookingModal = (seat) => {
    setSelectedSeat(seat);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedSeat(null); // Clear the selected seat when closing the modal
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
      onClick: type.toLowerCase() === 'seat' ? () => openBookingModal(entity) : undefined // Open modal if it's a seat
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
    <div>
      <div style={{ padding: '10px', backgroundColor: '#f5f5f5' }}>
        <label htmlFor="module-select">Select Module:</label>
        <select id="module-select" value={selectedModule} onChange={handleModuleChange}>
          {modules.map(module => (
            <option key={module.id} value={module.id}>{module.name}</option>
          ))}
        </select>

        <label htmlFor="booking-date" style={{ marginLeft: '20px' }}>Booking Date:</label>
        <input
          type="date"
          id="booking-date"
          value={bookingDate}
          onChange={handleDateChange}
          min={new Date().toISOString().split('T')[0]}
          max={maxDate}
        />
      </div>

      <div style={{ position: 'relative', width: '100%', height: '100%' }}>
        {layout ? layout.original.layout_entities.map((entity) => renderEntity(entity)) : <p>Loading...</p>}
      </div>

      {/* Render the BookingModal */}
      {selectedSeat && (
        <BookingModal 
          open={modalOpen} 
          onClose={handleCloseModal} 
          seat={selectedSeat} // Pass the selected seat details
        />
      )}
    </div>
  );
};

export default BookDesk;
