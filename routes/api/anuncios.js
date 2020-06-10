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

var upload = multer({ storage: storage })

// TODO: UPLOAD PICTURES TO SERVER

router.post('/upload',upload.single('photos'), function (req, res) {
    console.log(req.file);
    res.json(req.file)
    
    

    // req.files is array of `photos` files
    // req.body will contain the text fields, if there were any
  })

// GET http://localhost:3000/api/usuarios
// obtener todos los usuarios
router.get('/', (req,res)=>{
     res.render('error')
});

// POST http://localhost:3000/api/usuarios
// crear usuario
router.post('/', (req, res) => {
    res.json({message: 'anuncios api works'});

});

// PUT http://localhost:3000/api/usuarios
// editar usuario
router.put('/', (req, res) => {
    res.json({message: 'anuncios api works'});

});

// DELETE http://localhost:3000/api/usuarios
// borrar usuario
router.delete('/', (req, res) => {
    res.json({message: 'anuncios api works'});

});


module.exports = router;