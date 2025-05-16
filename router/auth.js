const express = require('express');
const router = express.Router();

// Ruta para mostrar formulario de login
router.get('/login', (req, res) => {
    res.render('login', { tituloweb: 'Iniciar Sesión' });
});

module.exports = router;
