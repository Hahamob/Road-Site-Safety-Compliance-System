import React from 'react';

const ComplianceStats = ({ data }) => {

  const stats = data.reduce((acc, curr) => {
    if (!acc[curr.location_id]) {
      acc[curr.location_id] = { compliant: 0, nonCompliant: 0 };
    }
    if (curr.violation_type === 'Compliant') {
      acc[curr.location_id].compliant += 1;
    } else {
      acc[curr.location_id].nonCompliant += 1;
    }
    return acc;
  }, {});

  return (
    <div>
      <h3>Site Compliance Statistics</h3>
      <ul>
        {Object.entries(stats).map(([location, counts]) => (
          <li key={location}>
            {location}: {counts.compliant} compliant, {counts.nonCompliant} non-compliant
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ComplianceStats;
