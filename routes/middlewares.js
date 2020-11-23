const jwt = require('jsonwebtoken');
const moment = require('moment');
const Usuario = require('../controller/usuario.controller');


const checkToken = (req, res, next) => {

    if (!req.headers['user-token']) {
        return res.json({
            error: 'Debes incluir el token',
            error_type: 'noToken'
        })
    }

    const userToken = req.headers['user-token'];
    let payload = {};
    try {
        payload = jwt.verify(userToken, process.env.SECRET_KEY)
        console.log(payload);
    } catch (err) {
        console.log(err.message);
        return res.json({
            error: 'El token no es correcto',
            error_type: 'errorToken',
            message: err.message
        });
    }

    const fechaActual = moment().unix();
    if (fechaActual > payload.expiredAt) {
        console.log('token caducado');

        return res.json({
            error: 'El token esta caducado',
            error_type: 'caducadoToken'
        });
    }

    req.payload = payload;
    next()

}

const isAdmin = async (req, res, next) => {
    const usuario = await Usuario.getByUser(req.payload.userId)
    next()
}


module.exports = {
    checkToken
}