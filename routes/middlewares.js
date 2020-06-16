const jwt = require('jsonwebtoken');
const moment = require('moment');

const Usuario = require('../controller/usuario.controller')

const checkToken = (req,res,next) => {

    if (!req.headers['user-token']){
        return res.json({ error: 'Debes incluir el token'})
    }

    const userToken = req.headers['user-token'];
    let payload = {};
    try{
        payload = jwt.verify(userToken, process.env.SECRET_KEY)
    }
    catch (err){
        return  res.json({ error: 'El token no es correcto'});
    }

    const fechaActual = moment().unix();
    if (fechaActual > payload.expiredAt) {
        return ({ error: 'El token esta caducado'});
    }

    req.payload = payload;

    next()
    
}   


module.exports = { checkToken }