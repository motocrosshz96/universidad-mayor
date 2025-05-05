const mongoose = require("mongoose"); // Importa Mongoose
const Schema = mongoose.Schema;// Obtiene el constructor Schema de Mongoose

const  mascotaSchema = new Schema({ // Define el esquema para la colección de mascotas
    nombre: String,
    descripcion: String
})

// Crear el modelo Mascota basado en el esquema anterior
const Mascota = mongoose.model("Mascota", mascotaSchema);

module.exports = Mascota;// Exporta el modelo para poder usarlo en otras partes del proyecto