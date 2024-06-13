import axios from 'axios';
import React, { useEffect, useState } from 'react';
import MacetaForm from './MacetaForm';

const CarruselMacetas = () => {
  const [macetas, setMacetas] = useState([]);
  const [editMaceta, setEditMaceta] = useState(null);

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
  };

  const handleSave = () => {
    setEditMaceta(null);
    fetchMacetas();
  };

  const renderImage = (imagen) => {
    if (imagen) {
      const blob = new Blob([new Uint8Array(imagen.data)], { type: 'image/png' });
      const url = URL.createObjectURL(blob);
      return <img src={url} alt="Maceta" />;
    }
    return null;
  };

  return (
    <div>
      {editMaceta ? (
        <MacetaForm maceta={editMaceta} onSave={handleSave} />
      ) : (
        <div>
          {macetas.length > 0 ? (
            macetas.map((maceta) => (
              <div key={maceta.id}>
                <h3>{maceta.nombre}</h3>
                <h3>{maceta.nombre_semilla}</h3>
                {renderImage(maceta.imagen)}
                <button onClick={() => handleEditClick(maceta)}>Editar</button>
              </div>
            ))
          ) : (
            <p>Cargando macetas...</p>
          )}
        </div>
      )}
    </div>
  );
};

export default CarruselMacetas;
