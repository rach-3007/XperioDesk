import React, { useState } from 'react';
import Draggable from 'react-draggable';
import { Seat, Cabin, ConferenceRoom, Partition, EntryPoint } from './OfficeElements'; // Import your draggable components
import axiosInstance from '../../Config/AxiosConfig';
import styles from './ManageLayout.module.css';

const ManageLayout: React.FC = () => {
  const [elements, setElements] = useState([]);
  const [layoutName, setLayoutName] = useState('');
  const [moduleID, setModuleID] = useState('');
  const [seatNumbers, setSeatNumbers] = useState('');
  const [accessDUs, setAccessDUs] = useState('');
  const [rows, setRows] = useState(''); // Number of rows for seat generation
  const [seatsPerRow, setSeatsPerRow] = useState(''); // Seats per row

  // Function to handle when dragging stops
  const handleDragStop = (e, data, index) => {
    const { x, y } = data;
    const updatedElements = [...elements];
    updatedElements[index] = { ...updatedElements[index], x: data.x, y: data.y };
    console.log(`Dragging stopped at x: ${x}, y: ${y}`);
    setElements(updatedElements);
  };

  // Function to add a new element
  const addElement = (type) => {
    const newElement = { id: elements.length + 1, type, x: 0, y: 0 }; // Default position at (0, 0)
    setElements([...elements, newElement]);
  };

  const addRowsOfSeats = () => {
    const newElements = [];
    const seatWidth = 60; // Width of each seat, adjust as needed
    const rowHeight = 60; // Height of each row, adjust as needed
  
    // Find the starting yOffset based on existing elements
    let yOffset = elements.length > 0 ? Math.max(...elements.map((el) => el.y)) + rowHeight : 0;
  
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < seatsPerRow; j++) {
        newElements.push({
          id: elements.length + newElements.length + 1,
          type: "seat",
          x: j * seatWidth, // Horizontal position calculation
          y: yOffset + i * rowHeight, // Vertical position calculation
        });
      }
    }
  
    setElements([...elements, ...newElements]);
  };
  


  const handleSaveModal = async () => {
    console.log('Elements', elements);

    const seatList = seatNumbers.split(',').map((seat) => seat.trim());
    const accessDUList = accessDUs.split(',').map((du) => du.trim());

    const entities = elements
      .map((element) => {
        const { type, x, y, rotation } = element;

        switch (type) {
          case 'seat':
            return {
              type: 'seat',
              seat_number: seatList.shift(),
              x_position: x || 0,
              y_position: y || 0,
              rotation: rotation || 0,
            };
          case 'cabin':
            return {
              type: 'cabin',
              x_position: x || 0,
              y_position: y || 0,
              rotation: rotation || 0,
            };
          case 'conferenceRoom':
            return {
              type: 'conference_room',
              x_position: x || 0,
              y_position: y || 0,
              rotation: rotation || 0,
            };
          case 'partition':
            return {
              type: 'partition',
              x_position: x || 0,
              y_position: y || 0,
              rotation: rotation || 0,
            };
          case 'entryPoint':
            return {
              type: 'entrance',
              x_position: x || 0,
              y_position: y || 0,
              rotation: rotation || 0,
            };
          default:
            return null;
        }
      })
      .filter(Boolean);
    console.log('Entities', entities);
    const requestData = {
      layout_name: layoutName,
      module_id: parseInt(moduleID, 10),
      entities,
      access_dus: accessDUList,
    };
    console.log('Request Data:', requestData);
    try {
      const accessToken = localStorage.getItem("accessToken");
      const response = await axiosInstance.post('/api/layouts', requestData, {
        headers: {
          Authorization: `Bearer ${accessToken}`, // Include the access token
          'Content-Type': 'application/json', // Optional: specify content type
        },
      });
      if (response.status === 201) {
        alert('Layout created successfully!');
      } else {
        alert('Failed to create layout');
      }
    } catch (error) {
      console.error('Error creating layout:', error);
      alert('An error occurred while creating the layout');
    }
  };

  // Render the draggable elements based on their type and position
  const renderElement = (element, index) => {
    switch (element.type) {
      case 'seat':
        return (
          <Draggable
            key={element.id}
            position={{ x: element.x, y: element.y }}
            onStop={(e, data) => handleDragStop(e, data, index)}
          >
            <Seat />
          </Draggable>
        );
      case 'conferenceRoom':
        return (
          <Draggable
            key={element.id}
            position={{ x: element.x, y: element.y }}
            onStop={(e, data) => handleDragStop(e, data, index)}
          >
            <ConferenceRoom />
          </Draggable>
        );
      case 'cabin':
        return (
          <Draggable
            key={element.id}
            position={{ x: element.x, y: element.y }}
            onStop={(e, data) => handleDragStop(e, data, index)}
          >
            <Cabin />
          </Draggable>
        );
      case 'partition':
        return (
          <Draggable
            key={element.id}
            position={{ x: element.x, y: element.y }}
            onStop={(e, data) => handleDragStop(e, data, index)}
          >
            <Partition />
          </Draggable>
        );
      case 'entryPoint':
        return (
          <Draggable
            key={element.id}
            position={{ x: element.x, y: element.y }}
            onStop={(e, data) => handleDragStop(e, data, index)}
          >
            <EntryPoint />
          </Draggable>
        );
      default:
        return null;
    }
  };

  return (
    <div className={styles.manageLayoutContainer}>
      {/* Toolbar on the left */}
      <div className={styles.toolbar}>
        <h3 className={styles.toolbarTitle}>Layout Configuration</h3>
        <div className={styles.inputLabel}>
          <label>
            Layout Name:
            <input
              className={styles.inputField}
              type="text"
              value={layoutName}
              onChange={(e) => setLayoutName(e.target.value)}
              placeholder="Enter layout name"
            />
          </label>
        </div>
        <div className={styles.inputLabel}>
          <label>
            Module ID:
            <input
              className={styles.inputField}
              type="number"
              value={moduleID}
              onChange={(e) => setModuleID(e.target.value)}
              placeholder="Enter module ID"
            />
          </label>
        </div>
        <div className={styles.inputLabel}>
          <label>
            Seat Numbers (comma-separated):
            <input
              className={styles.inputField}
              type="text"
              value={seatNumbers}
              onChange={(e) => setSeatNumbers(e.target.value)}
              placeholder="Enter seat numbers (comma-separated)"
            />
          </label>
        </div>
        <div className={styles.inputLabel}>
          <label>
            Access DUs:
            <input
              className={styles.inputField}
              type="text"
              value={accessDUs}
              onChange={(e) => setAccessDUs(e.target.value)}
              placeholder="Enter access DUs (comma-separated)"
            />
          </label>
        </div>
        <div className={styles.inputLabel}>
          <label>
            Rows:
            <input
              className={styles.inputField}
              type="number"
              value={rows}
              onChange={(e) => setRows(parseInt(e.target.value, 10) || 1)}
              placeholder="Enter number of rows"
            />
          </label>
        </div>
        <div className={styles.inputLabel}>
          <label>
            Seats Per Row:
            <input
              className={styles.inputField}
              type="number"
              value={seatsPerRow}
              onChange={(e) => setSeatsPerRow(parseInt(e.target.value, 10) || 1)}
              placeholder="Enter seats per row"
            />
          </label>
        </div>
        <button className={styles.addButton} onClick={() => addElement("seat")}>
          Add Seat
        </button>
        <button
          className={styles.addButton}
          onClick={() => addRowsOfSeats()}
        >
          Add Rows of Seats
        </button>
        <button className={styles.addButton} onClick={() => addElement("cabin")}>
          Add Cabin
        </button>
        <button className={styles.addButton} onClick={() => addElement("conferenceRoom")}>
          Add Conference Room
        </button>
        <button className={styles.addButton} onClick={() => addElement("partition")}>
          Add Partition
        </button>
        <button className={styles.addButton} onClick={() => addElement("entryPoint")}>
          Add Entry Point
        </button>
        <button className={styles.saveButton} onClick={handleSaveModal}>
          Save Layout
        </button>
      </div>

      {/* Layout rendering area */}
      <div className={styles.layoutArea}>
        {elements.map((element, index) => renderElement(element, index))}
      </div>
    </div>
  );
};

export default ManageLayout;
