import React, { useEffect, useState } from 'react';
import { Seat, Cabin, ConferenceRoom, Partition, EntryPoint } from '../ManageLayout/OfficeElements';
import BookingModal from './BookingModal'; // Import BookingModal component
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { Snackbar, Alert } from "@mui/material"; // Import Snackbar and Alert for notifications

const BookDesk = () => {
  const [layout, setLayout] = useState(null);
  const [error, setError] = useState(null);
  const [selectedSeat, setSelectedSeat] = useState(null); // State to manage selected seat
  const [isModalOpen, setIsModalOpen] = useState(false); // State to manage modal visibility
  const [snackbarOpen, setSnackbarOpen] = useState(false); // State to manage Snackbar visibility
  const [bookedByUser, setBookedByUser] = useState("");

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

  const fetchUserName = async (userId) => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const response = await fetch(`http://127.0.0.1:8000/api/users/${userId}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`, // Include the access token
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch user data");
      }
      const userData = await response.json();
      setBookedByUser(userData.name); // Set the fetched user's name
    } catch (error) {
      console.error("Error fetching user data:", error);
      setBookedByUser("Unknown user"); // Handle errors gracefully
    }
  };


  const handleSeatClick = (seat) => {
    console.log("Seat clicked:", seat);
    const { status, booked_by_user_id } = seat.seat || {};

    if (status === "booked" || status === "permanently_booked") {
      // Fetch the user's name using booked_by_user_id
      if (booked_by_user_id) {
        fetchUserName(booked_by_user_id);
      }
      setSnackbarOpen(true);
      setIsModalOpen(false); // Do not open the modal for booked seats
    } else {
      setSelectedSeat(seat); // Set selected seat
      setIsModalOpen(true); // Open the modal for available seats
      setBookedByUser(""); // Reset the booked user name
    }
  };
  const renderEntity = (entity) => {
    // console.log("Entity Data:", entity);
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
        position: 'relative',
        left: `${xPosition}px`,
        top: `${yPosition}px`,
        transform: `rotate(${rotation}deg)`,
      },
      draggable: false,
      onClick: () => handleSeatClick(entity), // Add onClick to handle seat click
    };
    // console.log(commonProps);
    switch (type.toLowerCase()) {
      case 'seat':
        return <Seat key={entity.id} {...commonProps}/>;
      case 'cabin':
        return <Cabin key={entity.id} {...commonProps} />;
      case "conference":
        return <ConferenceRoom key={entity.id} {...commonProps} />;
      case "partition":
        // console.log(entity.id)
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
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      {layout ? layout.original.layout_entities.map((entity) => renderEntity(entity)) : <p>Loading...</p>}
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <BookingModal 
        open={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        seat={selectedSeat} // Pass selected seat to BookingModal
      />
      </LocalizationProvider>
      {/* Snackbar to show the name of the user who booked the seat */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={4000}
        onClose={() => setSnackbarOpen(false)}
      >
        <Alert
          onClose={() => setSnackbarOpen(false)}
          severity="info"
          sx={{ width: "100%" }}
        >
          This seat is booked by {bookedByUser}.
        </Alert>
      </Snackbar>
    </div>
  );
};
  

export default BookDesk;
