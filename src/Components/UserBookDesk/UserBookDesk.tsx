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
 
 
 
const BookDesk = () => {
  const [layout, setLayout] = useState(null);
  const [error, setError] = useState(null);
  const [selectedSeat, setSelectedSeat] = useState(null); // State to manage selected seat
  const [isModalOpen, setIsModalOpen] = useState(false); // State to manage modal visibility
 
  // Fetch layout from the backend
  useEffect(() => {
    const fetchLayout = async () => {
      try {
        const accessToken = localStorage.getItem("accessToken");
        const response = await fetch("http://127.0.0.1:8000/api/layouts/86/entities", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`, // Include the access token
        "Content-Type": "application/json",
      },
    });
        if (!response.ok) {
          throw new Error("Failed to fetch layout data");
        }
        const data = await response.json();
        console.log("Fetched layout data:", data); // Add this line
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
      draggable: false,
      onClick: () => handleSeatClick(entity),
    };
    console.log(commonProps);
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
    <div style={{ position: "relative", width: "100%", height: "100%", marginTop:50 }}>
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
    </div>
  );
};
 
export default BookDesk;