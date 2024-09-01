// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// // Import your components for different types
// import SeatComponent from './SeatComponent';
// import CabinComponent from './CabinComponent';
// import ConferenceComponent from './ConferenceComponent';
// import PartitionComponent from './PartitionComponent';
// import EntranceComponent from './EntranceComponent';

// // Define a type for layout entities
// type LayoutEntity = {
//   id: number;
//   layout_id: number;
//   type: 'Seat' | 'Cabin' | 'Conference' | 'Partition' | 'Entrance';
//   'x-position': string;
//   'y-position': string;
//   rotation: string;
//   created_at: string;
//   updated_at: string;
//   additionalDetails: string;
// };

// type LayoutResponse = {
//   id: number;
//   module_id: number;
//   name: string;
//   created_at: string;
//   updated_at: string;
//   deleted_at: string | null;
//   layout_entities: LayoutEntity[];
// };

// const LayoutComponent: React.FC<{ layoutId: number }> = ({ layoutId }) => {
//   const [layout, setLayout] = useState<LayoutResponse | null>(null);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     // Fetch data from the API
//     axios.get(`/api/${layoutId}/entities`)
//       .then(response => {
//         setLayout(response.data.layout.original);
//         setLoading(false);
//       })
//       .catch(err => {
//         setError('Failed to load layout data');
//         setLoading(false);
//       });
//   }, [layoutId]);

//   if (loading) return <div>Loading...</div>;
//   if (error) return <div>{error}</div>;

//   return (
//     <div>
//       {layout?.layout_entities.map(entity => {
//         switch (entity.type) {
//           case 'Seat':
//             return <SeatComponent key={entity.id} position={{ x: entity['x-position'], y: entity['y-position'] }} rotation={entity.rotation} />;
//           case 'Cabin':
//             return <CabinComponent key={entity.id} position={{ x: entity['x-position'], y: entity['y-position'] }} rotation={entity.rotation} />;
//           case 'Conference':
//             return <ConferenceComponent key={entity.id} position={{ x: entity['x-position'], y: entity['y-position'] }} rotation={entity.rotation} />;
//           case 'Partition':
//             return <PartitionComponent key={entity.id} position={{ x: entity['x-position'], y: entity['y-position'] }} rotation={entity.rotation} />;
//           case 'Entrance':
//             return <EntranceComponent key={entity.id} position={{ x: entity['x-position'], y: entity['y-position'] }} rotation={entity.rotation} />;
//           default:
//             return null;
//         }
//       })}
//     </div>
//   );
// };

// export default LayoutComponent;


import React, { useEffect, useState } from 'react';
import { Seat, Cabin, ConferenceRoom, Partition, EntryPoint } from '../ManageLayout/OfficeElements';

const BookDesk = () => {
  const [layout, setLayout] = useState(null);
  const [error, setError] = useState(null);

  // Fetch layout from the backend
  useEffect(() => {
    const fetchLayout = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/layouts/6/entities');
        if (!response.ok) {
          throw new Error('Failed to fetch layout data');
        }
        const data = await response.json();
        console.log('Fetched layout data:', data); // Add this line
        setLayout(data.layout);
      } catch (error) {
        setError(error.message);
      }
    };
  
    fetchLayout();
  }, []);
  
  const renderEntity = (entity) => {
    const { type, rotation } = entity;
    const xPosition = entity['x-position'];
    const yPosition = entity['y-position'];
  
    const commonProps = {
      style: {
        position: 'absolute',
        left: `${xPosition}px`,
        top: `${yPosition}px`,
        transform: `rotate(${rotation}deg)`,
      },
    };
  
    switch (type.toLowerCase()) {
      case 'seat':
        return <Seat key={entity.id} {...commonProps} />;
      case 'cabin':
        return <Cabin key={entity.id} {...commonProps} />;
      case 'conference_room':
        return <ConferenceRoom key={entity.id} {...commonProps} />;
      case 'partition':
        return <Partition key={entity.id} {...commonProps} />;
      case 'entry_point':
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
    </div>
  );
};

export default BookDesk;
