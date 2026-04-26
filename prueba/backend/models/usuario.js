import mongoose from 'mongoose';

const usuariosSchema = new mongoose.Schema({
    email: String,
    password: String,
    nombre: String,
    apellidos: String,
    usuario: String,
    telefono: String,
    genero: String,
    fechaCum: Date,
    foto: String
});

export default mongoose.model('Usuario', usuariosSchema);