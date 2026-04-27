
import '../CSS/about.css'; 
import { Link, useNavigate } from 'react-router-dom';

function About() {
   
    const navigate = useNavigate(); {/*para el boton*/}

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
                    <Link to="/inicio">INICIAR SESION</Link>
                    <Link to="/registro">REGISTRARSE</Link>
                </nav>
            </header>

            <section className="espacio-header"></section>

            <section className="hero">
                <div className="hero-contenido">
                    <h2>NOSOTROS</h2>
                    <p>Más que un sitio web, una comunidad dedicada al bienestar y felicidad de tus mascotas</p>
                </div>
            </section>

            <section className="problema">
                <h2>EL PROBLEMA</h2>
                <p>Millones de mascotas no reciben la atención necesaria en su vida diaria, el ejercicio y la estimulación que necesitan para una vida plena y saludable y libre de estres.</p>

                <div className="problema-grid">
                    <div className="problema-card">
                        <i className="fas fa-heartbeat"></i>
                        <h3>SALUD</h3>
                        <p>60% de las mascotas sufren de sobrepeso por falta de ejercicio.</p>
                    </div>
                    <div className="problema-card">
                        <i className="fas fa-brain"></i>
                        <h3>ESTIMULACIÓN</h3>
                        <p>La falta de actividad mental causa ansiedad y estrés.</p>
                    </div>
                    <div className="problema-card">
                        <i className="fas fa-clock"></i>
                        <h3>TIEMPO</h3>
                        <p>Los dueños no tienen tiempo para investigar cómo cuidar mejor a sus mascotas.</p>
                    </div>
                </div>
            </section>
            
            <section className="solucion">
                <h2>NUESTRA SOLUCIÓN</h2>
                <p>Creamos un sitio web donde dueños y mascotas encuentran todo lo que necesitan.</p>

                <div className="solucion-grid">
                    <div className="solucion-card">
                        <i className="fas fa-dumbbell"></i>
                        <h3>EJERCICIOS</h3>
                        <p>Rutinas de ejercicio diseñadas por expertos para cada raza y edad</p>
                    </div>
                    <div className="solucion-card">
                        <i className="fas fa-graduation-cap"></i>
                        <h3>EDUCACIÓN</h3>
                        <p>Biblioteca con guías, videos y recursos sobre cuidado animal, subidas por profesionales de la salud</p>
                    </div>
                    <div className="solucion-card">
                        <i className="fas fa-users"></i>
                        <h3>TIENDA</h3>
                        <p>Contamos con una tienda en linea, para comprar los productos que su mascota necesite.</p>
                    </div>
                    <div className="solucion-card">
                        <i className="fas fa-video"></i>
                        <h3>CONTENIDO</h3>
                        <p>Con videos tutoriales y guías paso a paso.</p>
                    </div>
                    <div className="solucion-card">
                        <i className="fas fa-calendar-check"></i>
                        <h3>SEGUIMIENTO</h3>
                        <p>Sistema de tareas para mantener una rutina constante y equilibrada para el dueño y mascota.</p>
                    </div>
                </div>
            </section>
            
            <section className="historia">
                <h2>NUESTRA HISTORIA</h2>
                <div className="historia-contenido">
                    <div className="historia-texto">
                        <p>En las ciudades actuales, cada vez más personas viven en apartamentos o casas con espacios reducidos, sin acceso cercano a parques o áreas verdes donde puedan ejercitar y entrenar adecuadamente a sus mascotas. Esta situación genera frustración tanto en los dueños como en los animales, quienes desarrollan problemas de comportamiento por falta de estimulación física y mental: ansiedad, ladridos excesivos, destructividad, y en muchos casos, esto lleva al abandono de la mascota.</p>
                        <p>PetGym nace como solución a este problema. Ofrecemos una plataforma web donde los dueños de mascotas encontrarán guías de entrenamiento certificadas por profesionales, diseñadas específicamente para adaptarse a espacios reducidos.</p>
                        <p>Además, el sitio incluye rutinas de ejercicio personalizadas según la raza y tamaño del animal, productos especializados para entretenimiento y estimulación mental, y una comunidad de apoyo donde compartir experiencias y progresos.</p>
                    </div>
                    <div className="historia-imagen">
                        <img src="https://images.unsplash.com/photo-1450778869180-41d0601e046e?w=800" alt="Perro y gato" />
                    </div>
                </div>
            </section>

            <section className ="cta-final">
                <h2>SÉ PARTE DEL CAMBIO</h2>
                <p>Únete a la comunidad PetGym y transforma la vida de tu mascota</p>
                
                <button onClick={() => navigate('/registro')}>REGÍSTRATE</button> {/* cambiamos el window.location.href a navigate usando el router */}
            </section>

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

export default About;