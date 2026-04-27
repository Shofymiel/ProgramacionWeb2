import { useState, useEffect } from 'react';
import '../CSS/tareas.css';

import { Link } from 'react-router-dom';

function Tareas() {
  const diasSemana = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];
  
  // Estados para el calendario
  const [fecha, setFecha] = useState(new Date());
  const [diaSeleccionado, setDiaSeleccionado] = useState(null);
  const [diasCalendario, setDiasCalendario] = useState([]);
  
  // Estados para las tareas
  const [tareas, setTareas] = useState([]);
  const [nuevaTarea, setNuevaTarea] = useState('');
  const [premios, setPremios] = useState(0);
  
  // Estado para el texto de la fecha seleccionada
  const [fechaSeleccionadaTexto, setFechaSeleccionadaTexto] = useState('Selecciona un día');

  // Cargar premios al iniciar
  useEffect(() => {
    const premiosGuardados = parseInt(localStorage.getItem("premios")) || 0;
    setPremios(premiosGuardados);
  }, []);

  // Función para generar el calendario
  const generarCalendario = () => {
    const año = fecha.getFullYear();
    const mes = fecha.getMonth();
    
    const primerDia = new Date(año, mes, 1).getDay();
    const totalDias = new Date(año, mes + 1, 0).getDate();
    
    const dias = [];
    
    // Agregar espacios vacíos
    for (let i = 0; i < primerDia; i++) {
      dias.push({ tipo: 'vacio', id: `vacio-${i}` });
    }
    
    // Agregar días del mes
    for (let d = 1; d <= totalDias; d++) {
      dias.push({ 
        tipo: 'dia', 
        numero: d, 
        id: `dia-${d}`,
        fechaCompleta: `${año}-${mes + 1}-${d}`
      });
    }
    
    setDiasCalendario(dias);
  };

  // Efecto para regenerar el calendario cuando cambia el mes
  useEffect(() => {
    generarCalendario();
  }, [fecha]);

  // Función para cambiar de mes
  const cambiarMes = (valor) => {
    const nuevaFecha = new Date(fecha);
    nuevaFecha.setMonth(fecha.getMonth() + valor);
    setFecha(nuevaFecha);
  };

  // Función para seleccionar un día
  const seleccionarDia = (d, mes, año) => {
    const fechaSeleccionada = `${año}-${mes + 1}-${d}`;
    setDiaSeleccionado(fechaSeleccionada);
    setFechaSeleccionadaTexto(`Tareas del ${d}/${mes + 1}/${año}`);
    cargarTareas(fechaSeleccionada);
  };

  // Función para cargar tareas del día seleccionado
  const cargarTareas = (fechaKey) => {
    const tareasGuardadas = JSON.parse(localStorage.getItem(fechaKey)) || [];
    setTareas(tareasGuardadas);
  };

  // Función para agregar una nueva tarea
  const agregarTarea = () => {
    if (!diaSeleccionado || nuevaTarea.trim() === "") return;
    
    const tareasActuales = JSON.parse(localStorage.getItem(diaSeleccionado)) || [];
    tareasActuales.push({ texto: nuevaTarea, done: false });
    
    localStorage.setItem(diaSeleccionado, JSON.stringify(tareasActuales));
    setNuevaTarea('');
    cargarTareas(diaSeleccionado);
  };

  // Función para marcar tarea como completada
  const completarTarea = (index) => {
    const tareasActuales = JSON.parse(localStorage.getItem(diaSeleccionado));
    tareasActuales[index].done = true;
    
    localStorage.setItem(diaSeleccionado, JSON.stringify(tareasActuales));
    
    // Incrementar premios
    const nuevosPremios = premios + 1;
    localStorage.setItem("premios", nuevosPremios);
    setPremios(nuevosPremios);
    
    cargarTareas(diaSeleccionado);
  };

  // Obtener el nombre del mes actual
  const mesActual = fecha.toLocaleString("default", { month: "long" }) + " " + fecha.getFullYear();

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

      <section className="tareas-main">
        <h2>Rutinas de ejercicio</h2>

        <div className="contenedor-tareas">
          {/* CALENDARIO */}
          <div className="calendario">
            <div className="cal-header">
              <button onClick={() => cambiarMes(-1)}>‹</button>
              <h3>{mesActual}</h3>
              <button onClick={() => cambiarMes(1)}>›</button>
            </div>

            <div className="dias-semana">
              {diasSemana.map((dia, index) => (
                <div key={index}>{dia}</div>
              ))}
            </div>

            <div className="grid-calendario">
              {diasCalendario.map((dia) => (
                dia.tipo === 'vacio' ? (
                  <div key={dia.id} className="dia-vacio"></div>
                ) : (
                  <div 
                    key={dia.id} 
                    className="dia"
                    onClick={() => seleccionarDia(dia.numero, fecha.getMonth(), fecha.getFullYear())}
                  >
                    {dia.numero}
                  </div>
                )
              ))}
            </div>
          </div>

          {/* PANEL TAREAS */}
          <div className="panel-tareas">
            <h3>{fechaSeleccionadaTexto}</h3>
            
            <ul className="lista-tareas">
              {tareas.map((tarea, index) => (
                <li key={index}>
                  <input 
                    type="checkbox" 
                    checked={tarea.done}
                    onChange={() => !tarea.done && completarTarea(index)}
                  />
                  <span className={tarea.done ? 'completada' : ''}>
                    {tarea.texto}
                  </span>
                </li>
              ))}
            </ul>

            <div className="crear-tarea">
              <input 
                type="text" 
                placeholder="Ej: juego de búsqueda 10 minutos"
                value={nuevaTarea}
                onChange={(e) => setNuevaTarea(e.target.value)} 
                onKeyPress={(e) => e.key === 'Enter' && agregarTarea()}
              />
              <button onClick={agregarTarea}>Agregar rutina</button>
            </div>

            <div className="premios">
              <h4>Premios obtenidos</h4>
              <p>{premios} descuentos disponibles</p>
            </div>
          </div>
        </div>
      </section>

      <footer>
        <div className="footer-contenido">
          <div className="footer-col">
            <img src="LogoAnimal.png" alt="Logo" className="footer-logo" />
            <p>Tu guía para mascotas en espacios reducidos.</p>
          </div>

          <div className="footer-col">
            <h4>Navegación</h4>
            <a href="/">Inicio</a>
            <a href="/about">Sobre nosotros</a>
            <a href="/store">Tienda</a>
            <a href="/biblioteca">Biblioteca</a>
            <a href="/tareas">Tareas</a>
          </div>

          <div className="footer-col">
            <h4>Cuenta</h4>
            <a href="/perfil">Mi perfil</a>
            <a href="/inicio">Iniciar sesión</a>
          </div>

          <div className="footer-col">
            <h4>Síguenos</h4>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© 2026 PetGym. Todos los derechos reservados.</p>
        </div>
      </footer>
    </>
  );
}

export default Tareas;