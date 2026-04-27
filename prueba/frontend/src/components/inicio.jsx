import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../CSS/inicio.css';


function Login() {
  
  const navigate = useNavigate();

  const [correo, setCorreo] = useState('');
  const [password, setPassword] = useState('');


  const manejarEnvio = async (evento) => {
    evento.preventDefault(); 
    
    try {

      const res = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
          'Content-Type' : 'application/json'
        },
        body: JSON.stringify({
          email: correo,
          password: password
        })
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem('token', data.token);
        alert('Inicio de sesion existoso');

        //redigir
        
        navigate('/');

      }else {
        alert(data.error || 'Error en inicio sesion');
      }
      
    } catch (error) {
      console.error(error);
      alert('Error de conexion con el servidor');
    }
    
  };

return (
  <div className="login-container">
    <form id="loginForm" onSubmit={manejarEnvio}>
      <h2>Iniciar sesión</h2>
      
      <label htmlFor="usuario">Correo electrónico</label>
      <input
        type="text"
        id="usuario"
        placeholder="Correo electronico"
        required
        value={correo}
        onChange={(e) => setCorreo(e.target.value)}
      />

      <label htmlFor="password">Contraseña</label>
      <input
        type="password"
        id="password"
        placeholder="Contraseña"
        required
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <div className="checkbox-container">
        <input type="checkbox" id="remember" />
        <label htmlFor="remember">Recordarme</label>
      </div>

      <button type="submit">Iniciar sesión</button>
      
      <p>
        ¿No tienes cuenta?{" "}
        <Link to="/registro">Registrar sesión</Link>
      </p>
    </form>
  </div>
); };

// 5. Exportamos el componente para poder usarlo en App.jsx
export default Login;