const router = require('express').Router();

// GET http://localhost:3000/api/perfil
// obtener todos los usuarios
router.get('/', (req,res)=>{
     res.json({message: 'perfil router works'});
});

router.get('/:id', (req,res)=>{
    res.json({message: 'perfil router works con id '+ req.params.id});
});
// POST http://localhost:3000/api/perfil
// crear usuario
router.post('/', (req, res) => {
    res.json({message: 'perfil router works'});

});

// PUT http://localhost:3000/api/perfil
// editar usuario
router.put('/', (req, res) => {
    res.json({message: 'perfil router works'});

});

// DELETE http://localhost:3000/api/perfil
// borrar usuario
router.delete('/', (req, res) => {
    res.json({message: 'perfil router works'});

});


module.exports = router;