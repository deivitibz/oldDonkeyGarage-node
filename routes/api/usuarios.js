const router = require('express').Router();

// GET http://localhost:3000/api/usuarios
// obtener todos los usuarios
router.get('/', (req,res)=>{
     res.json({message: 'usuarios router works'});
});

// POST http://localhost:3000/api/usuarios
// crear usuario
router.post('/', (req, res) => {
    res.json({message: 'usuarios router works'});

});

// PUT http://localhost:3000/api/usuarios
// editar usuario
router.put('/', (req, res) => {
    res.json({message: 'usuarios router works'});

});

// DELETE http://localhost:3000/api/usuarios
// borrar usuario
router.delete('/', (req, res) => {
    res.json({message: 'usuarios router works'});

});


module.exports = router;