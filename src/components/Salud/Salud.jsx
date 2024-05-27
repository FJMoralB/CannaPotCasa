import React, { useState } from "react";
import useMacetas from "./useMacetas";
import datosPlanta from "../parametros/plantas.json"; // Importa el archivo JSON local
import { Carousel } from 'react-responsive-carousel'; // Importa la biblioteca del carrusel
import "react-responsive-carousel/lib/styles/carousel.min.css"; // Importa los estilos del carrusel
import "./Salud.css"; // Importa el archivo CSS de estilos

function Salud() {
  const { macetas, agregarMaceta, actualizarMaceta } = useMacetas();
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [nombre, setNombre] = useState("");
  const [semilla, setSemilla] = useState("");
  const [imagen, setImagen] = useState(null);
  const [editando, setEditando] = useState(false);
  const [macetaEditandoId, setMacetaEditandoId] = useState(null);
  const [imagenURL, setImagenURL] = useState(null);

  const handleNombreChange = (event) => {
    setNombre(event.target.value);
  };

  const handleSemillaChange = (event) => {
    setSemilla(event.target.value);
  };

  const handleImagenChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImagen(file);
      setImagenURL(URL.createObjectURL(file));
    }
  };

  const handleAgregarActualizarMaceta = () => {
    const nuevaMaceta = {
      nombre,
      semilla,
      imagen: imagenURL
    };

    if (editando) {
      actualizarMaceta(macetaEditandoId, nuevaMaceta);
    } else {
      agregarMaceta(nuevaMaceta);
    }

    // Limpiar el formulario
    setNombre("");
    setSemilla("");
    setImagen(null);
    setImagenURL(null);
    setMostrarFormulario(false);
    setEditando(false);
    setMacetaEditandoId(null);
  };

  const iniciarEdicion = (maceta) => {
    setNombre(maceta.nombre);
    setSemilla(maceta.semilla);
    setImagenURL(maceta.imagen);
    setMostrarFormulario(true);
    setEditando(true);
    setMacetaEditandoId(maceta.id);
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
        <div className="formulario">
          <div>
            <label>Nombre de la maceta:</label>
            <input type="text" value={nombre} onChange={handleNombreChange} />
          </div>
          <div>
            <label>Selecciona una semilla:</label>
            <select value={semilla} onChange={handleSemillaChange}>
              <option value="">Seleccione una semilla</option>
              {datosPlanta.map((planta, index) => (
                <option key={index} value={planta.Nombre}>
                  {planta.Nombre}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label>Imagen de la maceta:</label>
            <input type="file" accept="image/*" onChange={handleImagenChange} />
            {imagenURL && <img src={imagenURL} alt="Vista previa" />}
          </div>
          <button onClick={handleAgregarActualizarMaceta}>
            {editando ? "Actualizar Maceta" : "Agregar Maceta"}
          </button>
        </div>
      )}
      <div>
        <h2>Tus Macetas</h2>
        <Carousel>
          {macetas.map((maceta, index) => (
            <div className="maceta" key={index}>
              <h2>{maceta.nombre}</h2>
              <p>Semilla: {maceta.semilla}</p>
              <img src={maceta.imagen} alt="Maceta" />
              <button onClick={() => iniciarEdicion(maceta)}>Editar</button>
            </div>
          ))}
        </Carousel>
      </div>
    </div>
  );
}

export default Salud;
