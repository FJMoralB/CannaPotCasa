import { useState, useEffect } from 'react';
import axios from 'axios';

const useSemillas = () => {
  const [semillas, setSemillas] = useState([]);

  useEffect(() => {
    const fetchSemillas = async () => {
      try {
        console.log('Intentando obtener semillas'); // Mensaje de depuración
        const response = await axios.get('http://localhost:3001/semillas'); // Asegúrate de que el puerto es 3001
        console.log('Datos recibidos:', response.data); // Mensaje de depuración
        setSemillas(Array.isArray(response.data) ? response.data : []);
      } catch (error) {
        console.error("Error fetching semillas: ", error);
        setSemillas([]);
      }
    };

    fetchSemillas();
  }, []);

  return {
    semillas
  };
};

export default useSemillas;
