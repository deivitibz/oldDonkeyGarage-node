const router = require('express').Router();

const { checkToken } = require('./middlewares')

const apiUsuariosRouter = require('./api/usuarios');
const apiAnunciosRouter = require('./api/anuncios');
const apiNoticiasRouter = require('./api/noticias');
const apiMotosRouter = require('./api/motocicletas');
const apiPerfilRouter = require('./api/perfil');
const apiConstructoresRouter = require('./api/constructores')


router.use('/noticias', checkToken, apiNoticiasRouter);
router.use('/usuarios', apiUsuariosRouter);
router.use('/anuncios', checkToken, apiAnunciosRouter);
router.use('/motos', checkToken, apiMotosRouter);
router.use('/perfil', checkToken, apiPerfilRouter);
router.use('/constructor', checkToken, apiConstructoresRouter);

module.exports = router;