import React, { useEffect, useState } from "react";
import {
  Seat,
  Cabin,
  ConferenceRoom,
  Partition,
  EntryPoint,
} from "./OfficeElements";
import BookingModal from './BookingModal';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { Snackbar, Alert } from "@mui/material";

const BookDesk = () => {
  const [layouts, setLayouts] = useState([]);
  const [layout, setLayout] = useState(null);
  const [selectedLayoutId, setSelectedLayoutId] = useState("");
  const [error, setError] = useState(null);
  const [selectedSeat, setSelectedSeat] = useState(null); 
  const [isModalOpen, setIsModalOpen] = useState(false); 
  const [snackbarOpen, setSnackbarOpen] = useState(false); 
  const [snackbarMessage, setSnackbarMessage] = useState("");

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


  const Legend = () => (
    <div
      style={{
        position: "absolute",
        top:40,
        left: 0,
        padding: "10px",
        backgroundColor: "white",
        border: "1px solid #ccc",
        borderRadius: "5px",
        
      }}
    >
      <h4 style={{ margin: "0 0 10px 0" }}></h4>
      <div style={{ display: "flex", alignItems: "center", marginBottom: "5px" }}>
        <div
          style={{
            width: "20px",
            height: "20px",
            backgroundColor: "green",
            marginRight: "10px",
          }}
        ></div>
        <span style={{ color: "#000" }}>Available Seat</span> {/* Changed text color */}
      </div>
      <div style={{ display: "flex", alignItems: "center", marginBottom: "5px" }}>
        <div
          style={{
            width: "20px",
            height: "20px",
            backgroundColor: "red",
            marginRight: "10px",
          }}
        ></div>
        <span style={{ color: "#000" }}>Booked Seat</span> {/* Changed text color */}
      </div>
      <div style={{ display: "flex", alignItems: "center", marginBottom: "5px" }}>
        <div
          style={{
            width: "20px",
            height: "20px",
            backgroundColor: "#252423",
            marginRight: "10px",
          }}
        ></div>
        <span style={{ color: "#000" }}>Permanently Booked Seat</span> {/* Changed text color */}
      </div>
    </div>
  );
  
   
  
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
  }, [selectedLayoutId, isModalOpen]);

  // Function to handle seat click
  const handleSeatClick = (entity) => {
    console.log("Entity clicked:", entity);
    const seat = entity.seat;
    if (seat.status === "booked" || seat.status === "permanently_booked") {
      setSnackbarMessage("Seat is already booked by someone else.");
      setSnackbarOpen(true);
      return;
    }
    setSelectedSeat(entity); // Set selected seat
    setIsModalOpen(true); // Open the modal
  };

  const renderEntity = (entity) => {
    if (!entity) return null; // Guard clause to avoid errors
    console.log("Entity Data:", entity);
    const { type, rotation } = entity;
    const status = entity.seat?.status;
    const xPosition = parseFloat(entity["x_position"])+250 || 0;
    const yPosition = parseFloat(entity["y_position"]) || 0;

    const backrestStyle = {
      backgroundColor:
        status === "booked"
          ? "red"
          : status === "permanently_booked"
          ? "#252423"
          : "green",
    };

    const seatAreaStyle = {
      backgroundColor:
        status === "booked"
          ? "lightcoral"
          : status === "permanently_booked"
          ? "#5c5956"
          : "lightgreen",
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

    switch (type.toLowerCase()) {
      case "seat":
        return (
          <Seat
            key={entity.id}
            {...commonProps}
            backrestStyle={backrestStyle}
            seatAreaStyle={seatAreaStyle}
          />
        );
      case "cabin":
        return <Cabin key={entity.id} {...commonProps} />;
      case "conference":
        return <ConferenceRoom key={entity.id} {...commonProps} />;
      case "partition":
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
    <div style={{ position: "relative",top:0,left:0, width: "86%", height: "100%", marginTop: 60, backgroundColor:"#f5f5dc" }}>
      {/* Dropdown to select the layout */}
      <div style={{position:"absolute",top:0,left:0, marginBottom: 20, width:100 , backgroundColor:"#202a44" }}>
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
        <>
          {layout.original?.layout_entities?.map((entity) =>
            renderEntity(entity)
          ) || <p>No entities available for this layout.</p>}
          {/* Render Legend after the layout loads */}
          <Legend />
        </>
      ) : (
        <p>Loading layout...</p>
      )}
      
      <LocalizationProvider dateAdapter={AdapterDateFns}>
      
        <BookingModal
          open={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          seat={selectedSeat} // Pass selected seat to BookingModal
        />
      </LocalizationProvider>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
      >
        <Alert onClose={() => setSnackbarOpen(false)} severity="warning">
          {snackbarMessage}
        </Alert>
      </Snackbar>
      
    </div>
  );
};

export default BookDesk;
