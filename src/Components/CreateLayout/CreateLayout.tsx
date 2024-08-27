

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Button, Container, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import { Stage, Layer, Group, Rect } from 'react-konva';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import DraggableSeat from './DraggableSeat'; // Ensure DraggableSeat is implemented using Konva
import Partition from './Partition'; // Ensure Partition is correctly implemented

const LayoutManager = () => {
    const [elements, setElements] = useState([]);
    const [cubiclesPerRow, setCubiclesPerRow] = useState(2);
    const [rowsOfCubicles, setRowsOfCubicles] = useState(2);
    const [seatsPerCubicle, setSeatsPerCubicle] = useState(4);
    const [cubicleSpacingX, setCubicleSpacingX] = useState(50);
    const [cubicleSpacingY, setCubicleSpacingY] = useState(50);
    const [seatSpacingX, setSeatSpacingX] = useState(60);
    const [seatSpacingY, setSeatSpacingY] = useState(60);
    const [selectedElementId, setSelectedElementId] = useState(null);
    const [selectedBuilding, setSelectedBuilding] = useState('');
    const [selectedModule, setSelectedModule] = useState('');

    useEffect(() => {
        axios
            .get('/api/layouts/1')
            .then((response) => {
                const config = response.data.configuration;
                const initialElements = config?.elements ?? [];
                setElements(initialElements);
            })
            .catch((error) => {
                console.error('Error fetching layout:', error);
            });
    }, []);

    useEffect(() => {
        const newElements = [];
        for (let i = 0; i < rowsOfCubicles; i++) {
            for (let j = 0; j < cubiclesPerRow; j++) {
                const cubicleX = j * (cubicleSpacingX + 200);
                const cubicleY = i * (cubicleSpacingY + 200);
                const cubicleWidth = 200;
                const cubicleHeight = 200;

                newElements.push({
                    type: 'partition',
                    id: `partition-top-${i}-${j}`,
                    position: { x: cubicleX, y: cubicleY },
                    width: cubicleWidth,
                    height: 1,
                });
                newElements.push({
                    type: 'partition',
                    id: `partition-right-${i}-${j}`,
                    position: { x: cubicleX + cubicleWidth - 1, y: cubicleY },
                    width: 1,
                    height: cubicleHeight,
                });
                newElements.push({
                    type: 'partition',
                    id: `partition-bottom-${i}-${j}`,
                    position: { x: cubicleX, y: cubicleY + cubicleHeight - 1 },
                    width: cubicleWidth,
                    height: 1,
                });
                newElements.push({
                    type: 'partition',
                    id: `partition-left-${i}-${j}`,
                    position: { x: cubicleX, y: cubicleY },
                    width: 1,
                    height: cubicleHeight,
                });

                const seats = [];
                for (let k = 0; k < seatsPerCubicle; k++) {
                    const row = Math.floor(k / 2);
                    const col = k % 2;
                    const seatX = cubicleX + col * seatSpacingX;
                    const seatY = cubicleY + row * seatSpacingY;

                    seats.push({
                        type: 'seat',
                        id: `seat-${i}-${j}-${k}`,
                        position: { x: seatX, y: seatY },
                        rotation: 0,
                    });
                }

                newElements.push({
                    type: 'cubicle',
                    id: `cubicle-${i}-${j}`,
                    position: { x: cubicleX, y: cubicleY },
                    width: cubicleWidth,
                    height: cubicleHeight,
                    seats: seats,
                });
            }
        }
        setElements(newElements);
    }, [cubiclesPerRow, rowsOfCubicles, seatsPerCubicle, cubicleSpacingX, cubicleSpacingY, seatSpacingX, seatSpacingY]);

    const handleDragEnd = (e, id) => {
        const newPosition = {
            x: e.target.x(),
            y: e.target.y(),
        };
        setElements((prevElements) =>
            prevElements.map((el) =>
                el.id === id
                    ? { ...el, position: newPosition }
                    : el
            )
        );
    };

    const handleDragStart = (id) => {
        setSelectedElementId(id);
    };

    const addElement = (type) => {
        const newElement = {
            type: type,
            id: `${type}-${elements.length + 1}`,
            position: { x: 100, y: 100 },
            width: type === 'conferenceRoom' ? 100 : 100,
            height: type === 'conferenceRoom' ? 100 : 100,
            seats: type === 'cubicle' ? [] : undefined,
            rotation: 0,
            iconColor: type === 'conferenceRoom' ? 'orange' : 'default',
        };
        setElements([...elements, newElement]);
    };

    const addSeat = (id) => {
        const newSeat = {
            type: 'seat',
            id: `seat-${elements.length + 1}`,
            position: { x: 100, y: 100 },
            rotation: 0,
        };
        setElements((prevElements) =>
            prevElements.map((el) =>
                el.id === id
                    ? { ...el, seats: [...(el.seats || []), newSeat] }
                    : el
            )
        );
    };

    const handleRotation = (id) => {
        setElements((prevElements) =>
            prevElements.map((el) =>
                el.id === id
                    ? { ...el, rotation: (el.rotation + 90) % 360 }
                    : el
            )
        );
    };

    const saveLayout = () => {
        axios
            .put('/api/layouts/1', {
                name: 'Office Layout',
                configuration: { elements },
            })
            .then((response) => {
                console.log('Layout saved!', response.data);
            })
            .catch((error) => {
                console.error('Error saving layout:', error);
            });
    };

    const handleDelete = () => {
        setElements((prevElements) =>
            prevElements.filter((el) => el.id !== selectedElementId)
        );
        setSelectedElementId(null);
    };

    return (
        <Box sx={{ display: 'flex', height: '100vh' }}>
            <Box sx={{ width: 250, padding: 2, bgcolor: 'background.paper', display: 'flex', flexDirection: 'column' }}>
                <Typography variant="h6" sx={{ marginBottom: 2 }}>Toolbar</Typography>
                <FormControl sx={{ marginBottom: 2 }}>
                    <InputLabel>Building</InputLabel>
                    <Select
                        value={selectedBuilding}
                        onChange={(e) => setSelectedBuilding(e.target.value)}
                    >
                        <MenuItem value="Building A">Gayathri Building, TechnoPark Phase 1, Trivandrum</MenuItem>
                        <MenuItem value="Building B">Thejaswini Building, TechnoPark Phase 1, TVM</MenuItem>
                        <MenuItem value="Building C">Athulya Building, InforPark Phase 2</MenuItem>
                    </Select>
                </FormControl>
                <FormControl sx={{ marginBottom: 2 }}>
                    <InputLabel>Module</InputLabel>
                    <Select
                        value={selectedModule}
                        onChange={(e) => setSelectedModule(e.target.value)}
                    >
                        <MenuItem value="Module A">Module A</MenuItem>
                        <MenuItem value="Module B">Module B</MenuItem>
                    </Select>
                </FormControl>
                <TextField
                    type="number"
                    label="Cubicles Per Row"
                    value={cubiclesPerRow}
                    onChange={(e) => setCubiclesPerRow(Number(e.target.value))}
                    sx={{ marginBottom: 2 }}
                />
                <TextField
                    type="number"
                    label="Rows of Cubicles"
                    value={rowsOfCubicles}
                    onChange={(e) => setRowsOfCubicles(Number(e.target.value))}
                    sx={{ marginBottom: 2 }}
                />
                <TextField
                    type="number"
                    label="Seats Per Cubicle"
                    value={seatsPerCubicle}
                    onChange={(e) => setSeatsPerCubicle(Number(e.target.value))}
                    sx={{ marginBottom: 2 }}
                />
                <TextField
                    type="number"
                    label="Cubicle Spacing X"
                    value={cubicleSpacingX}
                    onChange={(e) => setCubicleSpacingX(Number(e.target.value))}
                    sx={{ marginBottom: 2 }}
                />
                <TextField
                    type="number"
                    label="Cubicle Spacing Y"
                    value={cubicleSpacingY}
                    onChange={(e) => setCubicleSpacingY(Number(e.target.value))}
                    sx={{ marginBottom: 2 }}
                />
                <TextField
                    type="number"
                    label="Seat Spacing X"
                    value={seatSpacingX}
                    onChange={(e) => setSeatSpacingX(Number(e.target.value))}
                    sx={{ marginBottom: 2 }}
                />
                <TextField
                    type="number"
                    label="Seat Spacing Y"
                    value={seatSpacingY}
                    onChange={(e) => setSeatSpacingY(Number(e.target.value))}
                    sx={{ marginBottom: 2 }}
                />
                <Button variant="contained" onClick={() => addElement('conferenceRoom')} sx={{ marginBottom: 2 }}>Add Conference Room</Button>
                <Button variant="contained" onClick={() => addElement('cubicle')} sx={{ marginBottom: 2 }}>Add Cubicle</Button>
                <Button variant="contained" onClick={() => addSeat(selectedElementId)} sx={{ marginBottom: 2 }} disabled={!selectedElementId}>Add Seat</Button>
                <Button variant="contained" onClick={() => handleRotation(selectedElementId)} sx={{ marginBottom: 2 }} disabled={!selectedElementId}>Rotate Selected</Button>
                <Button variant="contained" onClick={saveLayout}>Save Layout</Button>
                <Button variant="contained" color="error" onClick={handleDelete} sx={{ marginTop: 2 }} disabled={!selectedElementId}>Delete Selected</Button>
            </Box>
            <Container>
                <Stage width={window.innerWidth - 250} height={window.innerHeight}>
                    <Layer>
                        {elements.map((el) => (
                            <Group
                                key={el.id}
                                draggable
                                onDragEnd={(e) => handleDragEnd(e, el.id)}
                                onDragStart={() => handleDragStart(el.id)}
                                rotation={el.rotation || 0}
                            >
                                {el.type === 'cubicle' && (
                                    <React.Fragment>
                                        <Rect
                                            x={el.position.x}
                                            y={el.position.y}
                                            width={el.width}
                                            height={el.height}
                                            fill="#d5d5d5"
                                            stroke="#000"
                                            strokeWidth={2}
                                        />
                                        {el.seats.map((seat) => (
                                            <DraggableSeat
                                                key={seat.id}
                                                x={seat.position.x}
                                                y={seat.position.y}
                                                rotation={seat.rotation}
                                                onDragEnd={(e) => handleDragEnd(e, seat.id)}
                                            />
                                        ))}
                                    </React.Fragment>
                                )}
                                {el.type === 'partition' && (
                                    <Partition
                                        x={el.position.x}
                                        y={el.position.y}
                                        width={el.width}
                                        height={el.height}
                                    />
                                )}
                                {el.type === 'conferenceRoom' && (
                                    <LocationOnIcon
                                        sx={{ color: el.iconColor, fontSize: 60 }}
                                        x={el.position.x}
                                        y={el.position.y}
                                        draggable
                                        onDragEnd={(e) => handleDragEnd(e, el.id)}
                                    />
                                )}
                            </Group>
                        ))}
                    </Layer>
                </Stage>
            </Container>
        </Box>
    );
};

export default LayoutManager;
