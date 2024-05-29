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
        const response = await axios.get('http://localhost:3001/semillas');
        setSemillas(response.data);
      } catch (error) {
        console.error('Error al obtener las semillas:', error);
      }
    };

    fetchSemillas();
  }, []);

  return (
    <div className="container">
      <h1>Gestión de Macetas</h1>
      <MacetaForm />
      <CarruselMacetas />
    </div>
  );
};

export default Salud;
