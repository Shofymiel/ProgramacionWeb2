import '../CSS/perfil.css';
import { Link, useNavigate } from 'react-router-dom';

function Perfil() {
  const navigate = useNavigate();

 return (
  <>
    <header>
      <h1>PETGYM</h1>
      <nav className="nav-principal">
        <Link to="/">HOME</Link>
        <Link to="/about">NOSOTROS</Link>
        <Link to="/store">TIENDA</Link>
        <Link to="/biblioteca">BIBLIOTECA</Link>
        <Link to="/tareas">TAREAS</Link>
        <Link to="/inicio">INICIAR SESIÓN</Link> 
        <span className="nav-separator">/</span>
        <Link to="/registro">REGISTRARSE</Link>
      </nav>
    </header>

    <section className="espacio-header"></section>

    <div className="perfil-page">
      <div className="perfil-card">

        {/* Banner */}
        <div className="perfil-banner">
          <span className="banner-label">PETGYM MEMBER</span>
        </div>

        {/* Foto + Nombre */}
        <div className="perfil-header">
          <img
            src="https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y"
            alt="Foto de perfil"
            className="perfil-foto"
          />
          <div className="perfil-info">
            <h2 className="perfil-nombre">Juan Pérez</h2>
            <span className="perfil-badge">Miembro Pro</span>
          </div>
        </div>

        {/* Contenido */}
        <div className="perfil-body">

          {/* Información Personal - Ahora en horizontal */}
          <div className="info-section">
            <h3 className="seccion-titulo">Información Personal</h3>
            <div className="info-grid">
              <div className="info-item">
                <div className="info-label">Correo electrónico</div>
                <div className="info-valor">juan.perez@example.com</div>
              </div>
              <div className="info-item">
                <div className="info-label">Teléfono</div>
                <div className="info-valor">+52 123-456-7890</div>
              </div>
              <div className="info-item">
                <div className="info-label">Ciudad</div>
                <div className="info-valor">Ciudad de México</div>
              </div>
              <div className="info-item">
                <div className="info-label">Miembro desde</div>
                <div className="info-valor">Enero 2025</div>
              </div>
            </div>
          </div>

          <div className="divider"></div>

          {/* Actividad */}
          <h3 className="seccion-titulo">Actividad Reciente</h3>
          <div className="stats-grid">
            <div className="stat-box">
              <div className="stat-num">24</div>
              <div className="stat-label">Tareas completadas</div>
            </div>
            <div className="stat-box">
              <div className="stat-num">7</div>
              <div className="stat-label">Racha actual</div>
            </div>
            <div className="stat-box">
              <div className="stat-num">12</div>
              <div className="stat-label">Recursos vistos</div>
            </div>
          </div>

          <div className="divider"></div>

          {/* Mis Mascotas */}
          <h3 className="seccion-titulo">Mis Mascotas</h3>
          <div className="mascotas-grid">
            <div className="mascota-chip">
              <div className="mascota-info">
                <span className="mascota-nombre">Rocky</span>
                <span className="mascota-detalle">Pastor Alemán · 3 años</span>
              </div>
            </div>
            <div className="mascota-chip">
              <div className="mascota-info">
                <span className="mascota-nombre">Luna</span>
                <span className="mascota-detalle">Gato Persa · 2 años</span>
              </div>
            </div>
            <div className="mascota-chip agregar">
              <div className="mascota-info">
                <span className="mascota-nombre">Agregar mascota</span>
                <span className="mascota-detalle">Nueva mascota</span>
              </div>
            </div>
          </div>

          <div className="divider"></div>

          {/* Acciones */}
          <div className="perfil-acciones">
            <button className="btn btn-primary">Editar Perfil</button>
            <button className="btn btn-secondary">Cambiar Contraseña</button>
            <button className="btn btn-danger" onClick={() => navigate('/inicio')}>
              Cerrar Sesión
            </button>
          </div>

        </div>
      </div>
    </div>

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

export default Perfil;