const router = require('express').Router();
const TipoMoto = require('../../controller/tipo_moto.controller');

// GET http://localhost:3000/api/motos
// obtener todos las motos
router.get('/', (req, res) => {
    TipoMoto.getAllTipos()
        .then((rows) => {
            res.json({
                rows
            })
        })
        .catch(err => {
            res.json({
                error: err.message
            });
        });


});

// GET http://localhost:3000/api/motos/:id
// una moto
router.get('/:id', async (req, res) => {
    const moto = await TipoMoto.getById(req.params.id);

    res.json(moto);

});

// POST http://localhost:3000/api/motos
// crear usuario
router.post('/', async (req, res) => {
    const result = await TipoMoto.create(req.body);
    console.log('entra');


    if (result['affectedRows'] === 1) {
        const moto = await TipoMoto.getById(result['insertId']);
        res.json({
            success: 'se ha creado el  tipo moto'
        });
    } else {
        res.json({
            error: 'algo has liado'
        });
    }


});

// PUT http://localhost:3000/api/motocicletas
// editar una moto
router.put('/:id', async (req, res) => {
    const result = await TipoMoto.updateById(req.params.id, req.body);
    console.log(result);

    if (result['affectedRows'] === 1) {
        res.json({
            sucess: 'moto actualizada'
        });
    } else {
        res.json({
            error: 'algo has liado'
        })
    }
});

// DELETE http://localhost:3000/api/motocicletas
// borrar moto
router.delete('/:id', async (req, res) => {

    const moto = await TipoMoto.getById(req.params.id);
    console.log(moto);


    const result = await TipoMoto.deleteById(req.params.id, req.body);

    if (result['affectedRows'] === 1) {
        // console.log(result);

        res.json({
            sucess: 'se ha eliminado la moto'
        });
    } else {
        res.json({
            error: 'algo has liado'
        })
    }


});


module.exports = router;