import React from 'react';

const RealTimeStats = ({ data }) => {

  const stats = data.reduce((acc, curr) => {
    acc[curr.violation_type] = (acc[curr.violation_type] || 0) + 1;
    return acc;
  }, {});

  return (
    <div>
      <h3>Real-Time Violation Counts</h3>
      <ul>
        {Object.entries(stats).map(([key, value]) => (
          <li key={key}>
            {key}: {value}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RealTimeStats;
