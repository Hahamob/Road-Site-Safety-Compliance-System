import React from 'react';
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend } from 'chart.js';
import { Line } from 'react-chartjs-2';


ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

const TrendAnalysis = ({ data }) => {
  const stats = data.reduce((acc, curr) => {
    const date = new Date(curr.timestamp).toLocaleDateString();
    acc[date] = (acc[date] || 0) + 1;
    return acc;
  }, {});

  const chartData = {
    labels: Object.keys(stats),
    datasets: [
      {
        label: 'Violation Trend',
        data: Object.values(stats),
        borderColor: '#36A2EB',
        fill: false,
      },
    ],
  };

  return (
    <div>
      <h3>Historical Trend Analysis</h3>
      <Line data={chartData} />
    </div>
  );
};

export default TrendAnalysis;
