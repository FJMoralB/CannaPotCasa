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
    // Agrega más parámetros si es necesario
  });

  useEffect(() => {
    socket.on('nuevo-dato', (nuevoDato) => {
      setDatos({
        temperatura: nuevoDato.temperatura,
        humedad: nuevoDato.humedad,
        peso: nuevoDato.peso,
        dendometro: nuevoDato.dendometro,
        ph: nuevoDato.ph
        // Actualiza más parámetros si es necesario
      });
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
        {/* Agrega más elementos de lista para otros parámetros si es necesario */}
      </ul>
    </div>
  );
};

export default GraficoTiempoReal;
