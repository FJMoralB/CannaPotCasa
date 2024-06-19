import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';
import { getToken } from '../firebaseConfig'; // Asegúrate de importar correctamente

const GraficoBD = () => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      { label: 'Temperatura', data: [], borderColor: 'rgba(75, 192, 192, 1)', backgroundColor: 'rgba(75, 192, 192, 0.2)' },
      { label: 'Humedad', data: [], borderColor: 'rgba(75, 75, 192, 1)', backgroundColor: 'rgba(75, 75, 192, 0.2)' },
      { label: 'Peso', data: [], borderColor: 'rgba(192, 75, 75, 1)', backgroundColor: 'rgba(192, 75, 75, 0.2)' },
      { label: 'Dendómetro', data: [], borderColor: 'rgba(75, 192, 75, 1)', backgroundColor: 'rgba(75, 192, 75, 0.2)' },
      { label: 'PH', data: [], borderColor: 'rgba(192, 192, 75, 1)', backgroundColor: 'rgba(192, 192, 75, 0.2)' },
    ]
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = await getToken();
        const response = await axios.get('http://localhost:5000/api/datos-graficos', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        const fetchedData = response.data;

        console.log('Datos recuperados:', fetchedData);

        const labels = fetchedData.map(d => new Date(d.timestamp).toLocaleTimeString());
        const temperaturas = fetchedData.map(d => d.temperatura);
        const humedades = fetchedData.map(d => d.humedad);
        const pesos = fetchedData.map(d => d.peso);
        const dendometros = fetchedData.map(d => d.dendometro);
        const phs = fetchedData.map(d => d.ph);

        setChartData({
          labels,
          datasets: [
            { label: 'Temperatura', data: temperaturas, borderColor: 'rgba(75, 192, 192, 1)', backgroundColor: 'rgba(75, 192, 192, 0.2)' },
            { label: 'Humedad', data: humedades, borderColor: 'rgba(75, 75, 192, 1)', backgroundColor: 'rgba(75, 75, 192, 0.2)' },
            { label: 'Peso', data: pesos, borderColor: 'rgba(192, 75, 75, 1)', backgroundColor: 'rgba(192, 75, 75, 0.2)' },
            { label: 'Dendómetro', data: dendometros, borderColor: 'rgba(75, 192, 75, 1)', backgroundColor: 'rgba(75, 192, 75, 0.2)' },
            { label: 'PH', data: phs, borderColor: 'rgba(192, 192, 75, 1)', backgroundColor: 'rgba(192, 192, 75, 0.2)' },
          ],
        });
      } catch (error) {
        console.error('Error al obtener los datos de gráficos:', error);
      }
    };

    fetchData();
  }, []);

  return <Line data={chartData} />;
};

export default GraficoBD;
