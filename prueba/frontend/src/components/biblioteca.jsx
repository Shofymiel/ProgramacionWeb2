import '../CSS/biblioteca.css';
import { Link } from 'react-router-dom';
import { useState } from 'react';

function Libreria() {
  const [modalAbierto, setModalAbierto] = useState(false);

  return (
    <>
      <header>
        <h1>PETGYM</h1>
        <nav>
          <Link to="/">HOME</Link>
          <Link to="/about">NOSOTROS</Link>
          <Link to="/store">TIENDA</Link>
          <Link to="/biblioteca">BIBLIOTECA</Link>
          <Link to="/tareas">TAREAS</Link>
          <Link to="/inicio">INICIAR SESION</Link> <span>/</span> <Link to="/registro">REGISTRARSE</Link>
        </nav>
      </header>

      <section className="espacio-header-biblioteca"></section>

      <main className="main">
        <section className="biblioteca-hero">
          <h2>BIBLIOTECA</h2>
          <p>Explora nuestra colección de recursos educativos para el cuidado y entrenamiento de tu mascota</p>
        </section>

        <div className="biblioteca-header">
          <div className="buscador">
            <input type="text" placeholder="BUSCAR RECURSOS..." />
            <button><i className="fas fa-search"></i></button>
          </div>
          <div className="filtros">
            <button className="filtro-btn activo">TODOS</button>
            <button className="filtro-btn">VIDEOS</button>
            <button className="filtro-btn">DOCUMENTOS</button>
            <button className="filtro-btn">IMÁGENES</button>
          </div>
        </div>

        <div className="biblioteca-grid">

          {/* Video 1 */}
          <div className="tarjeta video-tarjeta">
            <div className="media-preview">
              <img src="https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=500" alt="Video preview" />
              <div className="play-overlay">
                <i className="fas fa-play"></i>
              </div>
              <span className="duracion">12:30</span>
            </div>
            <div className="tarjeta-info">
              <div className="tarjeta-header">
                <span className="categoria-badge">ENTRENAMIENTO</span>
                <span className="tipo-icon"><i className="fas fa-video"></i></span>
              </div>
              <h3>Cómo enseñar a tu perro a sentarse</h3>
              <p>Aprende la técnica básica para enseñarle a tu perro a sentarse en simples pasos.</p>
              <div className="tarjeta-footer">
                <span className="fecha"><i className="far fa-calendar"></i> 15.01.24</span>
                <button className="ver-btn">VER</button>
              </div>
            </div>
          </div>

          {/* Documento 1 */}
          <div className="tarjeta documento-tarjeta">
            <div className="media-preview">
              <i className="fas fa-file-pdf"></i>
            </div>
            <div className="tarjeta-info">
              <div className="tarjeta-header">
                <span className="categoria-badge">GUÍA</span>
                <span className="tipo-icon"><i className="fas fa-file-pdf"></i></span>
              </div>
              <h3>Nutrición para cachorros</h3>
              <p>Guía completa sobre alimentación en los primeros meses de vida.</p>
              <div className="tarjeta-footer">
                <span className="fecha"><i className="far fa-calendar"></i> 10.01.24</span>
                <button className="descargar-btn">PDF</button>
              </div>
            </div>
          </div>

          {/* Imagen 1 */}
          <div className="tarjeta imagen-tarjeta">
            <div className="media-preview">
              <img src="https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=500" alt="Gato persa" />
            </div>
            <div className="tarjeta-info">
              <div className="tarjeta-header">
                <span className="categoria-badge">GALERÍA</span>
                <span className="tipo-icon"><i className="fas fa-image"></i></span>
              </div>
              <h3>Razas: Gato Persa</h3>
              <p>Características y cuidados del gato persa.</p>
              <div className="tarjeta-footer">
                <span className="fecha"><i className="far fa-calendar"></i> 05.01.24</span>
                <button className="ver-btn">VER</button>
              </div>
            </div>
          </div>

          {/* Video 2 */}
          <div className="tarjeta video-tarjeta">
            <div className="media-preview">
              <img src="https://images.unsplash.com/photo-1574158622682-e40e69881006?w=500" alt="Gato jugando" />
              <div className="play-overlay">
                <i className="fas fa-play"></i>
              </div>
              <span className="duracion">08:45</span>
            </div>
            <div className="tarjeta-info">
              <div className="tarjeta-header">
                <span className="categoria-badge">JUEGOS</span>
                <span className="tipo-icon"><i className="fas fa-video"></i></span>
              </div>
              <h3>5 juegos para estimular a tu gato</h3>
              <p>Actividades divertidas para mantener a tu gato activo.</p>
              <div className="tarjeta-footer">
                <span className="fecha"><i className="far fa-calendar"></i> 03.01.24</span>
                <button className="ver-btn">VER</button>
              </div>
            </div>
          </div>

          {/* Documento 2 */}
          <div className="tarjeta documento-tarjeta">
            <div className="media-preview">
              <i className="fas fa-file-word"></i>
            </div>
            <div className="tarjeta-info">
              <div className="tarjeta-header">
                <span className="categoria-badge">SALUD</span>
                <span className="tipo-icon"><i className="fas fa-file-word"></i></span>
              </div>
              <h3>Calendario de vacunación</h3>
              <p>Calendario completo para perros y gatos.</p>
              <div className="tarjeta-footer">
                <span className="fecha"><i className="far fa-calendar"></i> 01.01.24</span>
                <button className="descargar-btn">DOC</button>
              </div>
            </div>
          </div>

          {/* Imagen 2 */}
          <div className="tarjeta imagen-tarjeta">
            <div className="media-preview">
              <img src="https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=500" alt="Perros" />
            </div>
            <div className="tarjeta-info">
              <div className="tarjeta-header">
                <span className="categoria-badge">INFOGRAFÍA</span>
                <span className="tipo-icon"><i className="fas fa-image"></i></span>
              </div>
              <h3>Alimentos prohibidos</h3>
              <p>Infografía con alimentos que no debes darle a tu perro.</p>
              <div className="tarjeta-footer">
                <span className="fecha"><i className="far fa-calendar"></i> 28.12.23</span>
                <button className="ver-btn">VER</button>
              </div>
            </div>
          </div>

        </div>

        {/* BOTÓN FLOTANTE */}
        <button className="subir-flotante" onClick={() => setModalAbierto(true)}>
          <i className="fas fa-plus"></i>
        </button>

        {/* MODAL */}
        {modalAbierto && (
          <div className="modal" style={{ display: 'flex' }}>
            <div className="modal-contenido">
              <div className="modal-header">
                <h3>SUBIR RECURSO</h3>
                <span className="cerrar-modal" onClick={() => setModalAbierto(false)}>×</span>
              </div>

              <div className="form-grupo">
                <label>TÍTULO</label>
                <input type="text" placeholder="Nombre del recurso..." />
              </div>

              <div className="form-grupo">
                <label>CATEGORÍA</label>
                <select>
                  <option>ENTRENAMIENTO</option>
                  <option>SALUD</option>
                  <option>NUTRICIÓN</option>
                  <option>JUEGOS</option>
                  <option>RAZAS</option>
                </select>
              </div>

              <div className="form-grupo">
                <label>DESCRIPCIÓN</label>
                <textarea rows="3" placeholder="Descripción breve..."></textarea>
              </div>

              <div className="form-grupo">
                <label>ARCHIVO</label>
                <div className="subir-zona">
                  <i className="fas fa-cloud-upload-alt"></i>
                  <p>Arrastra tu archivo aquí o haz clic para seleccionar</p>
                </div>
              </div>

              <button className="btn-subir">SUBIR RECURSO</button>
            </div>
          </div>
        )}

        <footer>
          <div className="footer-contenido">
            <div className="footer-col">
                <img src="LogoAnimal.png" alt="Logo" className="footer-logo" />
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
              <Link to="/perfil">Mi perfil</Link>
              <Link to="/inicio">Iniciar sesión</Link>
            </div>
            <div className="footer-col">
              <h4>Síguenos</h4>
              <div className="redes">
                {/* Cambié bi por fab fa para que use FontAwesome que sí tienes */}
                <a href="#"><i className="fab fa-instagram"></i></a>
                <a href="#"><i className="fab fa-facebook-f"></i></a>
                <a href="#"><i className="fab fa-tiktok"></i></a>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <p>© 2026 PetGym. Todos los derechos reservados.</p>
          </div>
        </footer>

      </main>
    </>
  );
}

export default Libreria;