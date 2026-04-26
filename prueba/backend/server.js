import express from 'express';
import cors from 'cors';
import multer from 'multer';
import path from 'path';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import Usuario from './models/usuario.js';

const app = express();
app.use(cors());
app.use(express.json());

//Conexion a mongolito
mongoose.connect('mongodb://127.0.0.1:27017/petgym')
    .then(() => console.log('Mongo conectado'))
    .catch(err => console.log(err));

// Configuracion de multer para manejo de archivos
const almacenamiento = multer.diskStorage({
    destination: 'uploads/',
    filename: (reque, file, cp) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9); // Generar un sufijo unico para evitar colisiones de nombres. Sufijo unico es una combinacion de la fecha actual y un numero aleatorio.
        const extension = path.extname(file.originalname); // Obtener la extension del archivo original
        cp(null, file.fieldname + '-' + uniqueSuffix + extension);
    }
});

const descarga = multer({ almacenamiento })

//Registro de usuario
app.post('/registro', descarga.single('foto'), async (req, res) => {
    try {

        const {
            email,
            password,
            nombre,
            apellidos,
            usuario,
            telefono,
            genero,
            fechaCum
        } = req.body;

        // Verificar si el usuario ya existe
        const existeUsuario = await Usuario.findOne({ email });
        if (existeUsuario) {
            return res.status(400).json({ error: 'Usuario ya existente' });
        }

        const Encriptar = await bcrypt.hash(password, 10); // Encriptar contraseña
        const nuevoUsuario = new Usuario({ email, password: Encriptar, nombre, apellidos, usuario, telefono, genero, fechaCum, foto: req.file ? req.file.path : null }); // Crear nuevo usuario con ruta de foto si se subio una
        await nuevoUsuario.save();

        res.json({ message: 'Usuario registrado' });

    } catch (error) {
        res.status(500).json({ error: 'Error 500' });
    }
});

//Inicio de sesion
app.post('/login', async (req, res) => {

    try {

        const { email, password } = req.body; // Obtener email y contraseña del cuerpo de la solicitud
        const usuario = await Usuario.findOne({ email }); //buscar usuario por email

        if (!usuario) { //si usuario no existe
            return res.status(400).json({ error: 'Usuario no encontrado' });
        }

        const esValida = await bcrypt.compare(password, usuario.password); //comparar contraseña
        if (!esValida) { //si contraseña no es valida
            return res.status(400).json({ error: 'Contraseña incorrecta' });
        }

        const token = jwt.sign({ id: usuario._id, email: usuario.email }, 'secreto', { expiresIn: '1h' }); //generar token JWT
        res.json({ token }); //enviar token al cliente

    } catch (error) {
        res.status(500).json({ error: 'Error 500' });
    }
});

//Iniciar el servidor
app.listen(3000, () => {
    console.log('Servidor corriendo en http://localhost:3000');
});