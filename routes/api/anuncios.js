const express = require('express');
const router = express.Router();
const Anuncio = require('../../controller/anuncios.controller');
const {
    checkToken
} = require('../middlewares');
/* const multipart = require('connect-multiparty');
const multipartMiddleware = multipart();
 */
// TODO: UPLOAD PICTURES TO SERVER
/* 
router.post('/upload', multipartMiddleware, (req, res) => {
    console.log(req.body)
    console.log(req.files.imagen.path)
    let content = fs.readFileSync(req.files.imagen.path)
    fs.writeFileSync('./images/test.png', content)
    res.json({success: "Todo correcto"})
   })
 */



// GET http://localhost:3000/api/anuncios
// obtener todos los anuncios
router.get('/', (req, res) => {
    Anuncio.getAllAnuncios()
        .then((rows) => {
            res.json(rows);
        })
        .catch(err => {
            res.json({
                error: err.message
            })
        })
});

// GET http://localhost:3000/api/anuncios/:id
// obtener un anuncio
router.get('/:id', async (req, res) => {
    const anuncio = await Anuncio.getById(req.params.id);
    res.json(anuncio[0])

})

// Obtiene todos los anuncios de un unico usuario
router.get('/getbyuser/:id', checkToken, async (req, res) => {
    const anuncio = await Anuncio.getByUserId(req.params.id);
    res.json(anuncio)
})

// Obtiene los anuncios por categoria 
router.get('/getbycategoria/:categoria',async(req,res)=>{
    const resultado = await Anuncio.getByCategory(req.params.categoria)
    res.json(resultado);
})

// POST http://localhost:3000/api/anuncios
// crear usuario
router.post('/', checkToken, async (req, res) => {
    const result = await Anuncio.create(req.body);
    if (result['affectedRows'] === 1) {
        res.json({success: 'Se a creado un anuncio'});
    } else {
        res.json({error: 'algo has liado'});
    }
});

// PUT http://localhost:3000/api/anuncios/:id
// editar anuncio
router.put('/:id', checkToken, async (req, res) => {
    const result = await Anuncio.updateById(req.params.id, req.body);
    console.log(req.body);
    
    if (result['affectedRows'] === 1) {
        res.json({success: 'Anuncio actualizado correctamente'});
    } else {
        res.json({error: 'algo has liado'})
    }


});

// DELETE http://localhost:3000/api/anuncios
// borrar anuncio
router.delete('/:id', checkToken, async (req, res) => {
    const anuncio = await Anuncio.getById(req.params.id);
    console.log(anuncio);
    const result = await Anuncio.deleteById(req.params.id, req.body);
    if (result['affectedRows'] === 1) {
        res.json({success: 'Se ha eliminado el anuncio'})
    } else {
        res.json({error: 'algo has liado'})
    }

});


module.exports = router;