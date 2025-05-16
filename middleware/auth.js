function verificarAutenticacion(req, res, next) {
    if (req.session && req.session.usuario) {
        next(); // Usuario autenticado, continúa
    } else {
        res.redirect('/usuarios/login'); // Usuario no autenticado, redirige
    }
}

module.exports = verificarAutenticacion;
