// NavBar.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog } from '@fortawesome/free-solid-svg-icons';
import './NavBar.css';
import logo from '../assets/image.png';
import { auth } from './firebaseConfig'; // Importa el objeto de autenticación de Firebase


function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showSubMenu, setShowSubMenu] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Estado para rastrear si el usuario está autenticado

  // Agrega un efecto de efecto secundario para verificar si el usuario está autenticado
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setIsLoggedIn(!!user); // Actualiza el estado de isLoggedIn basado en si hay un usuario autenticado o no
    });
    return () => unsubscribe();
  }, []);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const toggleSubMenu = () => {
    setShowSubMenu(!showSubMenu);
    if (!showSubMenu) {
      alert('¡Cuidado! Estás accediendo a opciones avanzadas.');
    }
  };

  const handleLogout = () => {
    auth.signOut(); // Cierra la sesión del usuario usando Firebase
  };

  return (
    <div className="container">
      <img className='img' src={logo} alt="" srcSet="" />
      <nav className={`navbar ${menuOpen ? 'open' : ''}`}>
        <div className={`menu-icon ${menuOpen ? 'open' : ''}`} onClick={toggleMenu}>
          <div className="menu-icon-line"></div>
          <div className="menu-icon-line"></div>
          <div className="menu-icon-line"></div>
        </div>
        <ul className={`menu ${menuOpen ? 'open' : ''}`}>
          <li><Link className="menu-link" to="/Salud">Salud</Link></li>
          <li><Link className="menu-link" to="/Graficas">Graficas</Link></li>
          <li><Link className="menu-link" to="/Notificaciones">Notificaciones</Link></li>
          <li>
            <span className="menu-link icon-link" onClick={toggleSubMenu}>
              <FontAwesomeIcon icon={faCog} />
            </span>
            {showSubMenu && (
              <ul className="submenu">
                <li><Link className="menu-link" to="/Parametros">Parametros</Link></li>
                <li><Link className="menu-link" to="/Control">Control</Link></li>
              </ul>
            )}
          </li>
          <li>
            {isLoggedIn ? (
              <button className="menu-link" onClick={handleLogout}>Cerrar sesión</button>
            ) : (
              <Link className="menu-link" to="/Login">Login</Link>
            )}
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default NavBar;
