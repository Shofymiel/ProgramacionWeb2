import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../CSS/store.css';



function Store() {
  // Datos de productos
  const productosIniciales = [
    {
      id: 0,
      nombre: "ALIMENTO ADULTO",
      precioOriginal: 350.99,
      precioActual: 279.99,
      imagen: "comidaPerroAdulto.png",
      categoria: "alimento",
      descuento: 20
    },
    {
      id: 1,
      nombre: "RASCADOR PARA GATOS",
      precioOriginal: null,
      precioActual: 104.90,
      imagen: "rascador.png",
      categoria: "juguete",
      descuento: 0
    },
    {
      id: 2,
      nombre: "CAMA ACOLCHADA",
      precioOriginal: 645.90,
      precioActual: 599.99,
      imagen: "camaAlcochada.png",
      categoria: "accesorio",
      descuento: 7
    },
    {
      id: 3,
      nombre: "COLLAR AJUSTABLE",
      precioOriginal: 150.45,
      precioActual: 120.85,
      imagen: "collarAjustable.png",
      categoria: "accesorio",
      descuento: 20
    },
    {
      id: 4,
      nombre: "COMIDA PAJARO",
      precioOriginal: 8.990,
      precioActual: 6.990,
      imagen: "comidaPajaro.png",
      categoria: "alimento",
      descuento: 22
    },
    {
      id: 5,
      nombre: "BEBEDERO AUTOMÁTICO",
      precioOriginal: 42.990,
      precioActual: 36.990,
      imagen: "BebederoAutomatico.png",
      categoria: "accesorio",
      descuento: 14
    },
    {
      id: 6,
      nombre: "PELOTA ANTIESTRES",
      precioOriginal: null,
      precioActual: 50.12,
      imagen: "PelotaAntiEstres.jpg",
      categoria: "juguete",
      descuento: 0
    },
    {
      id: 7,
      nombre: "ARENA GATOS",
      precioOriginal: 18.990,
      precioActual: 14.990,
      imagen: "ArenaGatos.png",
      categoria: "accesorio",
      descuento: 21
    },
    {
      id: 8,
      nombre: "CEPILLO DENTAL",
      precioOriginal: 12.990,
      precioActual: 9.990,
      imagen: "kit-dental.png",
      categoria: "accesorio",
      descuento: 23
    },
    {
      id: 9,
      nombre: "TRANSPORTADORA",
      precioOriginal: 55.990,
      precioActual: 47.990,
      imagen: "TRANSPORTADORA-CHICA.png",
      categoria: "accesorio",
      descuento: 14
    },
    {
      id: 10,
      nombre: "COMEDERO DOBLE",
      precioOriginal: 16.990,
      precioActual: 13.990,
      imagen: "ComederoDOble.png",
      categoria: "accesorio",
      descuento: 18
    },
    {
      id: 11,
      nombre: "PELOTA INTERACTIVA",
      precioOriginal: 28.990,
      precioActual: 23.990,
      imagen: "PelotaRoja.jpg",
      categoria: "juguete",
      descuento: 17
    },
    {
      id: 12,
      nombre: "ANTIPULGAS",
      precioOriginal: 28.990,
      precioActual: 23.990,
      imagen: "AntipulgasGatos.png",
      categoria: "farmacia",
      descuento: 17
    },
    
    {
      id: 13,
      nombre: "PARQUE PAJAROS",
      precioOriginal: 28.990,
      precioActual: 23.990,
      imagen: "ParqueJuegosPajaros.jpg",
      categoria: "juguete",
      descuento: 17
    }
  ];

  // Estados
  const [productos, setProductos] = useState(productosIniciales);
  const [carrito, setCarrito] = useState([]);
  const [favoritos, setFavoritos] = useState([]);
  const [modalCompraAbierto, setModalCompraAbierto] = useState(false);
  const [modalCarritoAbierto, setModalCarritoAbierto] = useState(false);
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);
  const [cantidadCompra, setCantidadCompra] = useState(1);
  const [compraExitosa, setCompraExitosa] = useState(false);
  const [notificacion, setNotificacion] = useState({ mostrar: false, mensaje: '' });
  const [filtroPrecio, setFiltroPrecio] = useState(1000);
  const [filtrosCategoria, setFiltrosCategoria] = useState([]);
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    direccion: '',
    telefono: '',
    metodoPago: ''
  });

  // Mostrar notificación
  const mostrarNotificacion = (mensaje) => {
    setNotificacion({ mostrar: true, mensaje });
    setTimeout(() => {
      setNotificacion({ mostrar: false, mensaje: '' });
    }, 2000);
  };

  // Agregar al carrito
  const agregarAlCarrito = (productoId) => {
    const producto = productos.find(p => p.id === productoId);
    const itemExistente = carrito.find(item => item.id === productoId);

    if (itemExistente) {
      setCarrito(carrito.map(item =>
        item.id === productoId
          ? { ...item, cantidad: item.cantidad + 1 }
          : item
      ));
    } else {
      setCarrito([...carrito, { ...producto, cantidad: 1 }]);
    }

    mostrarNotificacion('✅ Producto agregado al carrito');
  };

  // Eliminar del carrito
  const eliminarDelCarrito = (productoId) => {
    setCarrito(carrito.filter(item => item.id !== productoId));
  };

  // Actualizar cantidad en carrito
  const actualizarCantidadCarrito = (productoId, nuevaCantidad) => {
    if (nuevaCantidad <= 0) {
      eliminarDelCarrito(productoId);
    } else {
      setCarrito(carrito.map(item =>
        item.id === productoId
          ? { ...item, cantidad: nuevaCantidad }
          : item
      ));
    }
  };

  // Toggle favorito
  const toggleFavorito = (productoId) => {
    if (favoritos.includes(productoId)) {
      setFavoritos(favoritos.filter(id => id !== productoId));
    } else {
      setFavoritos([...favoritos, productoId]);
      mostrarNotificacion('❤️ Agregado a favoritos');
    }
  };

  // Abrir modal de compra
  const abrirModalCompra = (producto) => {
    setProductoSeleccionado(producto);
    setCantidadCompra(1);
    setCompraExitosa(false);
    setModalCompraAbierto(true);
    document.body.style.overflow = 'hidden';
  };

  // Cerrar modal
  const cerrarModal = () => {
    setModalCompraAbierto(false);
    setModalCarritoAbierto(false);
    setCompraExitosa(false);
    setFormData({
      nombre: '',
      email: '',
      direccion: '',
      telefono: '',
      metodoPago: ''
    });
    document.body.style.overflow = 'auto';
  };

  // Calcular totales
  const calcularSubtotal = () => {
    if (!productoSeleccionado) return 0;
    return productoSeleccionado.precioActual * cantidadCompra;
  };

  const calcularTotal = () => {
    const envio = 3.990;
    return calcularSubtotal() + envio;
  };

  // Calcular total carrito
  const calcularTotalCarrito = () => {
    return carrito.reduce((total, item) => total + (item.precioActual * item.cantidad), 0);
  };

  const calcularTotalItems = () => {
    return carrito.reduce((total, item) => total + item.cantidad, 0);
  };

  // Manejar submit del formulario
  const handleSubmitCompra = (e) => {
    e.preventDefault();
    setCompraExitosa(true);
  };

  // Manejar cambio en formulario
  const handleFormChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Aplicar filtros
  const productosFiltrados = productos.filter(producto => {
    const cumplePrecio = producto.precioActual <= filtroPrecio;
    const cumpleCategoria = filtrosCategoria.length === 0 ||
      filtrosCategoria.includes(producto.categoria);
    return cumplePrecio && cumpleCategoria;
  });

  // Limpiar filtros
  const limpiarFiltros = () => {
    setFiltroPrecio(1000);
    setFiltrosCategoria([]);
  };

  // Categorías únicas para filtros
  const categorias = [...new Set(productos.map(p => p.categoria))];

  // Formatear precio
  const formatearPrecio = (precio) => {
    return `$${precio.toFixed(3).replace('.', ',')}`;
  };

  return (
    <>
      {/* Notificación */}
      {notificacion.mostrar && (
        <div className="notificacion-flotante">
          {notificacion.mensaje}
        </div>
      )}

      <header>
        <div className="header-main">
          <h1>PETGYM</h1>
          <nav className="nav-principal">
            <Link to="/">HOME</Link>
            <Link to="/about">NOSOTROS</Link>
            <Link to="/store">TIENDA</Link>
            <Link to="/biblioteca">BIBLIOTECA</Link>
            <Link to="/tareas">TAREAS</Link>
            <Link to="/inicio">INICIAR SESION</Link>
            <Link to="/registro">REGISTRARSE</Link>
          </nav>
        </div>
      </header>

<section className="espacio-header"></section>

        <div className="header-categorias">
          <nav className="nav-categorias">
            <a href="#">Mascota <span>▼</span></a>
            <a href="#">Marcas <span>▼</span></a>
            <a href="#" className="destacado">Promociones <span>▲</span></a>
            <a href="#">Farmacia <span>▲</span></a>
            <a href="#">Outlet <span>▼</span></a>
            <a href="#" className="favoritos">Favoritos ★</a>
            <a href="#">Servicios <span>▼</span></a>
            <button onClick={() => setModalCarritoAbierto(true)}>
              Carrito de compras 🛒 ({calcularTotalItems()})
            </button>
          </nav>

          

        </div>

      {/* Filtros */}
      <div className="filtros-container-dos">
        <div className="filtro-precio-dos">
          <label>Precio máximo: {formatearPrecio(filtroPrecio)}</label>
          <input
            type="range"
            min="0"
            max="1000"
            value={filtroPrecio}
            onChange={(e) => setFiltroPrecio(Number(e.target.value))}
          />
        </div>

        <div className="filtro-categorias-dos">
          {categorias.map(categoria => (
            <label key={categoria}>
              <input
                type="checkbox"
                value={categoria}
                checked={filtrosCategoria.includes(categoria)}
                onChange={(e) => {
                  if (e.target.checked) {
                    setFiltrosCategoria([...filtrosCategoria, categoria]);
                  } else {
                    setFiltrosCategoria(filtrosCategoria.filter(c => c !== categoria));
                  }
                }}
              />
              {categoria.charAt(0).toUpperCase() + categoria.slice(1)}
            </label>
          ))}
        </div>

        <button onClick={limpiarFiltros} className="btn-limpiar-filtros-dos">
          Limpiar filtros
        </button>
      </div>

      <main className="main bd-grid">
        {productosFiltrados.map((producto) => (
          <article key={producto.id} className="card">
            {producto.descuento > 0 && (
              <div className="card-oferta">-{producto.descuento}%</div>
            )}
            <div className="card__img">
              <img src={producto.imagen} alt={producto.nombre} />
            </div>
            <div className="card__name">
              <p>{producto.nombre}</p>
            </div>
            <div className="card__precis">
              <button
                className={`card__icon ${favoritos.includes(producto.id) ? 'active' : ''}`}
                onClick={() => toggleFavorito(producto.id)}
              >
                <ion-icon name={favoritos.includes(producto.id) ? "heart" : "heart-outline"}></ion-icon>
              </button>
              <div>
                {producto.precioOriginal && (
                  <span className="card__preci card__preci--before">
                    {formatearPrecio(producto.precioOriginal)}
                  </span>
                )}
                <span className="card__preci card__preci--now">
                  {formatearPrecio(producto.precioActual)}
                </span>
              </div>
              <button
                className="card__icon"
                onClick={() => agregarAlCarrito(producto.id)}
              >
                <ion-icon name="cart-outline"></ion-icon>
              </button>
              <button
                className="carrito-btn"
                onClick={() => abrirModalCompra(producto)}
              >
                Comprar
              </button>
            </div>
          </article>
        ))}
      </main>

      {/* Modal de Compra */}
      {modalCompraAbierto && (
        <div className="modal" onClick={cerrarModal}>
          <div className="modal-contenido" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>🛒 Finalizar compra</h2>
              <span className="modal-cerrar" onClick={cerrarModal}>&times;</span>
            </div>
            <div className="modal-body">
              {!compraExitosa ? (
                <>
                  {productoSeleccionado && (
                    <div className="producto-resumen">
                      <img src={productoSeleccionado.imagen} alt={productoSeleccionado.nombre} />
                      <div className="producto-info">
                        <h3>{productoSeleccionado.nombre}</h3>
                        <p className="producto-precio">{formatearPrecio(productoSeleccionado.precioActual)}</p>
                        <div className="producto-cantidad">
                          <label>Cantidad:</label>
                          <input
                            type="number"
                            value={cantidadCompra}
                            min="1"
                            max="10"
                            onChange={(e) => setCantidadCompra(parseInt(e.target.value) || 1)}
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="resumen-total">
                    <div className="total-linea">
                      <span>Subtotal:</span>
                      <span>{formatearPrecio(calcularSubtotal())}</span>
                    </div>
                    <div className="total-linea">
                      <span>Envío:</span>
                      <span>$3.990</span>
                    </div>
                    <div className="total-linea total-final">
                      <span>Total:</span>
                      <span>{formatearPrecio(calcularTotal())}</span>
                    </div>
                  </div>

                  <form onSubmit={handleSubmitCompra} className="form-compra">
                    <h4>Datos de envío</h4>
                    <input
                      type="text"
                      name="nombre"
                      placeholder="Nombre completo"
                      value={formData.nombre}
                      onChange={handleFormChange}
                      required
                    />
                    <input
                      type="email"
                      name="email"
                      placeholder="Email"
                      value={formData.email}
                      onChange={handleFormChange}
                      required
                    />
                    <input
                      type="text"
                      name="direccion"
                      placeholder="Dirección"
                      value={formData.direccion}
                      onChange={handleFormChange}
                      required
                    />
                    <input
                      type="text"
                      name="telefono"
                      placeholder="Teléfono"
                      value={formData.telefono}
                      onChange={handleFormChange}
                      required
                    />

                    <h4>Método de pago</h4>
                    <select
                      name="metodoPago"
                      value={formData.metodoPago}
                      onChange={handleFormChange}
                      required
                    >
                      <option value="">Selecciona...</option>
                      <option value="tc">Tarjeta de crédito</option>
                      <option value="td">Tarjeta débito</option>
                      <option value="transferencia">Transferencia</option>
                    </select>

                    <button type="submit" className="btn-comprar">Confirmar compra</button>
                  </form>
                </>
              ) : (
                <div className="compra-exitosa">
                  <h2>✅ ¡Compra exitosa!</h2>
                  <h3>Gracias por confiar en PetGym</h3>
                  <p>Recibirás un correo con los detalles de tu compra.</p>
                  <button onClick={cerrarModal} className="btn-comprar" style={{ marginTop: '2rem' }}>
                    Cerrar
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Modal Carrito */}
      {modalCarritoAbierto && (
        <div className="modal" onClick={cerrarModal}>
          <div className="modal-contenido" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Tus compras</h2>
              <span className="modal-cerrar" onClick={cerrarModal}>&times;</span>
            </div>
            <div className="modal-body">
              {carrito.length === 0 ? (
                <p style={{ textAlign: 'center', color: '#666' }}>Carrito vacío</p>
              ) : (
                <>
                  {carrito.map((item) => (
                    <div key={item.id} className="item-carrito">
                      <img src={item.imagen} alt={item.nombre} />
                      <div className="item-carrito-info">
                        <div className="item-carrito-nombre">{item.nombre}</div>
                        <div className="item-carrito-precio">{formatearPrecio(item.precioActual)}</div>
                        <div className="item-carrito-cantidad">
                          Cant:
                          <input
                            type="number"
                            min="1"
                            value={item.cantidad}
                            onChange={(e) => actualizarCantidadCarrito(item.id, parseInt(e.target.value) || 1)}
                            style={{ width: '50px', marginLeft: '10px' }}
                          />
                        </div>
                      </div>
                      <span
                        className="btn-eliminar-item"
                        onClick={() => eliminarDelCarrito(item.id)}
                      >
                        ✕
                      </span>
                    </div>
                  ))}
                  <div className="carrito-total">
                    <strong>Total: {formatearPrecio(calcularTotalCarrito())}</strong>
                  </div>
                  <button
                    className="btn-comprar"
                    onClick={() => {
                      setModalCarritoAbierto(false);
                      if (carrito.length > 0) {
                        setProductoSeleccionado(carrito[0]);
                        setCantidadCompra(carrito[0].cantidad);
                        setModalCompraAbierto(true);
                      }
                    }}
                  >
                    Proceder al pago
                  </button>
                </>
              )}
            </div>
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

export default Store;