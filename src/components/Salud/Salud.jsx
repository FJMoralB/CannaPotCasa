import React, { useState } from "react";
import useMacetas from "./useMacetas";
import useSemillas from "./useSemillas";
import './MacetaForm.css';
import MacetaForm from "./MacetaForm";

function Salud() {
  const { macetas, agregarMaceta, actualizarMaceta, eliminarMaceta } = useMacetas();
  const { semillas } = useSemillas();
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [macetaEditando, setMacetaEditando] = useState(null);

  const handleAgregarActualizarMaceta = (data) => {
    if (macetaEditando) {
      actualizarMaceta(macetaEditando.id, data);
      setMacetaEditando(null);
    } else {
      agregarMaceta(data);
    }
    setMostrarFormulario(false);
  };

  const iniciarEdicion = (maceta) => {
    setMacetaEditando(maceta);
    setMostrarFormulario(true);
  };

  return (
    <div className="container">
      <h1>Agregar Macetas</h1>
      <div className="formulario">
        <button onClick={() => setMostrarFormulario(!mostrarFormulario)}>
          {mostrarFormulario ? "Ocultar formulario" : "Mostrar formulario"}
        </button>
      </div>
      {mostrarFormulario && (
        <MacetaForm 
          onSubmit={handleAgregarActualizarMaceta} 
          initialData={macetaEditando || {}} 
          semillas={semillas} 
        />
      )}
      <div className="maceta-list">
        {macetas.map((maceta) => (
          <div key={maceta.id}>
            <h2>{maceta.nombre}</h2>
            <p>{maceta.semilla}</p>
            <img src={maceta.imagenURL} alt={maceta.nombre} />
            <button onClick={() => iniciarEdicion(maceta)}>Editar</button>
            <button onClick={() => eliminarMaceta(maceta.id)}>Eliminar</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Salud;
