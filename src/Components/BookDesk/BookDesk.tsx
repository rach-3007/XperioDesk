<<<<<<< HEAD
import React, { useEffect, useState } from 'react';
import { Seat, Cabin, ConferenceRoom, Partition, EntryPoint } from './OfficeElements';
import BookingModal from './BookingModal'; // Import the BookingModal

const modules = [
  { id: 1, name: 'Module 1' },
  { id: 2, name: 'Module 2' },
  // Add more modules as needed
];
=======
import React, { useEffect, useState } from "react";
import {
  Seat,
  Cabin,
  ConferenceRoom,
  Partition,
  EntryPoint,
} from "../ManageLayout/OfficeElements";
import BookingModal from './BookingModal';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
>>>>>>> a4293540fb499591f5dcc70d97998fe0bd53cd9b

const BookDesk = () => {
  const [layout, setLayout] = useState(null);
  const [error, setError] = useState(null);
<<<<<<< HEAD
  const [selectedModule, setSelectedModule] = useState(modules[0]?.id || null);
  const [bookingDate, setBookingDate] = useState('');
  const [maxDate, setMaxDate] = useState('');
  const [modalOpen, setModalOpen] = useState(false); // State for modal visibility
  const [selectedSeat, setSelectedSeat] = useState(null); // State for selected seat
=======
  const [selectedSeat, setSelectedSeat] = useState(null); // State to manage selected seat
  const [isModalOpen, setIsModalOpen] = useState(false); // State to manage modal visibility
>>>>>>> a4293540fb499591f5dcc70d97998fe0bd53cd9b

  useEffect(() => {
    const today = new Date();
    const maxDate = new Date();
    maxDate.setDate(today.getDate() + 2);
    setMaxDate(maxDate.toISOString().split('T')[0]);

    const fetchLayout = async () => {
      try {
<<<<<<< HEAD
        const response = await fetch(`http://127.0.0.1:8000/api/layouts/6/entities`);
=======
        const accessToken = localStorage.getItem("accessToken");
        const response = await fetch("http://127.0.0.1:8000/api/layouts/86/entities", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`, // Include the access token
        "Content-Type": "application/json",
      },
    });
>>>>>>> a4293540fb499591f5dcc70d97998fe0bd53cd9b
        if (!response.ok) {
          throw new Error("Failed to fetch layout data");
        }
        const data = await response.json();
<<<<<<< HEAD
        console.log('Fetched layout data:', data);
=======
        console.log("Fetched layout data:", data); // Add this line
>>>>>>> a4293540fb499591f5dcc70d97998fe0bd53cd9b
        setLayout(data.layout);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchLayout();
<<<<<<< HEAD
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
=======
  }, []);

  // Function to handle seat click
  const handleSeatClick = (seat) => {
    console.log('Seat clicked:', seat);
    setSelectedSeat(seat); // Set selected seat
    setIsModalOpen(true);  // Open the modal
>>>>>>> a4293540fb499591f5dcc70d97998fe0bd53cd9b
  };

  const renderEntity = (entity) => {
    console.log("Entity Data:", entity);
    const { type, rotation} = entity;
    const status = entity.seat?.status;
    const xPosition = parseFloat(entity["x_position"]) || 0;
    const yPosition = parseFloat(entity["y_position"]) || 0;

    const backrestStyle = {
      backgroundColor: status === 'booked' ? 'red' : status === 'permanently_booked' ? '#686D76' : 'green',
    };
  
    const seatAreaStyle = {
      backgroundColor: status === 'booked' ? 'lightcoral' : status === 'permanently_booked' ? '#EEEEEE' : 'lightgreen',
    };

    const commonProps = {
      style: {
        position: "relative",
        left: `${xPosition}px`,
        top: `${yPosition}px`,
        transform: `rotate(${rotation}deg)`,
      },
<<<<<<< HEAD
      onClick: type.toLowerCase() === 'seat' ? () => openBookingModal(entity) : undefined // Open modal if it's a seat
=======
      draggable: false,
      onClick: () => handleSeatClick(entity),
>>>>>>> a4293540fb499591f5dcc70d97998fe0bd53cd9b
    };

    switch (type.toLowerCase()) {
      case "seat":
        return <Seat key={entity.id} {...commonProps} backrestStyle={backrestStyle} seatAreaStyle={seatAreaStyle}/>;
      case "cabin":
        return <Cabin key={entity.id} {...commonProps} />;
      case "conference":
        return <ConferenceRoom key={entity.id} {...commonProps} />;
      case "partition":
        console.log(entity.id)
        return <Partition key={entity.id} {...commonProps} />;
      case "entrance":
        return <EntryPoint key={entity.id} {...commonProps} />;
      default:
        return null;
    }
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
<<<<<<< HEAD
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
=======
    <div style={{ position: "relative", width: "100%", height: "100%" }}>
      {layout ? (
        layout.original.layout_entities.map((entity) => renderEntity(entity))
      ) : (
        <p>Loading...</p>
      )}
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <BookingModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        seat={selectedSeat} // Pass selected seat to BookingModal
      />
      </LocalizationProvider>
>>>>>>> a4293540fb499591f5dcc70d97998fe0bd53cd9b
    </div>
  );
};

export default BookDesk;
