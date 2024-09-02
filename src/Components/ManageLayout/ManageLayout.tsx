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
      const response = await axiosInstance.post('/api/layouts', requestData);
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
        <button className={styles.actionButton} onClick={handleSaveModal}>
          Save Layout
        </button>
        <button className={styles.actionButton} onClick={() => addElement('seat')}>
          Add Seat
        </button>
        <button className={styles.actionButton} onClick={() => addElement('conferenceRoom')}>
          Add Conference Room
        </button>
        <button className={styles.actionButton} onClick={() => addElement('cabin')}>
          Add Cabin
        </button>
        <button className={styles.actionButton} onClick={() => addElement('partition')}>
          Add Partition
        </button>
        <button className={styles.actionButton} onClick={() => addElement('entryPoint')}>
          Add Entry Point
        </button>
      </div>

      {/* Container for managing the layout */}
      <div className={styles.layoutContainer}>
        <h3 className={styles.layoutTitle}>Manage Layout</h3>
        <div className={styles.elementsContainer}>
          {elements.map((element, index) => renderElement(element, index))}
        </div>
      </div>
    </div>
  );
};

export default ManageLayout;
