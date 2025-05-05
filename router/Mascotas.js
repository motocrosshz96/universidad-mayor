const express = require("express");
const router = express.Router();// Crea una instancia del enrutador de Express

const Mascota = require("../models/mascota");// Importa el modelo Mascota

router.get("/", async (req, res) => { // Ruta GET para obtener todas las mascotas
    try {
        const arrayMascotasDB = await Mascota.find();// Consulta todas las mascotas en la base de datos
        console.log(arrayMascotasDB);// Muestra los resultados por consola

        res.render("mascotas", {
            arrayMascotas: arrayMascotasDB // Pasa los datos a la vista EJS
        });
    } catch (error) {
        console.log(error);// Muestra el error en consola
        res.render("mascotas", {
            arrayMascotas: [] // En caso de error, pasa un array vacío a la vista
        });
    }
});


module.exports = router;// Exporta el enrutador para usarlo en app.js