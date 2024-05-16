import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar';
import Salud from './components/Salud/Salud';
import Control from './components/Control';
import Notificaciones from './components/Notificaciones';
import Parametros from './components/parametros/Parametros';
import Graficas from './components/graficas/Graficas';
import Login from './components/login/Login';

import "./App.css";

function App() {
  return (
    <div>
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<Salud />} />
          <Route path="/Salud" element={<Salud />} />
          <Route path="/Notificaciones" element={<Notificaciones />} />
          <Route path="/Control" element={<Control />} />
          <Route path="/Parametros" element={<Parametros />} />
          <Route path="/Graficas" element={<Graficas />} />
          <Route path="/Login" element={<Login />} />

        </Routes>
      </Router>
    </div>
  );
}

export default App;
