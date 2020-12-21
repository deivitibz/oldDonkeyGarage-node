const router = require('express').Router();
const Noticia = require('../../controller/noticia.controller')
const { checkToken } = require('../middlewares');
var express = require('express')
var multer = require('multer')
var upload = multer({dest: 'uploads/'})
var app = express()
var multer = require('multer')
var upload = multer({dest: 'uploads/'})

app.post('/upload', upload.none(), (req, res, next) => {
    const file = req.file
    if (!file) {
        const error = new Error('Please upload a file')
        error.httpStatusCode = 400
        return next(error)
    }
    res.send(file)
})

// GET http://localhost:3000/api/noticias
// obtener todos las noticias
router.get('/', (req, res) => {
    Noticia.getAllNoticias()
        .then((rows) => { res.json(rows)})
        .catch(err => {
            res.json({error: err.message})
        });
});
// GET http://localhost:3000/api/noticias/id
// saco una noticia
router.get('/:id', async (req, res) => {
    const noticia = await Noticia.getById(req.params.id);
    res.json(noticia)

});


// POST http://localhost:3000/api/noticias
// crear noticia
router.post('/', checkToken, async (req, res) => {
    const result = await Noticia.create(req.body);
    if (result['affectedRows'] === 1) {
        const noticia = await Noticia.getById(result['insertId']);
        res.json({
            success: 'se ha creado la noticia'
        });
    } else {
        res.json({
            error: 'algo has liado'
        });
    }

});

// PUT http://localhost:3000/api/noticias
// editar noticia
router.put('/:id', checkToken, async (req, res) => {
    const result = await Noticia.updateById(req.params.id, req.body);
    console.log(result);
    
    if (result['affectedRows'] === 1) {
        res.json({success: 'Se a actualizado una noticia'});
    } else {
        res.json({error: 'algo has liado'})
    }
    // res.json({
    //     message: 'noticias router works'
    // });

});

// DELETE http://localhost:3000/api/noticias
// borrar noticia
router.delete('/:id', checkToken, async (req, res) => {

    const noticia = await Noticia.getById(req.params.id);
    // console.log(noticia);
    const result = await Noticia.deleteById(req.params.id, req.body);
    // console.log(result);
    // console.log(req.params.id);
    console.log(req.body);


    if (result['affectedRows'] === 1) {
        // console.log(result);

        res.json({
            success: 'se ha eliminado la noticia'
        });
    } else {
        res.json({
            error: 'algo has liado'
        })
    }
    // res.json({
    //     message: 'noticias router works'
    // });


});



module.exports = router;