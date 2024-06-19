import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { getAuth } from 'firebase/auth';
import './login.css';
import google from './google.png';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const auth = getAuth();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    try {
      if (isRegistering) {
        await createUserWithEmailAndPassword(auth, email, password);
        console.log('Usuario registrado');
      } else {
        await signInWithEmailAndPassword(auth, email, password);
        console.log('Sesión iniciada');
      }
      navigate('/profile');  // Redirige al usuario a la página de perfil
    } catch (error) {
      setError('Error al autenticar: ' + error.message);
      console.error('Error al autenticar:', error);
    }
  };

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      console.log('Usuario de Google:', result.user);
      navigate('/profile');  // Redirige al usuario a la página de perfil
    } catch (error) {
      setError('Error al iniciar sesión con Google: ' + error.message);
      console.error('Error al iniciar sesión con Google:', error);
    }
  };

  return (
    <div className="login">
      <div className="content">
        <div className="formulario">
          <h2 className="form_inicio"></h2>
          <form onSubmit={handleSubmit}>
            <div>
              <label>Introduce email:</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <label>Introduce Contraseña:</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit">
              {isRegistering ? 'Registrarse' : 'Iniciar Sesión'}
            </button>
            {error && <p className="error">{error}</p>}
          </form>
          <button onClick={handleGoogleLogin} className="google-login">
            <img src={google} alt="Google" /> {/* Icono de Google */}
            Iniciar sesión con Google {/* Texto del botón */}
          </button>
          <p>
            {isRegistering
              ? '¿Ya tienes una cuenta? '
              : '¿No tienes una cuenta? '}
            <button onClick={() => setIsRegistering(!isRegistering)}>
              {isRegistering ? 'Iniciar Sesión' : 'Registrarse'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
