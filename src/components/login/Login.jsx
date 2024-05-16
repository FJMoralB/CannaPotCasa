import React, { useState } from 'react';
import './login.css';
import image from './image.png';
import google from './google.png';
import 'firebase/auth';


function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isRegistering, setIsRegistering] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();
        if (isRegistering) {
            console.log('Registrando usuario...');
        } else {
            console.log('Iniciando sesión...');
        }
        console.log('Email:', email);
        console.log('Password:', password);
    };

    const handleGoogleLogin = () => {
        const provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(provider)
            .then((result) => {
                // Handle successful login
                console.log('Usuario de Google:', result.user);
            })
            .catch((error) => {
                // Handle errors
                console.error('Error al iniciar sesión con Google:', error);
            });
    };

    return (
        <>
            <div className="login">
                <div className="header">
                    <h1 className="titulo">Cannapot</h1>
                    <h2 className="nombre">Maceta Inteligente</h2>
                </div>

                <div className="content">
                    <div className="imagen"> <img src={image} alt="logo" /></div>
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
        </>
    );
}

export default Login;
