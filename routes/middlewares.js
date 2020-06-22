const jwt = require('jsonwebtoken');
const moment = require('moment');
const Usuario = require('../controller/usuario.controller')

const checkToken = (req,res,next) => {
    
    if (!req.headers['user-token']){
        return res.json({ error: 'Debes incluir el token', error_type: 'noToken'})
    }

    const userToken = req.headers['user-token'];
    let payload = {};
    try{
        payload = jwt.verify(userToken, process.env.SECRET_KEY)
    }
    catch (err){
        console.log(err);
        return res.json({ error: 'El token no es correcto', error_type: 'errorToken'});
    }

    const fechaActual = moment().unix();
    if (fechaActual > payload.expiredAt) {
        console.log('token caducado');
        
        return res.json({ error: 'El token esta caducado', error_type: 'caducadoToken'});
    }

    req.payload = payload;
    res.json({success: 'El Token es correcto'})
    next()
    
}   

const isAdmin = async (req,res,next) => {
    const usuario = await Usuario.getByUser(req.payload.userId)
}


module.exports = { checkToken }