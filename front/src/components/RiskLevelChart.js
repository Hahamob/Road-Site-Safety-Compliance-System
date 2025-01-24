import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';


ChartJS.register(ArcElement, Tooltip, Legend);

const RiskLevelChart = ({ data }) => {
  const stats = data.reduce((acc, curr) => {
    acc[curr.risk_level] = (acc[curr.risk_level] || 0) + 1;
    return acc;
  }, {});

  const chartData = {
    labels: Object.keys(stats),
    datasets: [
      {
        label: 'Risk Level Distribution',
        data: Object.values(stats),
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
      },
    ],
  };

  return (
    <div>
      <h3>Risk Level Distribution</h3>
      <Pie data={chartData} />
    </div>
  );
};

export default RiskLevelChart;
