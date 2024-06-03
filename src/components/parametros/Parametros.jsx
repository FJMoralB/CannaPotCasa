import React, { useState, useEffect } from 'react';
import plantasData from './plantas.json';
import './parametros.css';

function MultipleRangeInputs() {
  // Recuperar el último valor enviado del almacenamiento local
  const lastValues = JSON.parse(localStorage.getItem('lastValues'));

  // Define el estado para almacenar los valores de los input de rango
  const [values, setValues] = useState(lastValues || {
    range1: 1,
    range2: 1,
    range3: 1,
    range4: 1,
    range5: 30,
    range6: 70,
    range7: 50,
    range8: 30,
    range9: 70,
    range10: 10,
  });

  // Define el estado para almacenar la planta seleccionada
  const [plantaSeleccionada, setPlantaSeleccionada] = useState(null);

  // Función para manejar los cambios en los input de rango
  const handleRangeChange = (event) => {
    const { id, value } = event.target;
    setValues(prevValues => ({
      ...prevValues,
      [id]: value
    }));
  };

  // Función para manejar el cambio en la selección de planta
  const handlePlantaChange = (event) => {
    const plantaIndex = event.target.value;
    const plantaSeleccionada = plantasData[plantaIndex];
    setPlantaSeleccionada(plantaSeleccionada);
    // Cargar los valores de los parámetros de la planta seleccionada
    setValues({
      range1: plantaSeleccionada.Temperatura,
      range2: plantaSeleccionada['Luz azul'],
      range3: plantaSeleccionada['Luz Roja'],
      range4: plantaSeleccionada['Luz Roja Lejano'],
      range5: plantaSeleccionada['Luz Blanca'],
      range6: plantaSeleccionada.Humedad,
      range7: plantaSeleccionada['Abono A'],
      range8: plantaSeleccionada['Abono B'],
      range9: plantaSeleccionada.Ph,
      range10: plantaSeleccionada.Agua,
    });
  };

  // Función para manejar el clic del botón
  const handleSubmit = () => {
    // Guardar los valores en el almacenamiento local
    localStorage.setItem('lastValues', JSON.stringify(values));
    // Aquí puedes hacer lo que quieras con los valores de los rangos
    console.log('Valores de los rangos enviados:', values);
    console.log('Planta seleccionada:', plantaSeleccionada);
  };

  return (
    <div className='parametros-container'>
      <h1>Recetas Manuales</h1>
      <div className="select-container">
        <label htmlFor="plantaSelect">Selecciona una planta:</label>
        <select id="plantaSelect" onChange={handlePlantaChange}>
          <option value="-1">Selecciona una planta</option>
          {plantasData.map((planta, index) => (
            <option key={index} value={index}>{planta.Nombre}</option>
          ))}
        </select>
      </div>

      {plantaSeleccionada && (
        <div className="parametros">
          <div>
            <span>Temperatura: {values.range1} ºC</span>
            <input type="range" id="range1" min="15" max="36" value={values.range1} onChange={handleRangeChange} />
          </div>

          <div>
            <span>Luz Azul: {values.range2} nm</span>
            <input type="range" id="range2" min="350" max="550" value={values.range2} onChange={handleRangeChange} />
          </div>

          <div>
            <span>Luz Roja: {values.range3} nm</span>
            <input type="range" id="range3" min="600" max="800" value={values.range3} onChange={handleRangeChange} />
          </div>

          <div>
            <span>Luz Roja Lejano: {values.range4} nm</span>
            <input type="range" id="range4" min="700" max="800" value={values.range4} onChange={handleRangeChange} />
          </div>

          <div>
            <span>Luz Blanca: {values.range5} lux</span>
            <input type="range" id="range5" min="0" max="100" value={values.range5} onChange={handleRangeChange} />
          </div>

          <div>
            <span>Humedad: {values.range6} Hr</span>
            <input type="range" id="range6" min="30" max="100" value={values.range6} onChange={handleRangeChange} />
          </div>

          <div>
            <span>Abono A: {values.range7} ml/min</span>
            <input type="range" id="range7" min="1" max="10" value={values.range7} onChange={handleRangeChange} />
          </div>

          <div>
            <span>Abono B: {values.range8} ml/min</span>
            <input type="range" id="range8" min="0" max="10" value={values.range8} onChange={handleRangeChange} />
          </div>

          <div>
            <span>Ph: {values.range9} ml/min</span>
            <input type="range" id="range9" min="0" max="10" value={values.range9} onChange={handleRangeChange} />
          </div>

          <div>
            <span>Agua: {values.range10} ml/min</span>
            <input type="range" id="range10" min="0" max="50" value={values.range10} onChange={handleRangeChange} />
          </div>
        </div>
      )}

      <button onClick={handleSubmit}>Enviar</button>
    </div>
  );
}

export default MultipleRangeInputs;
