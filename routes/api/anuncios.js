var express = require('express');
const router = express.Router();

var multer  = require('multer')

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

router.post('/upload',upload.array('file',4), function (req, res) {
    //console.log(req.file);
    let filename = req.body.name;
    console.log(toString(filename));
    
    res.json({ message: 'fichero subido'})
    
})


 router.post('/upload', function (req,res ){
     console.log(req.file);
     
 })


// GET http://localhost:3000/api/anuncios
// obtener todos los anuncios
router.get('/', (req,res)=>{
     /* res.render('error') */
     res.json({ message: 'entra en en api anuncios' })
});

// POST http://localhost:3000/api/anuncios
// crear usuario
router.post('/', (req, res) => {
    res.json(req.body);

});

// PUT http://localhost:3000/api/anuncios
// editar usuario
router.put('/', (req, res) => {
    res.json({message: 'anuncios api works'});

});

// DELETE http://localhost:3000/api/anuncios
// borrar usuario
router.delete('/', (req, res) => {
    res.json({message: 'anuncios api works'});

});


module.exports = router;