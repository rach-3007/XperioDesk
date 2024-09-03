// import React, { useEffect, useState } from 'react';
// import { Seat, Cabin, ConferenceRoom, Partition, EntryPoint } from './OfficeElements';
// import BookingModal from './BookingModal'; // Import the BookingModal

// const modules = [
//   { id: 1, name: 'Module 1' },
//   { id: 2, name: 'Module 2' },
//   // Add more modules as needed
// ];

// const BookDesk = () => {
//   const [layout, setLayout] = useState(null);
//   const [error, setError] = useState(null);
//   const [selectedModule, setSelectedModule] = useState(modules[0]?.id || null);
//   const [bookingDate, setBookingDate] = useState('');
//   const [maxDate, setMaxDate] = useState('');
//   const [modalOpen, setModalOpen] = useState(false); // State for modal visibility
//   const [selectedSeat, setSelectedSeat] = useState(null); // State for selected seat

//   useEffect(() => {
//     const today = new Date();
//     const maxDate = new Date();
//     maxDate.setDate(today.getDate() + 2);
//     setMaxDate(maxDate.toISOString().split('T')[0]);

//     const fetchLayout = async () => {
//       try {
//         const response = await fetch(`http://127.0.0.1:8000/api/layouts/6/entities`);
//         if (!response.ok) {
//           throw new Error('Failed to fetch layout data');
//         }
//         const data = await response.json();
//         console.log('Fetched layout data:', data);
//         setLayout(data.layout);
//       } catch (error) {
//         setError(error.message);
//       }
//     };

//     fetchLayout();
//   }, [selectedModule]);

//   const handleModuleChange = (event) => {
//     setSelectedModule(event.target.value);
//   };

//   const handleDateChange = (event) => {
//     setBookingDate(event.target.value);
//   };

//   const openBookingModal = (seat) => {
//     setSelectedSeat(seat);
//     setModalOpen(true);
//   };

//   const handleCloseModal = () => {
//     setModalOpen(false);
//     setSelectedSeat(null); // Clear the selected seat when closing the modal
//   };

//   const renderEntity = (entity) => {
//     console.log('Entity Data:', entity);
//     const { type, rotation } = entity;
//     const xPosition = parseInt(entity['x_position'], 10) || 0; 
//     const yPosition = parseInt(entity['y_position'], 10) || 0;
  
//     const commonProps = {
//       style: {
//         position: 'relative',
//         left: `${xPosition}px`,
//         top: `${yPosition}px`,
//         transform: `rotate(${rotation}deg)`,
//       },
//       onClick: type.toLowerCase() === 'seat' ? () => openBookingModal(entity) : undefined // Open modal if it's a seat
//     };

//     switch (type.toLowerCase()) {
//       case 'seat':
//         return <Seat key={entity.id} {...commonProps}/>;
//       case 'cabin':
//         return <Cabin key={entity.id} {...commonProps} />;
//       case 'conference_room':
//         return <ConferenceRoom key={entity.id} {...commonProps} />;
//       case 'partition':
//         return <Partition key={entity.id} {...commonProps} />;
//       case 'entry_point':
//         return <EntryPoint key={entity.id} {...commonProps} />;
//       default:
//         return null;
//     }
//   };

//   if (error) {
//     return <div>Error: {error}</div>;
//   }

//   return (
//     <div>
//       <div style={{ padding: '10px', backgroundColor: '#f5f5f5' }}>
//         <label htmlFor="module-select">Select Module:</label>
//         <select id="module-select" value={selectedModule} onChange={handleModuleChange}>
//           {modules.map(module => (
//             <option key={module.id} value={module.id}>{module.name}</option>
//           ))}
//         </select>

//         <label htmlFor="booking-date" style={{ marginLeft: '20px' }}>Booking Date:</label>
//         <input
//           type="date"
//           id="booking-date"
//           value={bookingDate}
//           onChange={handleDateChange}
//           min={new Date().toISOString().split('T')[0]}
//           max={maxDate}
//         />
//       </div>

//       <div style={{ position: 'relative', width: '100%', height: '100%' }}>
//         {layout ? layout.original.layout_entities.map((entity) => renderEntity(entity)) : <p>Loading...</p>}
//       </div>

//       {/* Render the BookingModal */}
//       {selectedSeat && (
//         <BookingModal 
//           open={modalOpen} 
//           onClose={handleCloseModal} 
//           seat={selectedSeat} // Pass the selected seat details
//         />
//       )}
//     </div>
//   );
// };

// export default BookDesk;
// -------------------------------------------

// import React, { useEffect, useState } from 'react';
// import { Seat, Cabin, ConferenceRoom, Partition, EntryPoint } from './OfficeElements';
// import BookingModal from './BookingModal'; 

// const modules = [
//   { id: 1, name: 'Module 1' },
//   { id: 2, name: 'Module 2' },
// ];

// const BookDesk = () => {
//   const [layout, setLayout] = useState(null);
//   const [error, setError] = useState(null);
//   const [selectedModule, setSelectedModule] = useState(modules[0]?.id || null);
//   const [bookingDate, setBookingDate] = useState('');
//   const [maxDate, setMaxDate] = useState('');
//   const [modalOpen, setModalOpen] = useState(false); 
//   const [selectedSeat, setSelectedSeat] = useState(null); 
//   const [hoveredSeat, setHoveredSeat] = useState(null); 
//   const [availabilityMessage, setAvailabilityMessage] = useState('');

//   useEffect(() => {
//     const today = new Date();
//     const maxDate = new Date();
//     maxDate.setDate(today.getDate() + 2);
//     setMaxDate(maxDate.toISOString().split('T')[0]);

//     const fetchLayout = async () => {
//       try {
//         const response = await fetch(`http://127.0.0.1:8000/api/layouts/6/entities`);
//         if (!response.ok) {
//           throw new Error('Failed to fetch layout data');
//         }
//         const data = await response.json();
//         setLayout(data.layout);
//       } catch (error) {
//         setError(error.message);
//       }
//     };

//     fetchLayout();
//   }, [selectedModule]);

//   const handleModuleChange = (event) => {
//     setSelectedModule(event.target.value);
//   };

//   const handleDateChange = (event) => {
//     setBookingDate(event.target.value);
//   };

//   const openBookingModal = (seat) => {
//     setSelectedSeat(seat);
//     setModalOpen(true);
//   };

//   const handleCloseModal = () => {
//     setModalOpen(false);
//     setSelectedSeat(null);
//   };

//   const checkSeatAvailability = async (seatId) => {
//     if (!bookingDate) {
//         setAvailabilityMessage('Please select a date first.');
//         return;
//     }

//     try {
//         const response = await fetch(`http://127.0.0.1:8000/api/seats/${seatId}/availability?start_date=${bookingDate}&end_date=${bookingDate}`);
//         const data = await response.json();
//         if (response.ok) {
//             setAvailabilityMessage(data.message);
//         } else {
//             setAvailabilityMessage(data.error || 'Error checking availability.');
//         }
//     } catch (error) {
//         setAvailabilityMessage('Error checking availability.');
//     }
// };


//   const renderEntity = (entity) => {
//     const { type, rotation } = entity;
//     const xPosition = parseInt(entity['x_position'], 10) || 0; 
//     const yPosition = parseInt(entity['y_position'], 10) || 0;
//     const status=entity.status;  // Ensure seatId is correctly mapped

//     const backrestStyle = {
//         backgroundColor: status === 'booked' ? 'red' : status === 'permanently_booked' ? '#686D76' : 'green',
//       };
   
//       const seatAreaStyle = {
//         backgroundColor: status === 'booked' ? 'lightcoral' : status === 'permanently_booked' ? '#EEEEEE' : 'lightgreen',
//       };
   
//     const commonProps = {
//       style: {
//         position: 'relative',
//         left: `${xPosition}px`,
//         top: `${yPosition}px`,
//         transform: `rotate(${rotation}deg)`,
//         seatId: entity.seatId || entity.id,  // Ensure seatId is correctly mapped

//       },
//       onClick: type.toLowerCase() === 'seat' ? () => openBookingModal(entity) : undefined,
//       onMouseEnter: type.toLowerCase() === 'seat' ? () => checkSeatAvailability(entity.id) : undefined,
//       onMouseLeave: () => setAvailabilityMessage(''), // Clear message on mouse leave
//     };

//     switch (type.toLowerCase()) {
        
//       case 'seat':
//         console.log("Rendering Seat with Props:", commonProps);

//         return <Seat seatId={entity.id} {...commonProps} backrestStyle={backrestStyle} seatAreaStyle={seatAreaStyle}/>;      case 'cabin':
//         return <Cabin key={entity.id} {...commonProps} />;
//       case 'conference_room':
//         return <ConferenceRoom key={entity.id} {...commonProps} />;
//       case 'partition':
//         return <Partition key={entity.id} {...commonProps} />;
//       case 'entry_point':
//         return <EntryPoint key={entity.id} {...commonProps} />;
//       default:
//         return null;
//     }
//   };

//   if (error) {
//     return <div>Error: {error}</div>;
//   }

//   return (
//     <div>
//       <div style={{ padding: '10px', backgroundColor: '#f5f5f5' }}>
//         <label htmlFor="module-select">Select Module:</label>
//         <select id="module-select" value={selectedModule} onChange={handleModuleChange}>
//           {modules.map(module => (
//             <option key={module.id} value={module.id}>{module.name}</option>
//           ))}
//         </select>

//         <label htmlFor="booking-date" style={{ marginLeft: '20px' }}>Booking Date:</label>
//         <input
//           type="date"
//           id="booking-date"
//           value={bookingDate}
//           onChange={handleDateChange}
//           min={new Date().toISOString().split('T')[0]}
//           max={maxDate}
//         />
//       </div>

//       <div style={{ position: 'relative', width: '100%', height: '100%' }}>
//         {layout ? layout.original.layout_entities.map((entity) => renderEntity(entity)) : <p>Loading...</p>}
//       </div>

//       {/* Show seat availability message */}
//       {availabilityMessage && (
//         <div style={{ position: 'fixed', bottom: '10px', left: '10px', backgroundColor: '#fff', padding: '10px', border: '1px solid #ccc' }}>
//           {availabilityMessage}
//         </div>
//       )}

//       {/* Render the BookingModal */}
//       {selectedSeat && (
//         <BookingModal 
//           open={modalOpen} 
//           onClose={handleCloseModal} 
//           seatId={selectedSeat} 
//         />
//       )}
//     </div>
//   );
// };

// export default BookDesk;

import React, { useEffect, useState } from "react";
import styles from "./UserBookDesk.module.css"; // Importing the CSS module
import {
  Seat,
  Cabin,
  ConferenceRoom,
  Partition,
  EntryPoint,
} from "./OfficeElements";
import BookingModal from "./BookingModal";
// import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

const modules = [
  { id: 1, name: "Module 1" },
  { id: 2, name: "Module 2" },
];

const BookDesk = () => {
  const [layout, setLayout] = useState(null);
  const [error, setError] = useState(null);
  const [selectedModule, setSelectedModule] = useState(modules[0]?.id || null);
  const [bookingDate, setBookingDate] = useState("");
  const [maxDate, setMaxDate] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedSeat, setSelectedSeat] = useState(null);

  useEffect(() => {
    const today = new Date();
    const maxDate = new Date();
    maxDate.setDate(today.getDate() + 2);
    setMaxDate(maxDate.toISOString().split("T")[0]);
  
    const fetchLayout = async () => {
      try {
        const accessToken = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vMTI3LjAuMC4xOjgwMDAvYXBpL2xvZ2luIiwiaWF0IjoxNzI1MzgzMjIwLCJleHAiOjE3MjUzODY4MjAsIm5iZiI6MTcyNTM4MzIyMCwianRpIjoibXpJRURWeklFbEdVSUpKcCIsInN1YiI6IjY2IiwicHJ2IjoiMjNiZDVjODk0OWY2MDBhZGIzOWU3MDFjNDAwODcyZGI3YTU5NzZmNyJ9.-XqgsFqhZ2XgUoQm8CKggcy-AcJWKhHSuol-VkCEYQo";        const response = await fetch(
          `http://127.0.0.1:8000/api/layouts/86/entities`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "application/json",
            },
          }
        );
  
        if (!response.ok) {
          throw new Error("Failed to fetch layout data");
        }
        const data = await response.json();
        console.log("Fetched layout data:", data); // Debug log
        setLayout(data.layout);
  
        // Additional logging to inspect the structure
        console.log("Layout original structure:", data.layout?.original);
        console.log("Layout entities:", data.layout?.original?.layout_entities);
  
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

  const renderEntity = (entity) => {
    const { type, rotation } = entity;
    const status = entity.seat?.status;
    const xPosition = parseFloat(entity["x_position"]) || 0;
    const yPosition = parseFloat(entity["y_position"]) || 0;

    const backrestStyle = {
      backgroundColor:
        status === "booked"
          ? "red"
          : status === "permanently_booked"
          ? "#686D76"
          : "green",
    };

    const seatAreaStyle = {
      backgroundColor:
        status === "booked"
          ? "lightcoral"
          : status === "permanently_booked"
          ? "#EEEEEE"
          : "lightgreen",
    };

    const commonProps = {
      style: {
        position: "absolute",
        left: `${xPosition}px`,
        top: `${yPosition}px`,
        transform: `rotate(${rotation}deg)`,
        cursor: type.toLowerCase() === "seat" ? "pointer" : "default",
        transition: "transform 0.5s ease-in-out, box-shadow 0.3s ease-in-out",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
      },
      onClick: type.toLowerCase() === "seat" ? () => openBookingModal(entity) : undefined,
    };

    switch (type.toLowerCase()) {
      case "seat":
        return (
          <Seat
            key={entity.id}
            seatId={entity.id}
            {...commonProps}
            backrestStyle={backrestStyle}
            seatAreaStyle={seatAreaStyle}
          />
        );
      case "cabin":
        return <Cabin key={entity.id} {...commonProps} />;
      case "conference_room":
        return <ConferenceRoom key={entity.id} {...commonProps} />;
      case "partition":
        return <Partition key={entity.id} {...commonProps} />;
      case "entry_point":
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
          <label htmlFor="module-select" className={styles.label}>
            Select Module:
          </label>
          <select
            id="module-select"
            value={selectedModule}
            onChange={handleModuleChange}
            className={styles.dropdown}
          >
            {modules.map((module) => (
              <option key={module.id} value={module.id}>
                {module.name}
              </option>
            ))}
          </select>

          <label htmlFor="booking-date" className={styles.label}>
            Booking Date:
          </label>
          <input
            type="date"
            id="booking-date"
            value={bookingDate}
            onChange={handleDateChange}
            min={new Date().toISOString().split("T")[0]}
            max={maxDate}
            className={styles.dateInput}
          />
        </div>
      </div>

      <div className={styles.layoutContainer}>
      
            <div className={styles.layout}>
                
              {layout?.original?.layout_entities?.length > 0 ? (
                layout.original.layout_entities.map((entity) =>

                  renderEntity(entity)
                  
                  
                )
              ) : (
                <p>No layout entities available.</p>
              )}
            </div>
          
      </div>

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

export default BookDesk;
