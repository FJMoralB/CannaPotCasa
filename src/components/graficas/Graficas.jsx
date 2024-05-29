import React from 'react';
import GraficoBD from './GraficoBD';
import GraficoTiempoReal from './GraficoTiempoReal';
import './Graficas.css'; // Asegúrate de tener estilos CSS si es necesario

function Graficas() {
  return (
    <div className="graficas-container">
      <h2>Gráficos de Datos</h2>
      <GraficoBD />
      <GraficoTiempoReal />
    </div>
  );
}

export default Graficas;
