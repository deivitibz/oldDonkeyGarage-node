const router = require('express').Router();

// GET http://localhost:3000/api/usuarios
// obtener todos los usuarios
router.get('/', (req,res)=>{
    
    
     res.json({message: 'noticias router works'});
});

router.get('/:id', (req,res)=>{
    
    
     res.json({message: 'recupera el id ' + req.params.id});
});

// POST http://localhost:3000/api/noticias
// crear usuario
router.post('/', (req, res) => {
    res.json({message: 'noticias router works', body: req.body});

});

// PUT http://localhost:3000/api/noticias
// editar usuario
router.put('/', (req, res) => {
    res.json({message: 'noticias router works'});

});

// DELETE http://localhost:3000/api/noticias
// borrar usuario
router.delete('/', (req, res) => {
    res.json({message: 'noticias router works'});

});


module.exports = router;