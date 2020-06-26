const router = require('express').Router();
const Tutorial = require('../../controller/tutorial.controller');
const {
    checkToken
} = require('../middlewares');
const {
    route
} = require('./noticias');

// GET http://localhost:3000/api/tutoriales
// obtener todos las noticias

router.get('/', (req, res) => {
    Tutorial.getAllTutorial()
        .then((rows) => {
            res.json(
                rows
            );
        })
        .catch(err => {
            res.json({
                error: err.message
            });
        });

});

// GET http://localhost:3000/api/tutoriales/:id
// saco una noticia

router.get('/:id', async (req, res) => {
    const tutorial = await Tutorial.getById(req.params.id);
    res.json(tutorial);
});

// POST http://localhost:3000/api/tutoriales
// creo una noticia

router.post('/', checkToken, async (req, res) => {
    const result = await Tutorial.create(req.body);
    console.log(result);


    if (result['affectedRows'] === 1) {
        const tutorial = await Tutorial.getById(result['insertId']);
        res.json({
            success: 'se ha creado un tutorial'
        });
    } else {
        res.json({
            error: 'algo has liado'
        });
    }
});

// PUT http://localhost:3000/api/tutoriales/:id
// editar una noticia

router.put('/:id', checkToken, async (req, res) => {
    const result = await Tutorial.updateById(req.params.id, req.body);

    if (result['affectedRows'] === 1) {
        res.json({
            success: 'actualización de tutorial'
        });
    } else {
        res.json({
            error: 'algo has liado'
        });
    }
});

// DELETE http://localhost:3000/api/tutoriales/:id
// editar una noticia

router.delete('/:id', async (req, res) => {
    const tutorial = await Tutorial.getById(req.params.id);

    const result = await Tutorial.deleteById(req.params.id, req.body);

    if (result['affectedRows'] === 1) {
        // console.log(result);

        res.json({
            success: 'se ha eliminado el tutorial'
        });
    } else {
        res.json({
            error: 'algo has liado'
        });
    }
});




module.exports = router;