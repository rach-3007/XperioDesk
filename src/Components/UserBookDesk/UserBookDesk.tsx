import React, { useEffect, useState } from 'react';
import styles from './UserBookDesk.module.css'; // Importing the CSS module
import { Seat, Cabin, ConferenceRoom, Partition, EntryPoint } from '../ManageLayout/OfficeElements';
import BookingModal from './BookingModal';
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
 
const modules = [
  { id: 1, name: 'Module 1' },
  { id: 2, name: 'Module 2' },
];
 
const UserBookDesk = () => {
  const [layout, setLayout] = useState(null);
  const [error, setError] = useState(null);
  const [selectedModule, setSelectedModule] = useState(modules[0]?.id || null);
  const [bookingDate, setBookingDate] = useState('');
  const [maxDate, setMaxDate] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedSeat, setSelectedSeat] = useState(null);
  const [availabilityMessage, setAvailabilityMessage] = useState('');
 
  useEffect(() => {
    const today = new Date();
    const maxDate = new Date();
    maxDate.setDate(today.getDate() + 2);
    setMaxDate(maxDate.toISOString().split('T')[0]);
 
    const fetchLayout = async () => {
      try {
        const accessToken = localStorage.getItem("accessToken");
        const response = await fetch(`http://127.0.0.1:8000/api/layouts/86/entities`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`, // Include the access token
            "Content-Type": "application/json",
          },
        });
 
        if (!response.ok) {
          throw new Error('Failed to fetch layout data');
        }
        const data = await response.json();
        console.log("Fetched layout data:", data);
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
    setSelectedSeat(null);
  };
 
  const checkSeatAvailability = async (seatId) => {
    if (!bookingDate) {
      setAvailabilityMessage('Please select a date first.');
      return;
    }
 
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/seats/${seatId}/availability?start_date=${bookingDate}&end_date=${bookingDate}`);
      const data = await response.json();
      if (response.ok) {
        setAvailabilityMessage(data.message);
      } else {
        setAvailabilityMessage(data.error || 'Error checking availability.');
      }
    } catch (error) {
      setAvailabilityMessage('Error checking availability.');
    }
  };
 
  const renderEntity = (entity) => {
    const { type, rotation } = entity;
    const xPosition = parseInt(entity['x_position'], 10) || 0;
    const yPosition = parseInt(entity['y_position'], 10) || 0;
    const status = entity.status;
 
    const backrestStyle = {
      backgroundColor: status === 'booked' ? 'red' : status === 'permanently_booked' ? '#686D76' : 'green',
    };
 
    const seatAreaStyle = {
      backgroundColor: status === 'booked' ? 'lightcoral' : status === 'permanently_booked' ? '#EEEEEE' : 'lightgreen',
    };
 
    const commonProps = {
      style: {
        position: 'absolute',
        left: `${xPosition}px`,
        top: `${yPosition}px`,
        transform: `rotate(${rotation}deg)`,
        cursor: type.toLowerCase() === 'seat' ? 'pointer' : 'default',
        transition: 'transform 0.5s ease-in-out, box-shadow 0.3s ease-in-out',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      },
      onClick: type.toLowerCase() === 'seat' ? () => openBookingModal(entity) : undefined,
      onMouseEnter: type.toLowerCase() === 'seat' ? () => checkSeatAvailability(entity.id) : undefined,
      onMouseLeave: () => setAvailabilityMessage(''),
    };
 
    switch (type.toLowerCase()) {
      case 'seat':
        return <Seat key={entity.id} seatId={entity.id} {...commonProps} backrestStyle={backrestStyle} seatAreaStyle={seatAreaStyle} />;
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
    return <div className={styles.error}>Error: {error}</div>;
  }
 
  return (
<div className={styles.container}>
<nav className={styles.nav}>
        {/* Your nav content */}
</nav>
 
      <div className={styles.controlsContainer}>
<div className={styles.control}>
<label htmlFor="module-select" className={styles.label}>Select Module:</label>
<select id="module-select" value={selectedModule} onChange={handleModuleChange} className={styles.dropdown}>
            {modules.map(module => (
<option key={module.id} value={module.id}>{module.name}</option>
            ))}
</select>
 
          <label htmlFor="booking-date" className={styles.label}>Booking Date:</label>
<input
            type="date"
            id="booking-date"
            value={bookingDate}
            onChange={handleDateChange}
            min={new Date().toISOString().split('T')[0]}
            max={maxDate}
            className={styles.dateInput}
          />
</div>
</div>
 
      <div className={styles.layoutContainer}>
<TransformWrapper>
<TransformComponent>
<div className={styles.layout}>
              {layout ? layout.original.layout_entities.map((entity) => renderEntity(entity)) : <p>Loading layout...</p>}
</div>
</TransformComponent>
</TransformWrapper>
</div>
 
      {availabilityMessage && (
<div className={styles.availabilityMessage}>
          {availabilityMessage}
</div>
      )}
 
      {selectedSeat && (
<LocalizationProvider dateAdapter={AdapterDateFns}>
<BookingModal
            open={modalOpen}
            onClose={handleCloseModal}
            seatId={selectedSeat}
          />
</LocalizationProvider>
      )}
</div>
  );
};
 
export default UserBookDesk;