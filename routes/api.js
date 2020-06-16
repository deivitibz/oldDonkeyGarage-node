const router = require('express').Router();

const apiUsuariosRouter = require('./api/usuarios');
const apiAnunciosRouter = require('./api/anuncios');
const apiNoticiasRouter = require('./api/noticias');
const apiMotosRouter = require('./api/motocicletas');
const apiPerfilRouter = require('./api/perfil');
const apiConstructorRouter = require('./api/constructor');

router.use('/noticias', apiNoticiasRouter);
router.use('/usuarios', apiUsuariosRouter);
router.use('/anuncios', apiAnunciosRouter);
router.use('/motos', apiMotosRouter);
router.use('/anuncios', apiPerfilRouter);
router.use('/constructor', apiConstructorRouter);


module.exports = router;