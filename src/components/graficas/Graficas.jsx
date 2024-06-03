import React from 'react';
import GraficoBD from './GraficoBD';
import GraficoTiempoReal from './GraficoTiempoReal';
import './Graficas.css'; // Asegúrate de tener estilos CSS si es necesario

function Graficas() {
  return (
    <div className="graficas-container">
      <div className="grafico-bd">
        <h2>Gráfico de Datos</h2>
        <GraficoBD />
      </div>
      <div className="grafico-tiempo-real">
        <h2>Datos Tiempo Real</h2>
        <GraficoTiempoReal />
      </div>
    </div>
  );
}

export default Graficas;
