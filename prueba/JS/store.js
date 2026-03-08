// Sistema de carrito mejorado
let carrito = [];
let productos = [];

// Inicializar productos desde las cards
document.querySelectorAll('.card').forEach((card, index) => {
    const img = card.querySelector('.card__img img').src;
    const nombre = card.querySelector('.card__name p').textContent;
    const precioTexto = card.querySelector('.card__preci--now').textContent;
    const precio = parseInt(precioTexto.replace(/[^0-9]/g, ''));
    
    productos.push({
        id: index,
        nombre: nombre,
        precio: precio,
        img: img
    });
    
    // Agregar badge de oferta
    const badge = document.createElement('div');
    badge.className = 'card-oferta';
    badge.textContent = '-24%';
    card.appendChild(badge);
});

// Funciones del carrito
function agregarAlCarrito(productoId) {
    const producto = productos.find(p => p.id === productoId);
    const itemExistente = carrito.find(item => item.id === productoId);
    
    if (itemExistente) {
        itemExistente.cantidad++;
    } else {
        carrito.push({
            ...producto,
            cantidad: 1
        });
    }
    
    actualizarCarrito();
    mostrarNotificacion('✅ Producto agregado al carrito');
}

function eliminarDelCarrito(productoId) {
    carrito = carrito.filter(item => item.id !== productoId);
    actualizarCarrito();
}

function actualizarCarrito() {
    const contador = document.getElementById('carritoContador');
    const itemsContainer = document.getElementById('carritoItems');
    const totalSpan = document.getElementById('carritoTotal');
    
    const totalItems = carrito.reduce((sum, item) => sum + item.cantidad, 0);
    contador.textContent = totalItems;
    
    if (carrito.length === 0) {
        itemsContainer.innerHTML = '<p style="text-align: center; color: #666;">Carrito vacío</p>';
    } else {
        itemsContainer.innerHTML = carrito.map(item => `
            <div class="item-carrito">
                <img src="${item.img}" alt="${item.nombre}">
                <div class="item-carrito-info">
                    <div class="item-carrito-nombre">${item.nombre}</div>
                    <div class="item-carrito-precio">$${item.precio}</div>
                    <div class="item-carrito-cantidad">Cant: ${item.cantidad}</div>
                </div>
                <span class="btn-eliminar-item" onclick="eliminarDelCarrito(${item.id})">✕</span>
            </div>
        `).join('');
    }
    
    const total = carrito.reduce((sum, item) => sum + (item.precio * item.cantidad), 0);
    totalSpan.textContent = `$${total.toLocaleString('es-CL')}`;
}

// Sistema de wishlist (corazones)
document.querySelectorAll('.card__icon ion-icon[name="heart-outline"]').forEach((heart, index) => {
    heart.addEventListener('click', (e) => {
        e.preventDefault();
        const icon = e.target;
        if (icon.getAttribute('name') === 'heart-outline') {
            icon.setAttribute('name', 'heart');
            icon.classList.add('active');
            mostrarNotificacion('❤️ Agregado a favoritos');
        } else {
            icon.setAttribute('name', 'heart-outline');
            icon.classList.remove('active');
        }
    });
});

// Notificaciones
function mostrarNotificacion(mensaje) {
    const notificacion = document.createElement('div');
    notificacion.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #000;
        color: white;
        padding: 1rem 2rem;
        border-radius: 5px;
        z-index: 10000;
        animation: slideIn 0.3s;
    `;
    notificacion.textContent = mensaje;
    document.body.appendChild(notificacion);
    
    setTimeout(() => {
        notificacion.remove();
    }, 2000);
}

// Filtros
const rangoPrecio = document.getElementById('rangoPrecio');
const valorPrecio = document.getElementById('valorPrecio');
const checkboxes = document.querySelectorAll('.filtro-categoria input');
const cards = document.querySelectorAll('.card');

rangoPrecio.addEventListener('input', (e) => {
    valorPrecio.textContent = e.target.value;
    aplicarFiltros();
});

checkboxes.forEach(checkbox => {
    checkbox.addEventListener('change', aplicarFiltros);
});

document.querySelector('.btn-limpiar-filtros').addEventListener('click', () => {
    checkboxes.forEach(cb => cb.checked = false);
    rangoPrecio.value = 1000;
    valorPrecio.textContent = 1000;
    cards.forEach(card => card.style.display = 'flex');
});

function aplicarFiltros() {
    const precioMax = parseInt(rangoPrecio.value);
    const categoriasSeleccionadas = Array.from(checkboxes)
        .filter(cb => cb.checked)
        .map(cb => cb.value);
    
    cards.forEach(card => {
        const precioTexto = card.querySelector('.card__preci--now').textContent;
        const precio = parseInt(precioTexto.replace(/[^0-9]/g, ''));
        
        let mostrar = true;
        
        if (precio > precioMax) mostrar = false;
        
        if (categoriasSeleccionadas.length > 0) {
            // Aquí puedes agregar lógica de categorías si tienes
        }
        
        card.style.display = mostrar ? 'flex' : 'none';
    });
}

// Botón de filtros móvil
document.getElementById('btnFiltrosMovil').addEventListener('click', () => {
    document.querySelector('.filtros-sidebar').classList.toggle('mostrar');
});

// Modificar los botones de comprar
document.querySelectorAll('.carrito-btn').forEach((btn, index) => {
    btn.addEventListener('click', () => {
        agregarAlCarrito(index);
    });
});

// Inicializar
actualizarCarrito();