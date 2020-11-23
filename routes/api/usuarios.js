const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const moment = require('moment');
const {
    checkToken
} = require('../middlewares');

const Usuario = require('../../controller/usuario.controller');


// TODO: registrar usuario

router.post('/registro', async (req, res) => {
    let emailCheck = req.body.email;
    let getEmail = await Usuario.getByEmail(emailCheck);
    if(getEmail !== null){
        res.json({error: 'El email ya existe en la base de datos'});
    } else {
        req.body.password = bcrypt.hashSync(req.body.password, 10);
        const result = await Usuario.create(req.body);
        if (result['affectedRows'] === 1) {
            res.json({success: 'Registro Correcto'});
        } else {
            res.json({error: 'Error en el registro'})
        }
        res.json(req.body)
    }
});

// TODO: loguear usuario

router.post('/login', async (req, res) => {
    const usuario = await Usuario.getByEmail(req.body.email);
    console.log(usuario);

    if (usuario) {
        const iguales = bcrypt.compareSync(req.body.password, usuario.password);
        if (iguales) {
            res.json({success: 'Login correcto',rol: usuario.rol,token: createToken(usuario.id, usuario.rol)});
        } else {
            res.json({error: 'Error en email y/o password'});
        }
    } else {
        res.json({error: 'Error en email y/o password'});
    }
});

router.get('/getToken',  (req, res) => {

    const token = createToken(1,'Admin')
    res.json(token)
    // console.log(req.headers['user-token']);
    // res.json(req.payload);
})


// function createToken(userId) {
//     const payload = {
//         userId: userId,
//         createdAt: moment().unix(),
//         expiredAt: moment().add(15, 'minutes').unix()
//     }
//     return jwt.sign(payload, process.env.SECRET_KEY)
// }

function createToken(userId, role) {
    const payload = {
        userId: userId,
        role: role,
        createdAt: moment().unix(),
        expiredAt: moment().add(60, 'minutes').unix()
    }
    return jwt.sign(payload, process.env.SECRET_KEY)
}


// GET http://localhost:3000/api/usuarios
// obtener todos los usuarios
router.get('/', checkToken, async (req, res) => {
    const rows = await Usuario.getAllUsers();
    res.json(rows);
});

router.get('/:id', checkToken, async (req, res) => {
    const user = await Usuario.getByUser(req.params.id);
    res.json(user);
})

// POST http://localhost:3000/api/usuarios
// crear usuario
router.post('/', checkToken, async (req, res) => {
    const result = await Usuario.create(req.body);
    if (result['affectedRows'] === 1) {
        res.json({success: 'Se ha creado un usuario'});
    } else {
        res.json({error: 'algo has liado'});
    }
});

// PUT http://localhost:3000/api/usuarios
// editar usuario
router.put('/:id', checkToken, async (req, res) => {
    req.body.password = bcrypt.hashSync(req.body.password, 10);
    const result = await Usuario.updateById(req.params.id, req.body);
    if (result['affectedRows'] === 1) {
        res.json({success: 'Actualización de usuario',data: req.body});
    } else {
        res.json({error: 'algo has liado',data: req.body})
    }
});

router.put('/update/:id', checkToken, async (req, res) => {
    const result = await Usuario.updatePerfil(req.params.id, req.body);
    if (result['affectedRows'] === 1) {
        res.json({success: 'Actualización de usuario',data: req.body});
    } else {
        res.json({error: 'algo has liado',data: req.body})
    }
});

// DELETE http://localhost:3000/api/usuarios
// borrar usuario
router.delete('/:id', checkToken, async (req, res) => {
    const result = await Usuario.deleteById(req.params.id);
    console.log(result);
    if (result['affectedRows'] === 1) {
        res.json({success: 'Se ha eliminado el usuario'});
    } else {
        res.json({error: 'algo has liado'})
    }
});


module.exports = router;