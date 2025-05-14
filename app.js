const express = require('express'); // Importa el framework Express para crear el servidor.
const app = express(); // Crea una instancia de la aplicación Express.

require('dotenv').config(); // Carga las variables de entorno desde un archivo .env.

const port = process.env.PORT || 3000; // Define el puerto del servidor, tomando el de la variable de entorno o el 3000 por defecto.

// Conexion a base de datos
const mongoose = require('mongoose'); // Importa Mongoose para conectar y usar MongoDB.

// Crea la URI de conexión a MongoDB usando las variables de entorno.
const uri = `mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@cluster0.tx7kels.mongodb.net/${process.env.DBNAME}?retryWrites=true&w=majority&appName=Cluster0`;

mongoose.connect(uri) // Intenta conectarse a MongoDB con la URI
    .then(() => console.log("✅ Base de datos conectada correctamente")) // Si la conexión es exitosa
    .catch((e) => console.error("❌ Error de conexión a MongoDB:", e)); // Si hay un error en la conexión

// Middleware para procesar datos de formularios
app.use(express.urlencoded({ extended: true })); // Para formularios con datos tipo 'x-www-form-urlencoded'
app.use(express.json()); // Para datos en formato JSON

// Agregar method-override aquí, después de la configuración de express.urlencoded() y express.json()
const methodOverride = require('method-override');
app.use(methodOverride('_method')); // Usa method-override para permitir PUT y DELETE en formularios

// Motor de plantillas
app.set('view engine', 'ejs'); // Configura EJS como el motor de vistas.
app.set('views', __dirname + '/views'); // Configura el directorio de vistas.

app.use(express.static(__dirname + "/public")); // Sirve archivos estáticos desde la carpeta public.

// Rutas
app.use("/mascotas", require("./router/Mascotas")); // Usa el archivo de rutas de mascotas para el path /mascotas
app.use("/", require("./router/RutasWeb")); // Usa las rutas principales del sitio web
app.use("/", require("./router/perro")); // Otra ruta de perros

// Middleware para errores 404
app.use((req, res, next) => {
    res.status(404).render("404", {
        titulo: "404",
        descripcion: "titulo del sitio web"
    });
});

app.listen(port, () => { // Inicia el servidor en el puerto definido
    console.log('Servidor a su servicio', port);
});
