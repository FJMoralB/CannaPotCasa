import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog, faUser } from '@fortawesome/free-solid-svg-icons';
import './NavBar.css';
import logo from '../assets/image.png';
import menuLogo from '../assets/image.png'; // Importa la imagen del botón del menú
import { getAuth } from 'firebase/auth';
import { useAuth } from './AuthContext'; // Importa el hook de autenticación desde tu contexto

function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showSubMenu, setShowSubMenu] = useState(false);
  const { currentUser } = useAuth();
  const auth = getAuth();

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
      <nav className={`navbar ${menuOpen ? 'open' : ''}`}>
        <img 
          className="menu-image-button" 
          src={menuLogo} 
          alt="Menu" 
          onClick={toggleMenu} 
        />
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
            {currentUser ? (
              <>
                <Link className="menu-link" to="/Profile">
                  <FontAwesomeIcon icon={faUser} />
                </Link>
                <button className="menu-link" onClick={handleLogout}>Cerrar sesión</button>
              </>
            ) : (
              <Link className="menu-link-login" to="/Login">Login</Link>
            )}
          </li>
        </ul>
      </nav>
      <img className='img' src={logo} alt="" srcSet="" />
    </div>
  );
}

export default NavBar;
