const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const moment = require('moment');

const Usuario = require ('../../controller/usuario.controller');


// TODO: registrar usuario

router.post('/registro', async (req, res) => {
    req.body.password = bcrypt.hashSync(req.body.password, 10);
    const result = await Usuario.create(req.body);
    if (result['affectedRows'] === 1) {
        res.json({ success: 'Registro Correcto'});
    } else {
        res.json({ error: 'Error en el registro'})
    }

    res.json(req.body)
});

// TODO: loguear usuario

router.post('/login', async (req, res) => {
    console.log(req.headers);
    
    const usuario = await Usuario.getByEmail(req.body.email);
    if (usuario) {
        const iguales = bcrypt.compareSync(req.body.password, usuario.password);
        if (iguales) {
             res.json({ success: 'Login correcto', token: createToken(usuario.id)});
        } else {
             res.json({ error: 'Error en email y/o password'});
        }
    } else {
         res.json({ error: 'Error en email y/o password'});
    }
});


function createToken(userId) {
    const payload = {
        userId: userId,
        createdAt: moment().unix(),
        expiredAt: moment().add(15, 'minutes').unix() 
    }
    return jwt.sign(payload, process.env.SECRET_KEY)
}


// GET http://localhost:3000/api/usuarios
// obtener todos los usuarios
router.get('/', (req,res)=>{
     res.json({message: 'usuarios router works'});
});

// POST http://localhost:3000/api/usuarios
// crear usuario
router.post('/', (req, res) => {
    res.json({message: 'usuarios router works'});

});

// PUT http://localhost:3000/api/usuarios
// editar usuario
router.put('/', (req, res) => {
    res.json({message: 'usuarios router works'});

});

// DELETE http://localhost:3000/api/usuarios
// borrar usuario
router.delete('/', (req, res) => {
    res.json({message: 'usuarios router works'});

});


module.exports = router;