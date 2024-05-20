import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog } from '@fortawesome/free-solid-svg-icons';
import './NavBar.css';
import logo from '../assets/image.png';
function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showSubMenu, setShowSubMenu] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const toggleSubMenu = () => {
    setShowSubMenu(!showSubMenu);
    if (!showSubMenu) {
      // Muestra un alert cuando se activa el submenú
      alert('¡Cuidado! Estás accediendo a opciones avanzadas.');
    }
  };

  return (
    <div className="container">
      
      <img className='img' src={logo} alt="" srcset="" />
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
          <li><Link className="menu-link" to="/Login">Login</Link></li>
        </ul>
      </nav>
    </div>
  );
}

export default NavBar;
