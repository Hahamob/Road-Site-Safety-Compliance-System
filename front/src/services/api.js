import axios from 'axios';

const BASE_URL = 'http://127.0.0.1:8000'; // 后端地址

export const analyzeImage = async (formData) => {
  return axios.post(`${BASE_URL}/analyze/`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
};

export const fetchAnalysisHistory = async () => {
  return axios.get(`${BASE_URL}/history/`);
};
