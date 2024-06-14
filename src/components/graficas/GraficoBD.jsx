import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';

const GraficoBD = () => {
  const [data, setData] = useState({
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
        const response = await axios.get('http://localhost:5000/api/datos-graficos');
        const fetchedData = response.data;

        console.log('Datos recuperados:', fetchedData);

        const labels = fetchedData.map(d => new Date(d.timestamp).toLocaleTimeString());
        const temperaturas = fetchedData.map(d => d.temperatura);
        const humedades = fetchedData.map(d => d.humedad);
        const pesos = fetchedData.map(d => d.peso);
        const dendometros = fetchedData.map(d => d.dendometro);
        const phs = fetchedData.map(d => d.ph);

        setData({
          labels,
          datasets: [
            { ...data.datasets[0], data: temperaturas },
            { ...data.datasets[1], data: humedades },
            { ...data.datasets[2], data: pesos },
            { ...data.datasets[3], data: dendometros },
            { ...data.datasets[4], data: phs },
          ],
        });
      } catch (error) {
        console.error('Error al obtener los datos de gráficos:', error);
      }
    };

    fetchData();
  }, []);

  return <Line data={data} />;
};

export default GraficoBD;
