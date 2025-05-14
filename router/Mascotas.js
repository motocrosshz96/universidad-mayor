const express = require("express");
const router = express.Router();
const Mascota = require("../models/mascota");

// Mostrar todas las mascotas
router.get("/", async (req, res) => {
    try {
        const arrayMascotasDB = await Mascota.find();
        res.render("mascotas", { arrayMascotas: arrayMascotasDB });
    } catch (error) {
        console.log(error);
        res.render("mascotas", { arrayMascotas: [] });
    }
});

// Mostrar formulario para agregar una nueva mascota
router.get("/agregar", (req, res) => {
    res.render("agregar"); // Asegúrate de tener una vista llamada agregar.ejs
});

// Ver detalle de una mascota
router.get("/:id", async (req, res) => {
    try {
        const mascotaDB = await Mascota.findById(req.params.id);
        res.render("detalle", { mascota: mascotaDB });
    } catch (error) {
        console.log(error);
        res.status(404).render("404", { error: "Mascota no encontrada" });
    }
});

// Editar mascota (mostrar formulario)
router.get("/:id/editar", async (req, res) => {
    try {
        const mascotaDB = await Mascota.findById(req.params.id);
        res.render("editar", { mascota: mascotaDB });
    } catch (error) {
        console.log(error);
        res.status(404).render("404", { error: "Mascota no encontrada" });
    }
});

// Actualizar mascota (ruta PUT)
router.put("/:id", async (req, res) => {
    const { id } = req.params;
    const { nombre, descripcion } = req.body;

    try {
        // Actualiza la mascota con el id correspondiente
        await Mascota.findByIdAndUpdate(id, { nombre, descripcion });
        res.redirect("/mascotas"); // Redirige a la página de todas las mascotas
    } catch (error) {
        console.log(error);
        res.status(500).render("404", { error: "Error al actualizar la mascota" });
    }
});

// Eliminar mascota (ruta DELETE)
router.delete("/:id", async (req, res) => { // Cambiar GET por DELETE
    try {
        await Mascota.findByIdAndDelete(req.params.id);
        res.redirect("/mascotas"); // Redirige al listado de mascotas
    } catch (error) {
        console.log(error);
        res.status(500).render("404", { error: "Error al eliminar mascota" });
    }
});

// Crear nueva mascota
router.post("/", async (req, res) => {
    const { nombre, descripcion } = req.body;

    try {
        const nuevaMascota = new Mascota({ nombre, descripcion });
        await nuevaMascota.save(); // Guarda en la base de datos
        res.redirect("/mascotas"); // Redirige al listado
    } catch (error) {
        console.log(error);
        res.status(500).render("404", { error: "Error al agregar mascota" });
    }
});

module.exports = router;
