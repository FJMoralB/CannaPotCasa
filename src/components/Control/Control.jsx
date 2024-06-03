import React, { useState } from 'react';
import './control.css'; // Importa el archivo CSS para los estilos
import { Label } from 'recharts';

// Componente para el control individual de cada bomba
const BombaControl = ({ bombaId }) => {
  return (
    <div className="control-bomba">
      <h1>Bomba {bombaId}</h1>
      <form action="" method="get">
        <span>ml/min</span>
        <br />
        <input type="number" placeholder="ml/min" name={`ml${bombaId}`} id="" />
        <br />
        <span>o</span>
        <br />
        <span>Hz</span>
        <br />
        <input type="number" placeholder="hz" name={`hz${bombaId}`} id="" />
      </form>
    </div>
  );
};

// Componente para cada célula de peso
const CelulaPeso = ({ id, weight, onWeightChange }) => {
  return (
    <div className="celula-peso">
      <label htmlFor={`peso${id}`}>Célula de Peso {id}</label>
      <input
        type="number"
        id={`peso${id}`}
        value={weight}
        onChange={(e) => onWeightChange(id, parseFloat(e.target.value) || 0)}
  
      />
    </div>
  );
};

// Componente principal de control
const Control = () => {
  // Estado para almacenar los pesos de las cuatro células
  const [weights, setWeights] = useState({ 1: 0, 2: 0, 3: 0, 4: 0 });

  // Manejador para actualizar el peso de una célula específica
  const handleWeightChange = (id, value) => {
    setWeights((prevWeights) => ({
      ...prevWeights,
      [id]: value
    }));
  };

  // Manejador para restablecer todos los pesos a cero
  const handleTara = () => {
    setWeights({ 1: 0, 2: 0, 3: 0, 4: 0 });
  };

  // Calcular el peso total
  const totalWeight = Object.values(weights).reduce((a, b) => a + b, 0);

  return (
    <div>
      {/* Renderiza los componentes de control de bomba */}
      <div className="bombas-container">
        {['Agua', 'Abono A y B', 'ph'].map((id) => (
          <BombaControl key={id} bombaId={id} />
        ))}
      </div>
      {/* Botones de control para Tara y Paro de Emergencia */}
      <div className="control-buttons">
        <button type="button" onClick={handleTara}>
          Tara
        </button>
        <button type="button" onClick={() => alert('Paro de Emergencia activado')}>
          Paro de Emergencia
        </button>
      </div>
      {/* Renderiza las células de peso y el peso total en dos columnas */}
      <div className="celulas-peso-container">
        {[1, 2, 3, 4].map((id) => (
          <CelulaPeso key={id} id={id} weight={weights[id]} onWeightChange={handleWeightChange} />
        ))}
      </div>
      {/* Contenedor para centrar el peso total */}
      <div className="total-weight-container">
        <div className="total-weight">
          <h2>Total Peso: {totalWeight} kg</h2>
        </div>
      </div>
      {/* Botón de paro centrado en la parte inferior */}
      <div className="control-buttons-bottom">
        <button type="button" onClick={() => alert('Paro activado')}>
          Paro
        </button>
      </div>
    </div>
  );
};

export default Control;
