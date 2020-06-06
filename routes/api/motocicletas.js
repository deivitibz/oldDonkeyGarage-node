const router = require('express').Router();
const TipoMoto = require('../../models/tipoMotos');

// GET http://localhost:3000/api/motos
// obtener todos los usuarios
router.get('/', async (req,res)=>{
     const rows = await TipoMoto.getAll();
     console.log(rows);
     
        
});

// POST http://localhost:3000/api/motos
// crear usuario
router.post('/', async (req, res) => {
    const response = await TipoMoto.addNew(req.body);
    res.json({message: 'motocicletas router works'});

});

// PUT http://localhost:3000/api/motocicletas
// editar usuario
router.put('/', (req, res) => {
    res.json({message: 'motocicletas router works'});

});

// DELETE http://localhost:3000/api/motocicletas
// borrar usuario
router.delete('/', (req, res) => {
    res.json({message: 'motocicletas router works'});

});


module.exports = router;