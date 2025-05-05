const express = require("express");
const router = express.Router();// Crea una instancia del enrutador
const axios = require("axios"); // Importa Axios para consumir la API externa

router.get('/', (req, res) => {
    //console.log(__dirname)
    res.render("index", {titulo: "mi titulo dinamico"})// Renderiza la vista index.ejs con una variable
})


router.get('/servicios', (req, res) => {
    res.render("servicios", {tituloservicios: " este es un mensaje dinamico de servicios"})// Renderiza la vista servicios.ejs con una variable
})

module.exports = router;// Exporta el enrutador
