import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Button, Container, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import { Stage, Layer, Group, Rect } from 'react-konva';
import DraggableSeat from './DraggableSeat'; // Ensure DraggableSeat is implemented using Konva
 
interface Position {
    x: number;
    y: number;
}
 
interface Element {
    type: string;
    id: string;
    position: Position;
    width?: number;
    height?: number;
    seats?: Element[];
    rotation?: number;
    iconColor?: string;
}
 
const LayoutManager: React.FC = () => {
    const [elements, setElements] = useState<Element[]>([]);
    const [cubiclesPerRow, setCubiclesPerRow] = useState<number>(2);
    const [rowsOfCubicles, setRowsOfCubicles] = useState<number>(2);
    const [seatsPerCubicle, setSeatsPerCubicle] = useState<number>(4);
    const [cubicleSpacingX, setCubicleSpacingX] = useState<number>(50);
    const [cubicleSpacingY, setCubicleSpacingY] = useState<number>(50);
    const [seatSpacingX, setSeatSpacingX] = useState<number>(60);
    const [seatSpacingY, setSeatSpacingY] = useState<number>(60);
    const [selectedElementId, setSelectedElementId] = useState<string | null>(null);
    const [selectedBuilding, setSelectedBuilding] = useState<string>('');
    const [selectedModule, setSelectedModule] = useState<string>('');
 
    useEffect(() => {
        axios
            .get('/api/layouts/1')
            .then((response) => {
                const config = response.data.configuration;
                const initialElements: Element[] = config?.elements ?? [];
                setElements(initialElements);
            })
            .catch((error) => {
                console.error('Error fetching layout:', error);
            });
    }, []);
 
    useEffect(() => {
        const newElements: Element[] = [];
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
 
                const seats: Element[] = [];
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
 
    const handleDragEnd = (e: any, id: string) => {
        const newPosition: Position = {
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
 
    const handleDragStart = (id: string) => {
        setSelectedElementId(id);
    };
 
    const addElement = (type: string) => {
        const newElement: Element = {
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
 
    const addSeat = (id: string | null) => {
        if (!id) return;
 
        const newSeat: Element = {
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
 
    const handleRotation = (id: string | null) => {
        if (!id) return;
 
        setElements((prevElements) =>
            prevElements.map((el) =>
                el.id === id
                    ? { ...el, rotation: (el.rotation! + 90) % 360 }
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
                        <MenuItem value="Module C">Module C</MenuItem>
                    </Select>
                </FormControl>
                <Button variant="contained" sx={{ marginBottom: 2 }} onClick={() => addElement('cubicle')}>
                    Add Cubicle
                </Button>
                <Button variant="contained" sx={{ marginBottom: 2 }} onClick={() => addElement('conferenceRoom')}>
                    Add Conference Room
                </Button>
                <Button variant="contained" sx={{ marginBottom: 2 }} onClick={() => addSeat(selectedElementId)}>
                    Add Seat
                </Button>
                <Button variant="contained" sx={{ marginBottom: 2 }} onClick={() => handleRotation(selectedElementId)}>
                    Rotate
                </Button>
                <Button variant="contained" sx={{ marginBottom: 2 }} onClick={saveLayout}>
                    Save Layout
                </Button>
                <Button variant="contained" sx={{ marginBottom: 2 }} color="error" onClick={handleDelete}>
                    Delete Selected Element
                </Button>
            </Box>
            <Container sx={{ flex: 1 }}>
                <Stage width={window.innerWidth} height={window.innerHeight}>
                    <Layer>
                        {elements.map((el) => {
                            if (el.type === 'cubicle') {
                                return (
                                    <Group key={el.id}>
                                        <Rect
                                            x={el.position.x}
                                            y={el.position.y}
                                            width={el.width}
                                            height={el.height}
                                            stroke="blue"
                                        />
                                        {el.seats && el.seats.map((seat) => (
                                            <DraggableSeat
                                                key={seat.id}
                                                seat={seat}
                                                onDragEnd={handleDragEnd}
                                                onDragStart={handleDragStart}
                                            />
                                        ))}
                                    </Group>
                                );
                            } else if (el.type === 'partition') {
                                return (
                                    <Rect
                                        key={el.id}
                                        x={el.position.x}
                                        y={el.position.y}
                                        width={el.width}
                                        height={el.height}
                                        stroke="black"
                                    />
                                );
                            } else if (el.type === 'conferenceRoom') {
                                return (
                                    <Rect
                                        key={el.id}
                                        x={el.position.x}
                                        y={el.position.y}
                                        width={el.width}
                                        height={el.height}
                                        stroke="orange"
                                    />
                                );
                            }
                            return null;
                        })}
                    </Layer>
                </Stage>    
            </Container>
        </Box>
    );
};
 
export default LayoutManager;