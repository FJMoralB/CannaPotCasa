import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Salud.css';

const MacetaForm = () => {
  const [nombre, setNombre] = useState('');
  const [semillaId, setSemillaId] = useState('');
  const [imagen, setImagen] = useState(null);
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('nombre', nombre);
    formData.append('semilla_id', semillaId);
    formData.append('imagen', imagen);

    try {
      console.log('Enviando datos:', { nombre, semillaId, imagen });
      const response = await axios.post('http://localhost:3001/macetas', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log('Respuesta del servidor:', response.data);
    } catch (error) {
      console.error('Error al enviar la maceta:', error);
    }
  };

  return (
    <div className="container">
      <form className="formulario" onSubmit={handleSubmit}>
        <label htmlFor="nombre">Nombre:</label>
        <input
          type="text"
          id="nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />

        <label htmlFor="semilla">Semilla:</label>
        <select id="semilla" value={semillaId} onChange={(e) => setSemillaId(e.target.value)}>
          <option value="">Seleccione una semilla</option>
          {semillas.map((semilla) => (
            <option key={semilla.id} value={semilla.id}>{semilla.nombre}</option>
          ))}
        </select>

        <label htmlFor="imagen">Imagen:</label>
        <input
          type="file"
          id="imagen"
          onChange={(e) => setImagen(e.target.files[0])}
        />
        
        <button type="submit">Guardar</button>
      </form>
    </div>
  );
};

export default MacetaForm;
