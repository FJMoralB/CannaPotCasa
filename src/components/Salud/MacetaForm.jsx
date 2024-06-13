import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Salud.css';

const MacetaForm = ({ maceta, onSave }) => {
  const [nombre, setNombre] = useState(maceta ? maceta.nombre : '');
  const [semillaId, setSemillaId] = useState(maceta ? maceta.semilla_id : '');
  const [imagen, setImagen] = useState(null);
  const [semillas, setSemillas] = useState([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const fetchSemillas = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/semillas');
        setSemillas(response.data);
      } catch (error) {
        setError('Error al obtener las semillas');
        console.error('Error al obtener las semillas:', error);
      }
    };

    fetchSemillas();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!nombre || !semillaId) {
      setError('Por favor, complete todos los campos');
      return;
    }

    const formData = new FormData();
    formData.append('nombre', nombre);
    formData.append('semilla_id', semillaId);
    if (imagen) {
      formData.append('imagen', imagen);
    }

    try {
      setError('');
      setSuccess('');
      if (maceta) {
        await axios.put(`http://localhost:5000/api/macetas/${maceta.id}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        setSuccess('Maceta actualizada exitosamente');
      } else {
        await axios.post('http://localhost:5000/api/macetas', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        setSuccess('Maceta guardada exitosamente');
      }
      onSave();
    } catch (error) {
      setError('Error al enviar la maceta');
      console.error('Error al enviar la maceta:', error);
    }
  };

  return (
    <div className="container">
      <form className="formulario" onSubmit={handleSubmit}>
        {error && <p className="error">{error}</p>}
        {success && <p className="success">{success}</p>}
        <label htmlFor="nombre">Nombre:</label>
        <input
          type="text"
          id="nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />

        <label htmlFor="semilla">Semilla:</label>
        <select
          id="semilla"
          value={semillaId}
          onChange={(e) => setSemillaId(e.target.value)}
        >
          <option value="">Seleccione una semilla</option>
          {semillas.map((semilla) => (
            <option key={semilla.id} value={semilla.id}>
              {semilla.nombre}
            </option>
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
