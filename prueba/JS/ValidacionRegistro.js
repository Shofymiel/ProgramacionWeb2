function validar() {

const nombre = document.getElementById("nombre").value;
const apellidos = document.getElementById("apellidos").value;
const usuario = document.getElementById("usuario").value;
const telefono = document.getElementById("telefono").value;
const correo = document.getElementById("correo").value;
const contra = document.getElementById("contra").value;
const fechaCum = document.getElementById("fechaCum").value;
const error = document.getElementById("error-404");


if(nombre === "") {
    error.textContent = "El nombre es obligatorio";
    return;
}

if(apellidos === "") {
    error.textContent = "El apellido es obligatorio";
    return;
}

if(usuario === "") {
    error.textContent = "El usuario es obligatorio";
    return;
}

if(telefono === "") {
    error.textContent = "El telefono es obligatorio";

    return;
}
if(!/^\d{10}$/.test(telefono)) {
    error.textContent = "El telefono debe tener al menos 10 digitos";
    return;
}

if(correo === "") {
    error.textContent = "El email es obligatorio";
    return;
}

if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo)) {
    error.textContent = "El correo no es valido";
    return;
}

if(contra === "") {
    error.textContent = "La contraseña es obligatorio";
    return;
}

if(contra.length < 8 ) {
    error.textContent = "La contraseña debe tener mas de 8 caracteres.";
    return;
}

if(fechaCum === "") {
    error.textContent = "La fecha de cumpleaños no puede estar vacia!"
}

if(fechaCum < 18) {
    error.textContent = "Debes ser mayor de 18 años para entrar al sitio."
}

error.textContent = "";
window.location.href='inicio.html';
}