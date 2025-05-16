const express = require('express');
const router = express.Router();
const Usuario = require('../models/Usuario');

// Vista formulario registro
router.get('/registro', (req, res) => {
    res.render('usuarios/registro', { tituloweb: 'Registro' });
});

// Vista formulario login
router.get('/login', (req, res) => {
    res.render('usuarios/login', { tituloweb: 'Iniciar Sesión' });
});

// Procesa registro
router.post('/registro', async (req, res) => {
    const { nombre, email, password } = req.body;

    try {
        const yaExiste = await Usuario.findOne({ email });
        if (yaExiste) {
            return res.send('Ya existe un usuario con ese correo.');
        }

        const nuevoUsuario = new Usuario({ nombre, email, password });
        await nuevoUsuario.save();
        res.redirect('/usuarios/login');
    } catch (error) {
        console.error('Error al registrar usuario:', error);
        res.status(500).send('Error al registrar');
    }
});

// Procesa login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const usuario = await Usuario.findOne({ email });
        if (!usuario) {
            return res.send('Usuario no encontrado');
        }

        const coincide = await usuario.compararContrasena(password);
        if (!coincide) {
            return res.send('Contraseña incorrecta');
        }

        req.session.usuario = usuario;
        res.redirect("/mascotas");

    } catch (error) {
        console.error('Error al iniciar sesión:', error);
        res.status(500).send('Error al iniciar sesión');
    }
});

// Cierre de sesión
router.get("/logout", (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.log(err);
            return res.status(500).send("Error al cerrar sesión");
        }
        res.redirect("/usuarios/login"); // Redirige al formulario de login
    });
});


module.exports = router;
