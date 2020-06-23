const router = require('express').Router();

const {
    checkToken
} = require('./middlewares')

const apiUsuariosRouter = require('./api/usuarios');
const apiAnunciosRouter = require('./api/anuncios');
const apiNoticiasRouter = require('./api/noticias');
const apiMotosRouter = require('./api/motocicletas');
const apiPerfilRouter = require('./api/perfil');
const apiConstructoresRouter = require('./api/constructores')
const apiTutorialesRouter = require('./api/tutoriales');


router.use('/noticias', apiNoticiasRouter);
router.use('/usuarios', apiUsuariosRouter);
router.use('/anuncios', apiAnunciosRouter);
router.use('/motos', apiMotosRouter);
router.use('/perfil', apiPerfilRouter);
router.use('/constructor', apiConstructoresRouter);
router.use('/tutoriales', apiTutorialesRouter);

module.exports = router;