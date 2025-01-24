import React, { useState } from 'react';
import UploadImage from './components/UploadImage';
import AnalysisResult from './components/AnalysisResult';
import Dashboard from './components/Dashboard';
import './App.css';


const App = () => {
  const [analysisData, setAnalysisData] = useState([]);

  const handleUploadSuccess = (newResult) => {
    setAnalysisData((prevData) => [newResult, ...prevData]);
  };

  return (
    <div>
      <h1>Road Site Safety Compliance System</h1>
      <UploadImage onUploadSuccess={handleUploadSuccess} />
      <AnalysisResult results={analysisData} />
      <Dashboard />
    </div>
  );
};

export default App;
