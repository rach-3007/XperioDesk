import React from 'react';
import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);
const PieChart: React.FC = () => {
  const data = {
    labels: ['DU - 1', 'DU - 1', 'DU - 1', 'DU - 1'],
    datasets: [
      {
        label: 'Dataset 1',
        data: [25, 35, 20, 20],
        backgroundColor: ['#6A1B9A', '#3949AB', '#00897B', '#29B6F6'],
        hoverOffset: 4,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'right' as const,
        labels:{
          boxWidth:15,
          padding:20,

        }
      },
    },
   layout:{
    padding:{
      bottom:70,
    }

   },
  };


  return <Pie data={data} options={options} />;
};

export default PieChart;
