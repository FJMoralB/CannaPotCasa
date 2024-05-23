import React, { useState, useEffect } from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import axios from 'axios';

const Graficas = () => {
  const [data, setData] = useState([]);
  const [realTimeData, setRealTimeData] = useState({
    weight: 0,
    temperature: 0,
    humidity: 0,
    dendrometer: 0
  });

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get('/api/smart-pot-data'); // Ajusta esta ruta a tu API
      setData(response.data);
    };

    fetchData();
  }, []);

  useEffect(() => {
    const interval = setInterval(async () => {
      const response = await axios.get('/api/real-time-data'); // Ajusta esta ruta a tu API
      setRealTimeData(response.data);
    }, 5000); // Actualiza cada 5 segundos

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <h2>Datos de los últimos 7 días</h2>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart
          data={data}
          margin={{
            top: 5, right: 30, left: 20, bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="weight" stroke="#8884d8" />
          <Line type="monotone" dataKey="temperature" stroke="#82ca9d" />
          <Line type="monotone" dataKey="humidity" stroke="#ffc658" />
          <Line type="monotone" dataKey="dendrometer" stroke="#ff7300" />
        </LineChart>
      </ResponsiveContainer>

      <h2>Datos en Tiempo Real</h2>
      <div>
        <p>Peso: {realTimeData.weight} kg</p>
        <p>Temperatura: {realTimeData.temperature} °C</p>
        <p>Humedad: {realTimeData.humidity} %</p>
        <p>Dendrómetro: {realTimeData.dendrometer} mm</p>
      </div>
    </div>
  );
};

export default Graficas;
