import { useState } from 'react';
import { Link } from 'react-router-dom';
import '../CSS/registro.css';

const RegistroForm = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    apellidos: '',
    usuario: '',
    telefono: '',
    genero: 'Masculino',
    correo: '',
    contra: '',
    fechaCum: '',
    foto: null
  });

  const [errors, setErrors] = useState({
    nombre: '',
    apellidos: '',
    usuario: '',
    telefono: '',
    correo: '',
    contra: '',
    fechaCum: ''
  });

  const [previewUrl, setPreviewUrl] = useState('https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y');
  const [fileName, setFileName] = useState('Ningún archivo seleccionado');

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
    // Limpiar error del campo cuando el usuario empieza a escribir
    if (errors[id]) {
      setErrors(prev => ({
        ...prev,
        [id]: ''
      }));
    }
  };

  const handleFotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        foto: file
      }));
      setFileName(file.name);

      // Crear preview de la imagen
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setFileName('Ningún archivo seleccionado');
      setPreviewUrl('https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y');
    }
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = {};

    // Validar nombre
    if (!formData.nombre.trim()) {
      newErrors.nombre = 'El nombre es requerido';
      isValid = false;
    } else if (formData.nombre.trim().length < 2) {
      newErrors.nombre = 'El nombre debe tener al menos 2 caracteres';
      isValid = false;
    }

    // Validar apellidos
    if (!formData.apellidos.trim()) {
      newErrors.apellidos = 'Los apellidos son requeridos';
      isValid = false;
    } else if (formData.apellidos.trim().length < 2) {
      newErrors.apellidos = 'Los apellidos deben tener al menos 2 caracteres';
      isValid = false;
    }

    // Validar nombre de usuario
    if (!formData.usuario.trim()) {
      newErrors.usuario = 'El nombre de usuario es requerido';
      isValid = false;
    } else if (formData.usuario.trim().length < 3) {
      newErrors.usuario = 'El nombre de usuario debe tener al menos 3 caracteres';
      isValid = false;
    }

    // Validar teléfono
    const telefonoRegex = /^[0-9]{10}$/;
    if (!formData.telefono.trim()) {
      newErrors.telefono = 'El teléfono es requerido';
      isValid = false;
    } else if (!telefonoRegex.test(formData.telefono)) {
      newErrors.telefono = 'Ingrese un número de teléfono válido (10 dígitos)';
      isValid = false;
    }

    // Validar correo
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.correo.trim()) {
      newErrors.correo = 'El correo electrónico es requerido';
      isValid = false;
    } else if (!emailRegex.test(formData.correo)) {
      newErrors.correo = 'Ingrese un correo electrónico válido';
      isValid = false;
    }

    // Validar contraseña
    if (!formData.contra) {
      newErrors.contra = 'La contraseña es requerida';
      isValid = false;
    } else if (formData.contra.length < 6) {
      newErrors.contra = 'La contraseña debe tener al menos 6 caracteres';
      isValid = false;
    }

    // Validar fecha de nacimiento
    if (!formData.fechaCum) {
      newErrors.fechaCum = 'La fecha de nacimiento es requerida';
      isValid = false;
    } else {
      const birthDate = new Date(formData.fechaCum);
      const today = new Date();
      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      if (age < 18) {
        newErrors.fechaCum = 'Debes ser mayor de 18 años';
        isValid = false;
      }
    }

    setErrors(newErrors);
    return isValid;
  };
  //AQUI HUBO CAMBIO
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      try {

        const formDataToSend = new FormData(); // Crear un objeto FormData para enviar datos multipart/form-data

        formDataToSend.append('nombre', formData.nombre);
        formDataToSend.append('apellidos', formData.apellidos);
        formDataToSend.append('usuario', formData.usuario);
        formDataToSend.append('telefono', formData.telefono);
        formDataToSend.append('genero', formData.genero);
        formDataToSend.append('fechaCum', formData.fechaCum);
        formDataToSend.append('email', formData.correo);
        formDataToSend.append('password', formData.contra);



        if (formData.foto) { //verificar si se selecciona una foto
          formDataToSend.append('foto', formData.foto);
        }

        const res = await fetch('http://localhost:3000/registro', {
          method: 'POST',
          //headers: { 'Content-Type': 'application/json' } // rompe el envio de imagenes
          body: formDataToSend
        }

        );

        const data = await res.json();

        if (res.ok) {
          alert('Usuario registrado :)');
          window.location.href = '/inicio'; //ruta en react
        } else {
          alert(data.error || 'Error en registro');
        }


      } catch (error) {
        console.error(error);
        alert('Error de conexion con el servidor');
      }




    }
  };

  return (
    <form id="registroForm" onSubmit={handleSubmit}>

      <h2>Registro de sesión</h2>

      <div className="foto-perfil-container">
        <img
          src={previewUrl}
          alt="Vista previa"
          className="foto-preview"
          id="preview"
        />
        
        <input
          type="file"
          accept=".png,.jpg,.jpeg"
          id="foto"
          required
          onChange={handleFotoChange}
        />
        <span className="file-name" id="file-name">{fileName}</span>
      </div>



      <label htmlFor="nombre">Nombre</label>
      <input
        type="text"
        id="nombre"
        placeholder="Nombre"
        value={formData.nombre}
        onChange={handleInputChange}
      />
      {errors.nombre && <span style={{ color: 'red', fontSize: '12px' }}>{errors.nombre}</span>}

      <label htmlFor="apellidos">Apellidos</label>
      <input
        type="text"
        id="apellidos"
        placeholder="Apellidos"
        value={formData.apellidos}
        onChange={handleInputChange}
      />
      {errors.apellidos && <span style={{ color: 'red', fontSize: '12px' }}>{errors.apellidos}</span>}

      <label htmlFor="usuario">Nombre de usuario</label>
      <input
        type="text"
        id="usuario"
        placeholder="Nombre de usuario"
        value={formData.usuario}
        onChange={handleInputChange}
      />
      {errors.usuario && <span style={{ color: 'red', fontSize: '12px' }}>{errors.usuario}</span>}

      <label htmlFor="telefono">Teléfono</label>
      <input
        type="tel"
        id="telefono"
        placeholder="Teléfono"
        value={formData.telefono}
        onChange={handleInputChange}
      />
      {errors.telefono && <span style={{ color: 'red', fontSize: '12px' }}>{errors.telefono}</span>}

      <label htmlFor="genero">Seleccione su género</label>
      <select
        id="genero"
        value={formData.genero}
        onChange={handleInputChange}
      >
        <option value="Masculino">Masculino</option>
        <option value="Femenino">Femenino</option>
        <option value="Anonimo">Prefiero no decir</option>
      </select>

      <label htmlFor="correo">Correo electrónico</label>
      <input
        type="email"
        id="correo"
        placeholder="Correo electrónico"
        value={formData.correo}
        onChange={handleInputChange}
      />
      {errors.correo && <span style={{ color: 'red', fontSize: '12px' }}>{errors.correo}</span>}

      <label htmlFor="contra">Contraseña</label>
      <input
        type="password"
        id="contra"
        placeholder="Contraseña"
        value={formData.contra}
        onChange={handleInputChange}
      />
      {errors.contra && <span style={{ color: 'red', fontSize: '12px' }}>{errors.contra}</span>}

      <label htmlFor="fechaCum">Fecha de nacimiento</label>
      <input
        type="date"
        id="fechaCum"
        value={formData.fechaCum}
        onChange={handleInputChange}
      />
      {errors.fechaCum && <span style={{ color: 'red', fontSize: '12px' }}>{errors.fechaCum}</span>}

      <button type="submit">Registrarse</button>
      <p>
        ¿Ya tienes cuenta? <Link to="/inicio"> Iniciar sesion </Link>
      </p>
    </form>
  );
};

export default RegistroForm;