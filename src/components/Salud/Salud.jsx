import React, { useState, useEffect } from 'react';
import './Salud.css'; // Importa el archivo CSS de estilos
import MacetaCard from '../Salud/MacetaCard'; // Importa el componente
import Feliz from '../Salud/Feliz.png';
import Regular from '../Salud/Regular.png';
import medio from '../Salud/Medio.png';
import muerta from '../Salud/Muerta.png';

// Define los estados de salud y sus imágenes asociadas
const saludImages = {
  SALUDABLE: Feliz,
  NECESITA_AGUA: Regular,
  DEMASIADO_SOL: medio,
  DEMASIADA_HUMEDAD: muerta,
};

const Salud = ({ datosPlanta }) => {
  // Estado local para almacenar el estado de salud actual
  const [estadoSalud, setEstadoSalud] = useState('');

  // Función para evaluar el estado de salud basado en los datos de la planta
  const evaluarSalud = (datos) => {
    // Implementa aquí tu algoritmo de evaluación de salud
    // Por ahora, este ejemplo simplemente establece un estado de salud aleatorio
    const estadosSalud = Object.keys(saludImages);
    const estadoAleatorio = estadosSalud[Math.floor(Math.random() * estadosSalud.length)];
    setEstadoSalud(estadoAleatorio);
  };

  // Utiliza useEffect para actualizar el estado de salud cuando cambien los datos de la planta
  useEffect(() => {
    evaluarSalud(datosPlanta);
  }, [datosPlanta]);

  return (
    
    <div className='contenedor'>

      <div className='Estado'>
        <h2>Salud de la planta</h2>
        <p>Estado: {estadoSalud}</p>
        <img src={saludImages[estadoSalud]} alt={`Imagen de ${estadoSalud}`} className='imagen' />
      </div>
      
    </div>
  );
};

export default Salud;
