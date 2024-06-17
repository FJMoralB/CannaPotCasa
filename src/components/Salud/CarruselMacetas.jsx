import React, { useEffect, useState } from 'react';
import axios from 'axios';
import MacetaForm from './MacetaForm';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import './CarruselMacetas.css';  // Asegúrate de importar el archivo CSS

const CarruselMacetas = () => {
  const [macetas, setMacetas] = useState([]);
  const [editMaceta, setEditMaceta] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const fetchMacetas = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/macetas');
      setMacetas(response.data);
    } catch (error) {
      console.error('Error al obtener las macetas:', error);
    }
  };

  useEffect(() => {
    fetchMacetas();
  }, []);

  const handleEditClick = (maceta) => {
    setEditMaceta(maceta);
    setShowForm(true);
  };

  const handleSave = () => {
    setEditMaceta(null);
    setShowForm(false);
    fetchMacetas();
  };

  const handleAddClick = () => {
    setEditMaceta(null);
    setShowForm(!showForm);
  };

  const renderImage = (imagen) => {
    if (imagen) {
      const blob = new Blob([new Uint8Array(imagen.data)], { type: 'image/png' });
      const url = URL.createObjectURL(blob);
      return <img src={url} alt="Maceta" />;
    }
    return <img src="placeholder.png" alt="Placeholder" />;
  };

  return (
    <div className="carrusel-container">
      <button className="add-button" onClick={handleAddClick}>+</button>
      {showForm ? (
        <MacetaForm maceta={editMaceta} onSave={handleSave} />
      ) : (
        <Carousel showThumbs={false} dynamicHeight>
          {macetas.length > 0 ? (
            macetas.map((maceta) => (
              <div key={maceta.id} className="maceta-item">
                <h3>{maceta.nombre}</h3>
                <h3>{maceta.nombre_semilla}</h3>
                <div className="image-container">
                  {renderImage(maceta.imagen)}
                </div>
                <button className="edit-button" onClick={() => handleEditClick(maceta)}>Editar</button>
              </div>
            ))
          ) : (
            <p>Cargando macetas...</p>
          )}
        </Carousel>
      )}
    </div>
  );
};

export default CarruselMacetas;
