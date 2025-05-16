const express = require('express');
const app = express();

require('dotenv').config();

const port = process.env.PORT || 3000;

const mongoose = require('mongoose');
const methodOverride = require('method-override');
const session = require('express-session');

const uri = `mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@cluster0.tx7kels.mongodb.net/${process.env.DBNAME}?retryWrites=true&w=majority&appName=Cluster0`;

mongoose.connect(uri)
    .then(() => console.log("✅ Base de datos conectada correctamente"))
    .catch((e) => console.error("❌ Error de conexión a MongoDB:", e));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(methodOverride('_method'));

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

app.use(express.static(__dirname + "/public"));

app.use(session({
    secret: 'tu_clave_secreta_aqui', // Cambia esto por algo seguro
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 } // 1 hora
}));

// 👇 Middleware para que `session` esté disponible en todas las vistas EJS
app.use((req, res, next) => {
    res.locals.session = req.session;
    next();
});

// Tus rutas principales (las que ya tenías)
app.use("/mascotas", require("./router/Mascotas"));
app.use("/", require("./router/RutasWeb"));
app.use("/", require("./router/perro"));

// Aquí agregamos la ruta para usuarios con prefijo /usuarios
app.use("/usuarios", require("./router/usuarios"));

// Middleware para errores 404
app.use((req, res, next) => {
    res.status(404).render("404", {
        titulo: "404",
        descripcion: "titulo del sitio web"
    });
});

app.listen(port, () => {
    console.log('Servidor a su servicio', port);
});
