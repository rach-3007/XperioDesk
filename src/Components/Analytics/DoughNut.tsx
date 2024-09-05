import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  ChartOptions,
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

interface DoughNutProps {
  data: {
    labels: string[];
    datasets: {
      data: number[];
      backgroundColor: string[];
      hoverBackgroundColor?: string[];
      borderWidth?: number;
    }[];
  };
  options?: ChartOptions<'doughnut'>;
}

const DoughNut: React.FC<DoughNutProps> = ({ data, options }) => {
  return (
    <div>
      <Doughnut data={data} options={options} />
    </div>
  );
};

export default DoughNut;
