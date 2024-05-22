// server.js
const express = require('express');
const app = express();

const generateMockData = () => {
  const data = [];
  for (let i = 0; i < 7; i++) {
    data.push({
      date: `2024-05-${14 + i}`,
      weight: Math.random() * 10,
      temperature: Math.random() * 35,
      humidity: Math.random() * 100,
      dendrometer: Math.random() * 5,
    });
  }
  return data;
};

const realTimeData = {
  weight: Math.random() * 10,
  temperature: Math.random() * 35,
  humidity: Math.random() * 100,
  dendrometer: Math.random() * 5,
};

app.get('/api/smart-pot-data', (req, res) => {
  res.json(generateMockData());
});

app.get('/api/real-time-data', (req, res) => {
  res.json(realTimeData);
});

app.listen(3001, () => {
  console.log('Server running on port 3001');
});
