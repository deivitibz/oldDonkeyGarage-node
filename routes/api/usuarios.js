const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const moment = require('moment');

const Usuario = require('../../controller/usuario.controller');


// TODO: registrar usuario

router.post('/registro', async (req, res) => {
    req.body.password = bcrypt.hashSync(req.body.password, 10);
    const result = await Usuario.create(req.body);
    if (result['affectedRows'] === 1) {
        res.json({
            success: 'Registro Correcto'
        });
    } else {
        res.json({
            error: 'Error en el registro'
        })
    }

    res.json(req.body)
});

// TODO: loguear usuario

router.post('/login', async (req, res) => {
    const usuario = await Usuario.getByEmail(req.body.email);
    if (usuario) {
        const iguales = bcrypt.compareSync(req.body.password, usuario.password);
        if (iguales) {
            res.json({
                success: 'Login correcto',
                token: createToken(usuario.id)
            });
        } else {
            res.json({
                error: 'Error en email y/o password'
            });
        }
    } else {
        res.json({
            error: 'Error en email y/o password'
        });
    }
});

router.get('/check', (req, res) => {
    console.log(req.headers['user-token']);
    res.json(req.payload);
})

function createToken(userId) {
    const payload = {
        userId: userId,
        createdAt: moment().unix(),
        expiredAt: moment().add(60, 'minutes').unix()
    }
    return jwt.sign(payload, process.env.SECRET_KEY)
}


// GET http://localhost:3000/api/usuarios
// obtener todos los usuarios
router.get('/', async (req, res) => {
    const rows = await Usuario.getAllUsers();
    console.log(rows);

    res.json(rows);
});

router.get('/:id', async (req, res) => {
    const user = await Usuario.getByUser(req.params.id);
    res.json(user);
})

// POST http://localhost:3000/api/usuarios
// crear usuario
router.post('/', async (req, res) => {
    const result = await Usuario.create(req.body);

    if (result['affectedRows'] === 1) {
        const user = await Usuario.getByUser(result['insertId']);
        res.json({
            sucess: 'se ha creado un usuario'
        });

    } else {
        res.json({
            error: 'algo has liado'
        });
    }


});

// PUT http://localhost:3000/api/usuarios
// editar usuario
router.put('/:id', async (req, res) => {
    const result = await Usuario.updateById(req.params.id, req.body);
    if (result['affectedRows'] === 1) {
        res.json({
            sucess: 'actualización de usuario'
        });
    } else {
        res.json({
            error: 'algo has liado'
        })
    }

});

// DELETE http://localhost:3000/api/usuarios
// borrar usuario
router.delete('/:id', async (req, res) => {
    const user = await Usuario.getByUser(req.params.id);

    const result = await Usuario.deleteById(req.params.id, req.body);
    console.log(result);


    if (result['affectedRows'] === 1) {


        res.json({
            sucess: 'se ha eliminado el usuario'
        });
    } else {
        res.json({
            error: 'algo has liado'
        })
    }

    // res.json({
    //     message: 'usuarios router works'
    // });

});


module.exports = router;