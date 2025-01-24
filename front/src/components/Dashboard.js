import React, { useState, useEffect } from 'react';
import { fetchAnalysisHistory } from '../services/api';
import RealTimeStats from './RealTimeStats';
import ComplianceStats from './ComplianceStats';
import RiskLevelChart from './RiskLevelChart';
import TrendAnalysis from './TrendAnalysis';
import Filters from './Filters';

const Dashboard = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchAnalysisHistory();
        setData(response.data.data);
        setFilteredData(response.data.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);


  const handleFilter = (filters) => {
    const { timePeriod, siteLocation, riskLevel } = filters;

    let filtered = data;


    if (timePeriod) {
      const [start, end] = timePeriod;
      filtered = filtered.filter((item) => {
        const timestamp = new Date(item.timestamp);
        return timestamp >= start && timestamp <= end;
      });
    }


    if (siteLocation) {
      filtered = filtered.filter((item) => item.location_id === siteLocation);
    }


    if (riskLevel) {
      filtered = filtered.filter((item) => item.risk_level === riskLevel);
    }

    setFilteredData(filtered);
  };

  return (
    <div>
      <h2>Dashboard</h2>
      <Filters onFilter={handleFilter} />
      <RealTimeStats data={filteredData} />
      <ComplianceStats data={filteredData} />
      <RiskLevelChart data={filteredData} />
      <TrendAnalysis data={filteredData} />
    </div>
  );
};

export default Dashboard;
