var express = require('express');
const router = express.Router();

const Anuncio = require('../../controller/anuncios.controller');

var multer = require('multer')

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now())
    }
});

var upload = multer({
    storage: storage
})

// TODO: UPLOAD PICTURES TO SERVER

router.post('/upload', upload.array('file', 4), function (req, res) {
    //console.log(req.file);
    let filename = req.body.name;
    console.log(toString(filename));

    res.json({
        message: 'fichero subido'
    })

})


router.post('/upload', function (req, res) {
    console.log(req.file);

})


// GET http://localhost:3000/api/anuncios
// obtener todos los anuncios
router.get('/', (req, res) => {
    console.log('entra');

    Anuncio.getAllAnuncios()
        .then((rows) => {
            res.json(rows);
        })
        .catch(err => {
            res.json({
                error: err.message
            })
        })
    // res.json({
    //     message: 'entra en en api anuncios'
    // })
});

// GET http://localhost:3000/api/anuncios/:id
// obtener un anuncio
router.get('/:id', async (req, res) => {
    const anuncio = await Anuncio.getById(req.params.id);
    res.json(anuncio)
})

// POST http://localhost:3000/api/anuncios
// crear usuario
router.post('/', async (req, res) => {
    console.log(req.body);
    
    //const result = await Anuncio.create(req.body);
    //console.log(result);

    res.json(req.body);

});

// PUT http://localhost:3000/api/anuncios/:id
// editar anuncio
router.put('/:id', async (req, res) => {
    const result = await Anuncio.updateById(req.params.id, req.body);
    console.log(result);
    console.log(req.body);

    if (result['affectedRows'] === 1) {
        res.json({
            sucess: 'actualizado el anuncios'
        });
    } else {
        res.json({
            error: 'algo has liado'
        })
    }


});

// DELETE http://localhost:3000/api/anuncios
// borrar anuncio
router.delete('/:id', async (req, res) => {
    const anuncio = await Anuncio.getById(req.params.id);
    console.log(anuncio);
    const result = await Anuncio.deleteById(req.params.id, req.body);
    if (result['affectedRows'] === 1) {
        res.json({
            sucess: 'se ha eliminado el anuncio'
        })
    } else {
        res.json({
            error: 'algo has liado'
        })
    }

});


module.exports = router;