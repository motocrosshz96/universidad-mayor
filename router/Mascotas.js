const express = require("express");
const router = express.Router();
const Mascota = require("../models/mascota");
const verificarAutenticacion = require('../middleware/auth');

// 🔐 Aplica el middleware a todas las rutas de este archivo
router.use(verificarAutenticacion);

// Mostrar todas las mascotas
router.get("/", async (req, res) => {
    try {
        const arrayMascotasDB = await Mascota.find();
        res.render("mascotas", { 
            arrayMascotas: arrayMascotasDB,
            usuarioNombre: req.session.usuario ? req.session.usuario.nombre : null
        });
    } catch (error) {
        console.log(error);
        res.render("mascotas", { 
            arrayMascotas: [],
            usuarioNombre: null
        });
    }
});

// Mostrar formulario para agregar una nueva mascota
router.get("/agregar", (req, res) => {
    res.render("agregar", { 
        usuarioNombre: req.session.usuario ? req.session.usuario.nombre : null 
    }); // Asegúrate de tener una vista llamada agregar.ejs
});

// Ver detalle de una mascota
router.get("/:id", async (req, res) => {
    try {
        const mascotaDB = await Mascota.findById(req.params.id);
        res.render("detalle", { 
            mascota: mascotaDB,
            usuarioNombre: req.session.usuario ? req.session.usuario.nombre : null
        });
    } catch (error) {
        console.log(error);
        res.status(404).render("404", { error: "Mascota no encontrada" });
    }
});

// Editar mascota (mostrar formulario)
router.get("/:id/editar", async (req, res) => {
    try {
        const mascotaDB = await Mascota.findById(req.params.id);
        res.render("editar", { 
            mascota: mascotaDB,
            usuarioNombre: req.session.usuario ? req.session.usuario.nombre : null
        });
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
        await Mascota.findByIdAndUpdate(id, { nombre, descripcion });
        res.redirect("/mascotas");
    } catch (error) {
        console.log(error);
        res.status(500).render("404", { error: "Error al actualizar la mascota" });
    }
});

// Eliminar mascota (ruta DELETE)
router.delete("/:id", async (req, res) => {
    try {
        await Mascota.findByIdAndDelete(req.params.id);
        res.redirect("/mascotas");
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
        await nuevaMascota.save();
        res.redirect("/mascotas");
    } catch (error) {
        console.log(error);
        res.status(500).render("404", { error: "Error al agregar mascota" });
    }
});

module.exports = router;
