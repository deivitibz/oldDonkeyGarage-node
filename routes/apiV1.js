const express = require('express');
const router = express.Router();

const usuariosRouter = require('./apiV1/usuarios.api')

router.use('/usuarios', usuariosRouter)

module.exports = router;