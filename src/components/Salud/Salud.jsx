import React, { useState, useEffect } from "react";
import { auth, firestore } from "../firebaseConfig";
import datosPlanta from "../parametros/plantas.json"; // Importa el archivo JSON local
import "./Salud.css"; // Importa el archivo CSS de estilos

function Salud() {
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [macetas, setMacetas] = useState([]);
  const [nombre, setNombre] = useState("");
  const [semilla, setSemilla] = useState("");
  const [imagen, setImagen] = useState(null);

  useEffect(() => {
    const cargarMacetas = async () => {
      const usuario = auth.currentUser;
      if (usuario) {
        const macetasRef = firestore.collection("macetas").where("usuarioId", "==", usuario.uid);
        const snapshot = await macetasRef.get();
        const macetasGuardadas = snapshot.docs.map(doc => doc.data());
        setMacetas(macetasGuardadas);
      }
    };

    cargarMacetas();
  }, []);

  const handleNombreChange = (event) => {
    setNombre(event.target.value);
  };

  const handleSemillaChange = (event) => {
    setSemilla(event.target.value);
  };

  const handleImagenChange = (event) => {
    setImagen(event.target.files[0]);
  };

  const agregarMaceta = async () => {
    const usuario = auth.currentUser;
    if (usuario) {
      const nuevaMaceta = {
        nombre: nombre,
        semilla: semilla,
        imagen: imagen,
        usuarioId: usuario.uid
      };

      // Guardar la maceta en Firestore
      await firestore.collection("macetas").add(nuevaMaceta);
      
      // Recargar las macetas del usuario
      const macetasRef = firestore.collection("macetas").where("usuarioId", "==", usuario.uid);
      const snapshot = await macetasRef.get();
      const macetasGuardadas = snapshot.docs.map(doc => doc.data());
      setMacetas(macetasGuardadas);
      
      // Limpiar el formulario
      setNombre("");
      setSemilla("");
      setImagen(null);
      // Ocultar el formulario después de agregar la maceta
      setMostrarFormulario(false);
    }
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
          </div>
          <button onClick={agregarMaceta}>Agregar Maceta</button>
        </div>
      )}
      <div>
        {macetas.map((maceta, index) => (
          <div className="maceta" key={index}>
            <h2>{maceta.nombre}</h2>
            <p>Semilla: {maceta.semilla}</p>
            <img src={URL.createObjectURL(maceta.imagen)} alt="Maceta" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Salud;
