import React, { useState, useEffect } from 'react';
import Draggable from 'react-draggable';
import axiosInstance from '../../Config/AxiosConfig'; // Custom axios instance
import {
  Seat,
  Cabin,
  ConferenceRoom,
  Partition,
  EntryPoint,
} from '../ManageLayout/OfficeElements';

const EditLayout = () => {
  const [elements, setElements] = useState([]);
  const [error, setError] = useState(null);

  // Fetch existing layout data on component mount
  useEffect(() => {
    const fetchLayout = async () => {
      try {
        const accessToken = localStorage.getItem('accessToken');
        const response = await fetch(
          'http://127.0.0.1:8000/api/layouts/86/entities',
          {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${accessToken}`, // Include the access token
              'Content-Type': 'application/json',
            },
          }
        );
        if (!response.ok) {
          throw new Error('Failed to fetch layout data');
        }
        const data = await response.json();
        console.log('Fetched layout data:', data);

        // Set layout and individual entities
        if (data.layout && data.layout.entities) {
          setElements(data.layout.entities); // Set entities directly to elements
        }
      } catch (error) {
        setError(error.message);
      }
    };

    fetchLayout();
  }, []);

  // Update the position of the element when dragging stops
  const handleDragStop = (e, data, index) => {
    const updatedElements = [...elements];
    updatedElements[index] = {
      ...updatedElements[index],
      x_position: data.x,
      y_position: data.y,
    };
    setElements(updatedElements);
  };

  // Save updated positions to backend
  const saveUpdatedLayout = async () => {
    try {
      const accessToken = localStorage.getItem('accessToken');
      const updatedData = { entities: elements };
      await axiosInstance.put('/api/layouts/86', updatedData, {
        headers: {
          Authorization: `Bearer ${accessToken}`, // Include the access token
          'Content-Type': 'application/json',
        },
      });
      alert('Layout updated successfully!');
    } catch (error) {
      console.error('Error updating layout:', error);
      alert('Failed to update layout.');
    }
  };

  // Render the correct component based on the element type
  const renderElement = (element, index) => {
    const commonProps = {
      key: element.id,
      position: { x: element.x_position, y: element.y_position },
      onStop: (e, data) => handleDragStop(e, data, index),
    };

    switch (element.type) {
      case 'seat':
        return (
          <Draggable {...commonProps}>
            <Seat data={element} />
          </Draggable>
        );
      case 'cabin':
        return (
          <Draggable {...commonProps}>
            <Cabin data={element} />
          </Draggable>
        );
      case 'conference_room':
        return (
          <Draggable {...commonProps}>
            <ConferenceRoom data={element} />
          </Draggable>
        );
      case 'partition':
        return (
          <Draggable {...commonProps}>
            <Partition data={element} />
          </Draggable>
        );
      case 'entry_point':
        return (
          <Draggable {...commonProps}>
            <EntryPoint data={element} />
          </Draggable>
        );
      default:
        return (
          <Draggable {...commonProps}>
            <div className={`element ${element.type}`}>{element.type}</div>
          </Draggable>
        );
    }
  };

  return (
    <div className="edit-layout">
      <h3>Edit Layout</h3>
      {error && <p className="error-message">{error}</p>}
      <div className="layout-container">
        {elements.map((element, index) => renderElement(element, index))}
      </div>
      <button onClick={saveUpdatedLayout}>Save Changes</button>
    </div>
  );
};

export default EditLayout;
