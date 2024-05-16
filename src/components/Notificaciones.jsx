import React from 'react';
import './Notificaciones.css'; // Importar el archivo CSS para estilos

const Notificaciones = () => {
  return (
    <div className="notificaciones-container">
      <div className="seccion">
        <h2>Últimas Notificaciones</h2>
        <ul>
          <li><strong>Alerta de Humedad:</strong> La humedad del suelo está baja. Se recomienda regar la planta.</li>
          <li><strong>Temperatura Extrema:</strong> La temperatura ambiente ha superado los límites recomendados para la planta.</li>
          <li><strong>Recordatorio de Fertilización:</strong> Ha pasado un mes desde la última fertilización. Se recomienda aplicar fertilizante.</li>
        </ul>
      </div>
      
      <div className="seccion">
        <h2>Preferencias de Notificación</h2>
        <p><strong>Notificaciones Urgentes:</strong> Activado</p>
        <p><strong>Horario de Notificaciones:</strong> 8:00 - 20:00</p>
      </div>

      <div className="seccion">
        <h2>Historial de Notificaciones</h2>
        <ul>
          <li>24 de Abril, 10:30 AM: La planta ha sido regada.</li>
          <li>23 de Abril, 12:15 PM: La planta está recibiendo demasiada luz directa. Se recomienda moverla a un lugar más sombreado.</li>
          <li>21 de Abril, 8:00 AM: La planta ha sido fertilizada.</li>
        </ul>
      </div>
    </div>
  );
}

export default Notificaciones;
