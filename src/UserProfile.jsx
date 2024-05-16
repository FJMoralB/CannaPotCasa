import React, { useState, useEffect } from 'react';
import { useAuth } from 'firebase/auth'; // Asegúrate de importar el hook de autenticación de Firebase que estés utilizando

function UserProfile() {
    const [displayName, setDisplayName] = useState('');
    const [email, setEmail] = useState('');
    const [photoURL, setPhotoURL] = useState('');
    const auth = useAuth(); // Obtén el objeto de autenticación de Firebase

    // Función para cargar la información del usuario al cargar el componente
    useEffect(() => {
        const user = auth.currentUser; // Obtiene el usuario actual
        if (user) {
            // Si hay un usuario autenticado, carga su información
            setDisplayName(user.displayName || '');
            setEmail(user.email || '');
            setPhotoURL(user.photoURL || '');
        }
    }, [auth]);

    // Función para actualizar el perfil del usuario
    const updateProfile = async () => {
        const user = auth.currentUser; // Obtiene el usuario actual
        try {
            await updateProfile(user, { displayName, photoURL });
            console.log('Perfil actualizado exitosamente');
        } catch (error) {
            console.error('Error al actualizar el perfil:', error.message);
        }
    };

    return (
        <div>
            <h2>Perfil de Usuario</h2>
            <div>
                <label>Nombre:</label>
                <input
                    type="text"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                />
            </div>
            <div>
                <label>Email:</label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled
                />
            </div>
            <div>
                <label>Foto de Perfil:</label>
                <input
                    type="text"
                    value={photoURL}
                    onChange={(e) => setPhotoURL(e.target.value)}
                />
            </div>
            <button onClick={updateProfile}>Actualizar Perfil</button>
        </div>
    );
}

export default UserProfile;
