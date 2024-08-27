// DraggableSeat.tsx
import React from 'react';
import { Group, Rect, Text } from 'react-konva';

interface DraggableSeatProps {
    id: string;
    x: number;
    y: number;
    onDragEnd: (e: any) => void;
    onDragStart: () => void;
    rotation?: number; // Make rotation optional
}

const DraggableSeat: React.FC<DraggableSeatProps> = ({ id, x, y, onDragEnd, onDragStart, rotation = 0 }) => {
    return (
        <Group
            draggable
            x={x}
            y={y}
            rotation={rotation}
            onDragEnd={onDragEnd}
            onDragStart={onDragStart}
        >
            <Rect
                width={50}
                height={50}
                fill="blue"
                stroke="black"
                strokeWidth={1}
            />
            <Text
                text={id}
                x={5}
                y={5}
                fill="white"
            />
        </Group>
    );
};

export default DraggableSeat;
