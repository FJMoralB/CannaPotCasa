import React, { useEffect, useState } from 'react';
import axios from 'axios';
import MacetaForm from './MacetaForm';
import CarruselMacetas from './CarruselMacetas';
import './Salud.css';

const Salud = () => {
  const [semillas, setSemillas] = useState([]);

  useEffect(() => {
    const fetchSemillas = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/semillas');
        setSemillas(response.data);
      } catch (error) {
        console.error('Error al obtener las semillas:', error);
      }
    };

    fetchSemillas();
  }, []);

  return (
    <div className="container-Salud">
      <h1 className='saludName'>Salud de Maceta</h1>
      <div className="formulario"><MacetaForm semillas={semillas} /></div>
      <div className="carrusel"><CarruselMacetas /></div>
    </div>
  );
};

export default Salud;
