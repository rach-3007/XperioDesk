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
import { Snackbar, Alert } from "@mui/material"; // Import Snackbar and Alert for notifications

const BookDesk = () => {
  const [layouts, setLayouts] = useState([]);
  const [layout, setLayout] = useState(null);
  const [selectedLayoutId, setSelectedLayoutId] = useState("");
  const [error, setError] = useState(null);
  const [selectedSeat, setSelectedSeat] = useState(null); // State to manage selected seat
  const [isModalOpen, setIsModalOpen] = useState(false); // State to manage modal visibility
  const [snackbarOpen, setSnackbarOpen] = useState(false); // State to manage Snackbar visibility
  const [bookedByUser, setBookedByUser] = useState("");

   // Fetch available layouts when the component mounts
   useEffect(() => {
    const fetchAvailableLayouts = async () => {
      try {
        const accessToken = localStorage.getItem("accessToken");
        const response = await fetch("http://127.0.0.1:8000/api/layouts", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch available layouts");
        }
        const data = await response.json();
        console.log("Fetched layouts data:", data); // Log the fetched data
        setLayouts(data || []);
      } catch (error) {
        setError(error.message);
      }
    };
  
    fetchAvailableLayouts();
  }, []);


  // Fetch layout entities based on the selected layout ID
  useEffect(() => {
    const fetchLayout = async () => {
      if (!selectedLayoutId) return; // Exit if no layout is selected

      try {
        const accessToken = localStorage.getItem("accessToken");
        const response = await fetch(
          `http://127.0.0.1:8000/api/layouts/${selectedLayoutId}/entities`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${accessToken}`, // Include the access token
              "Content-Type": "application/json",
            },
          }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch layout data");
        }
        const data = await response.json();
        console.log("Fetched layout data:", data); // Log fetched layout data
        setLayout(data.layout || null); // Ensure layout is properly set
      } catch (error) {
        setError(error.message);
      }
    };

    fetchLayout();
  }, [selectedLayoutId , isModalOpen]);

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

  const handleBookingSuccess = (updatedSeat) => {
    // Update the seat status in the layout state
    setLayout((prevLayout) => {
      const updatedEntities = prevLayout.original.layout_entities.map((entity) =>
        entity.id === updatedSeat.id ? { ...entity, seat: updatedSeat.seat } : entity
      );
      return {
        ...prevLayout,
        original: {
          ...prevLayout.original,
          layout_entities: updatedEntities,
        },
      };
    });
    setIsModalOpen(false); // Close the modal after booking
  };



  const renderEntity = (entity) => {
    // console.log("Entity Data:", entity);
    const { type, rotation} = entity;
    const status = entity.seat?.status;
    const xPosition = parseFloat(entity["x_position"]) || 0;
    const yPosition = parseFloat(entity["y_position"]) || 0;

    const backrestStyle = {
      backgroundColor: status === 'booked' ? 'red' : status === 'permanently_booked' ? '#252423' : 'green',
    };
  
    const seatAreaStyle = {
      backgroundColor: status === 'booked' ? 'lightcoral' : status === 'permanently_booked' ? '#5c5956' : 'lightgreen',
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
    // console.log(commonProps);
    switch (type.toLowerCase()) {
      case "seat":
        return <Seat key={entity.id} {...commonProps} backrestStyle={backrestStyle} seatAreaStyle={seatAreaStyle}/>;
      case "cabin":
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
    <div style={{ position: "relative", width: "100%", height: "100%" }}>
      <div style={{position:"absolute",top:0,left:0,marginBottom: 20, width:100 , backgroundColor:"#202a44" }}>
      <select
        value={selectedLayoutId}
        onChange={(e) => setSelectedLayoutId(e.target.value)}
        style={{ padding: '8px', fontSize: '16px' }}
      >
        <option value="">Select a layout</option>
        {layouts.map((layout) => (
          <option key={layout.id} value={layout.id}>
            {layout.id}.  {layout.layout_name}
          </option>
        ))}
      </select>
</div>
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
          onBookingSuccess={handleBookingSuccess} // Pass the booking success handler
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
