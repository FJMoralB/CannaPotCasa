import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import './Salud.css';

const CarruselMacetas = () => {
  const [macetas, setMacetas] = useState([]);
  const [editingMaceta, setEditingMaceta] = useState(null);

  useEffect(() => {
    fetchMacetas();
  }, []);

  const fetchMacetas = async () => {
    try {
      const response = await axios.get('http://localhost:3001/macetas');
      setMacetas(response.data);
    } catch (error) {
      console.error('Error al obtener las macetas:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/macetas/${id}`);
      fetchMacetas();
    } catch (error) {
      console.error('Error al eliminar la maceta:', error);
    }
  };

  const handleEdit = (maceta) => {
    setEditingMaceta(maceta);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const { id, nombre, semilla_id, imagen } = editingMaceta;

    const formData = new FormData();
    formData.append('nombre', nombre);
    formData.append('semilla_id', semilla_id);
    if (imagen) formData.append('imagen', imagen);

    try {
      await axios.put(`http://localhost:3001/macetas/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      setEditingMaceta(null);
      fetchMacetas();
    } catch (error) {
      console.error('Error al actualizar la maceta:', error);
    }
  };

  return (
    <div className="carrusel-container">
      <h2>Tus Macetas</h2>
      {editingMaceta ? (
        <form onSubmit={handleUpdate}>
          <input
            type="text"
            value={editingMaceta.nombre}
            onChange={(e) =>
              setEditingMaceta({ ...editingMaceta, nombre: e.target.value })
            }
          />
          <input
            type="text"
            value={editingMaceta.semilla_id}
            onChange={(e) =>
              setEditingMaceta({ ...editingMaceta, semilla_id: e.target.value })
            }
          />
          <input
            type="file"
            onChange={(e) =>
              setEditingMaceta({ ...editingMaceta, imagen: e.target.files[0] })
            }
          />
          <button type="submit">Actualizar</button>
          <button onClick={() => setEditingMaceta(null)}>Cancelar</button>
        </form>
      ) : (
        <Carousel showThumbs={false} autoPlay={true} infiniteLoop={true}>
          {macetas.map((maceta) => (
            <div key={maceta.id}>
              {maceta.imagen_url && <img src={maceta.imagen_url} alt={maceta.nombre} />}
              <p className="legend">{maceta.nombre}</p>
              <button onClick={() => handleEdit(maceta)}>Editar</button>
              <button onClick={() => handleDelete(maceta.id)}>Eliminar</button>
            </div>
          ))}
        </Carousel>
      )}
    </div>
  );
};

export default CarruselMacetas;
