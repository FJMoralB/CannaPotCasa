import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import './GraficoTiempoReal.css'; // Importa el archivo CSS

const socket = io('http://localhost:3001');

const GraficoTiempoReal = () => {
  const [datos, setDatos] = useState({
    temperatura: 0,
    humedad: 0,
    peso: 0,
    dendometro: 0,
    ph: 0
  });

  useEffect(() => {
    socket.on('nuevo-dato', (nuevoDato) => {
      setDatos(nuevoDato);
    });

    return () => {
      socket.off('nuevo-dato');
    };
  }, []);

  return (
    <div className="datos-tiempo-real">
      <ul>
        <li>Temperatura: {datos.temperatura}°C</li>
        <li>Humedad: {datos.humedad}%</li>
        <li>Peso: {datos.peso}kg</li>
        <li>Dendómetro: {datos.dendometro}mm</li>
        <li>PH: {datos.ph}</li>
      </ul>
    </div>
  );
};

export default GraficoTiempoReal;
