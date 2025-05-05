const express = require("express");
const router = express.Router();
const axios = require("axios");

router.get("/perro-aleatorio", async (req, res) => {
    try {
        // Obtener la imagen de perro aleatorio desde la API
        const response = await axios.get("https://dog.ceo/api/breeds/image/random");
        const imagen = response.data.message; // URL de la imagen

        // Renderizar la vista con la imagen
        res.render("perros", { imagen }); // Pasa la imagen a la vista

    } catch (error) {
        console.error("Error al obtener la imagen de perro:", error);
        res.status(500).send("Error al obtener la imagen de perro");
    }
});

module.exports = router;



