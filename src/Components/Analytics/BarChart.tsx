// import React from 'react';
// import { Bar } from 'react-chartjs-2';
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend,
//   ChartOptions,
//   ScriptableContext,  // Import ScriptableContext
// } from 'chart.js';

// // Register necessary components
// ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// interface BarChartProps {
//   data: {
//     labels: string[];
//     datasets: {
//       label: string;
//       data: number[];
//       backgroundColor?:
//         | string
//         | CanvasGradient
//         | ((context: ScriptableContext<'bar'>) => string | CanvasGradient);
//       borderColor?: string;
//       borderWidth?: number;
//       borderRadius?: number | { topLeft: number; topRight: number; bottomLeft: number; bottomRight: number };
//       borderSkipped?:
//         | 'start'
//         | 'end'
//         | 'left'
//         | 'right'
//         | 'bottom'
//         | 'top'
//         | 'middle'
//         | boolean
//         | ((ctx: ScriptableContext<'bar'>) => boolean | 'start' | 'end' | 'left' | 'right' | 'bottom' | 'top' | 'middle')
//         | undefined;
//     }[];
//   };
//   options?: ChartOptions<'bar'>;
// }

// const BarChart: React.FC<BarChartProps> = ({ data, options }) => {

//   return <Bar data={data} options={options} />;
// };

// export default BarChart;
