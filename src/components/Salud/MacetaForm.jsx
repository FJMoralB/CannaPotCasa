import React, { useState, useEffect } from "react";
import './MacetaForm.css';

const MacetaForm = ({ onSubmit, initialData = {}, semillas }) => {
    const defaultData = {
        nombre: "",
        semilla: "",
        imagen: null,
        imagenURL: null,
        ...initialData
    };

    const [formData, setFormData] = useState(defaultData);

    useEffect(() => {
        setFormData(defaultData);
    }, [initialData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleImagenChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFormData({
                ...formData,
                imagen: file,
                imagenURL: URL.createObjectURL(file)
            });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent form submission
        if (!formData.nombre || !formData.semilla) {
            alert("Todos los campos son obligatorios.");
            return;
        }
        onSubmit(formData);
        setFormData({
            nombre: "",
            semilla: "",
            imagen: null,
            imagenURL: null,
        });
    };

    return (
        <div className="form-container">
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="nombre">Nombre de la maceta</label>
                    <input
                        type="text"
                        id="nombre"
                        name="nombre"
                        value={formData.nombre}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="semilla">Selecciona una semilla</label>
                    <select
                        id="semilla"
                        name="semilla"
                        value={formData.semilla}
                        onChange={handleChange}
                    >
                        <option value="">Seleccione una semilla</option>
                        {semillas.map((planta, index) => (
                            <option key={index} value={planta.Nombre}>
                                {planta.Nombre}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="imagen">Subir Imagen</label>
                    <input
                        type="file"
                        id="imagen"
                        accept="image/*"
                        onChange={handleImagenChange}
                    />
                    {formData.imagenURL && (
                        <img src={formData.imagenURL} alt="Maceta" className="preview-image" />
                    )}
                </div>
                <button type="submit">
                    {initialData.nombre ? "Actualizar Maceta" : "Agregar Maceta"}
                </button>
            </form>
        </div>
    );
};

export default MacetaForm;
