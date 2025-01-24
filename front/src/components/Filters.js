import React, { useState } from 'react';

const Filters = ({ onFilter }) => {
  const [timePeriod, setTimePeriod] = useState([null, null]);
  const [siteLocation, setSiteLocation] = useState('');
  const [riskLevel, setRiskLevel] = useState('');

  const handleApplyFilter = () => {
    onFilter({ timePeriod, siteLocation, riskLevel });
  };

  return (
    <div>
      <h3>Filters</h3>
      <div>
        <label>Time Period:</label>
        <input
          type="date"
          onChange={(e) => setTimePeriod((prev) => [e.target.value, prev[1]])}
        />
        <input
          type="date"
          onChange={(e) => setTimePeriod((prev) => [prev[0], e.target.value])}
        />
      </div>
      <div>
        <label>Site Location:</label>
        <input
          type="text"
          value={siteLocation}
          onChange={(e) => setSiteLocation(e.target.value)}
        />
      </div>
      <div>
        <label>Risk Level:</label>
        <select value={riskLevel} onChange={(e) => setRiskLevel(e.target.value)}>
          <option value="">All</option>
          <option value="High Risk">High Risk</option>
          <option value="Medium Risk">Medium Risk</option>
          <option value="Compliant">Compliant</option>
        </select>
      </div>
      <button onClick={handleApplyFilter}>Apply Filters</button>
    </div>
  );
};

export default Filters;
