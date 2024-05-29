import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';

const socket = io('http://localhost:3001');

const GraficoTiempoReal = () => {
  const [data, setData] = useState({
    labels: [],
    datasets: [
      { label: 'Temperatura', data: [], borderColor: 'rgba(75, 192, 192, 1)', backgroundColor: 'rgba(75, 192, 192, 0.2)' },
      { label: 'Humedad', data: [], borderColor: 'rgba(75, 75, 192, 1)', backgroundColor: 'rgba(75, 75, 192, 0.2)' },
      { label: 'Peso', data: [], borderColor: 'rgba(192, 75, 75, 1)', backgroundColor: 'rgba(192, 75, 75, 0.2)' },
      { label: 'Dendómetro', data: [], borderColor: 'rgba(75, 192, 75, 1)', backgroundColor: 'rgba(75, 192, 75, 0.2)' },
      { label: 'PH', data: [], borderColor: 'rgba(192, 192, 75, 1)', backgroundColor: 'rgba(192, 192, 75, 0.2)' },
      // Agregar más datasets para otros parámetros si es necesario
    ]
  });

  useEffect(() => {
    socket.on('nuevo-dato', (nuevoDato) => {
      setData((prevData) => {
        const newLabels = [...prevData.labels, nuevoDato.timestamp];
        const newTemperaturas = [...prevData.datasets[0].data, nuevoDato.temperatura];
        const newHumedades = [...prevData.datasets[1].data, nuevoDato.humedad];
        const newPesos = [...prevData.datasets[2].data, nuevoDato.peso];
        const newDendometros = [...prevData.datasets[3].data, nuevoDato.dendometro];
        const newPhs = [...prevData.datasets[4].data, nuevoDato.ph];

        return {
          labels: newLabels,
          datasets: [
            { ...prevData.datasets[0], data: newTemperaturas },
            { ...prevData.datasets[1], data: newHumedades },
            { ...prevData.datasets[2], data: newPesos },
            { ...prevData.datasets[3], data: newDendometros },
            { ...prevData.datasets[4], data: newPhs },
            // Agregar datos para otros parámetros si es necesario
          ],
        };
      });
    });

    return () => {
      socket.off('nuevo-dato');
    };
  }, []);

  return <Line data={data} />;
};

export default GraficoTiempoReal;
