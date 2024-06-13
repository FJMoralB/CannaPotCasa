// App.jsx
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar';
import Salud from './components/Salud/Salud';
import Control from './components/Control/Control';
import Notificaciones from './components/Notificaciones';
import Parametros from './components/parametros/Parametros';
import Graficas from './components/graficas/Graficas';
import Login from './components/login/Login';
import PrivateRoute from './components/PrivateRoute';
import { AuthProvider } from './components/AuthContext';

import "./App.css";

function App() {
  return (
    <AuthProvider>
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/Salud" element={<PrivateRoute><Salud /></PrivateRoute>} />
          <Route path="/Notificaciones" element={<PrivateRoute><Notificaciones /></PrivateRoute>} />
          <Route path="/Control" element={<PrivateRoute><Control /></PrivateRoute>} />
          <Route path="/Parametros" element={<PrivateRoute><Parametros /></PrivateRoute>} />
          <Route path="/Graficas" element={<PrivateRoute><Graficas /></PrivateRoute>} />
          <Route path="/Login" element={<Login />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
