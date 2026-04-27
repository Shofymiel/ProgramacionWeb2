import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import '../CSS/home.css';
import video from '../assets/VIDEOS/Video_Pero_Feliz.mp4';
import logo from '../assets/IMAGENES/LogoAnimal.png';

function Home() {
  const navigate = useNavigate();

  const [nombre, setNombre] = useState('');

  useEffect(() => {
    const nombreGuardado = localStorage.getItem('nombre');
    if (nombreGuardado) {
      setNombre(nombreGuardado);
    }
  }, []);

  return (
    <>
      {/* HEADER */}
      <header>
        <h1>PETGYM</h1>
        <nav>
          <Link to="/">HOME</Link>
          <Link to="/about">NOSOTROS</Link>
          <Link to="/store">TIENDA</Link>
          <Link to="/biblioteca">BIBLIOTECA</Link>
          <Link to="/tareas">TAREAS</Link>
          <Link to="/inicio">INICIAR SESION</Link>
          <span>/</span>
          <Link to="/registro">REGISTRARSE</Link>
        </nav>
      </header>

      {/* VIDEO + TEXTO */}
      <div className="video-section">
        <video autoPlay muted loop playsInline>
          <source src={video} type="video/mp4" />
        </video>
        <div className="video-overlay"></div>

        <div id="fashion">
          <h2>El mejor gimnasio para tu mascota cabe en tu sala</h2>
        </div>
      </div>

      <section className="hero"></section>

      <section className="problema">
        <h2>¿Vives en apartamento y sientes que no es suficiente para tu mascota?</h2>
        <p>Cada vez más perros desarrollan ansiedad...</p>
      </section>

      <section className="solucion">
        <h2>PetGym: Tu aliado en espacios pequeños</h2>
        <p>Hacemos accesible el entrenamiento profesional...</p>

        <div className="caracteristicas">
          <div className="card">
            <h3>GUIAS CERTIFICADAS</h3>
            <p>Videos y artículos creados por profesionales.</p>
          </div>

          <div className="card">
            <h3>RUTINAS PERSONALIZADAS</h3>
            <p>Según raza, tamaño y espacio disponible.</p>
          </div>

          <div className="card">
            <h3>GAMIFICACION</h3>
            <p>Convierte el ejercicio en un juego</p>
          </div>

          <div className="card">
            <h3>TIENDA ONLINE</h3>
            <p>Productos para estimulación</p>
          </div>
        </div>
      </section>

      <section className="como-funciona">
        <h2>Empieza en 5 pasos</h2>
        <div className="pasos">
          <div className="paso">1. Regístrate</div>
          <div className="paso">2. Registra a tu mascota</div>
          <div className="paso">3. Explora rutinas</div>
          <div className="paso">4. Entrena</div>
          <div className="paso">5. Visita la tienda</div>
        </div>
      </section>

      <section className="impacto">
        <h2>Más que ejercicio, una causa</h2>
        <p>El 70% de los abandonos...</p>

        <button onClick={() => navigate("/registro")}>
          Únete a la manada responsable
        </button>
      </section>

      <footer>
        <div className="footer-contenido">
          <div className="footer-col">
            <img src="../ASSETS/IMAGENES/LogoAnimal.png" alt="Logo" className="footer-logo" />
            <p>Tu guía para mascotas en espacios reducidos.</p>
          </div>

          <div className="footer-col">
            <h4>Navegación</h4>
            <Link to="/">Inicio</Link>
            <Link to="/about">Sobre nosotros</Link>
            <Link to="/store">Tienda</Link>
            <Link to="/biblioteca">Biblioteca</Link>
            <Link to="/tareas">Tareas</Link>
          </div>

          <div className="footer-col">
            <h4>Cuenta</h4>
            <Link to="/usuario">Mi perfil</Link>
            <Link to="/inicio">Iniciar sesión</Link>
          </div>

          <div className="footer-col">
            <h4>Síguenos</h4>
            <div className="redes">
              <a href="#"><i className="bi bi-instagram"></i></a>
              <a href="#"><i className="bi bi-facebook"></i></a>
              <a href="#"><i className="bi bi-tiktok"></i></a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© 2026 PetGym. Todos los derechos reservados.</p>
        </div>
      </footer>
    </>
  );
}

export default Home;