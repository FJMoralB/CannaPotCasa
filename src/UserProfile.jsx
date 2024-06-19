import React, { useState, useEffect } from 'react';
import { useAuth } from './components/AuthContext'; // Importa el hook de autenticación desde tu contexto
import { getAuth, updateProfile } from 'firebase/auth';
import './AuthContext.css'; // Importa los estilos

function UserProfile() {
  const { currentUser } = useAuth();
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [photoURL, setPhotoURL] = useState('');

  useEffect(() => {
    if (currentUser) {
      setDisplayName(currentUser.displayName || '');
      setEmail(currentUser.email || '');
      setPhotoURL(currentUser.photoURL || '');
    }
  }, [currentUser]);

  const handleUpdateProfile = async () => {
    try {
      await updateProfile(currentUser, { displayName, photoURL });
      console.log('Perfil actualizado exitosamente');
    } catch (error) {
      console.error('Error al actualizar el perfil:', error.message);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
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
        <button onClick={handleUpdateProfile}>Actualizar Perfil</button>
      </div>
    </div>
  );
}

export default UserProfile;
