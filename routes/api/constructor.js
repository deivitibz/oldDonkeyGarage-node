const router = require('express').Router();


// CREAR USUARIO
router.post('/', (req, res) => {
    res.json({message:'constructor creado ', constructor: req.body});

});

// MOSTRAR USUARIOS
router.get('/', (req,res)=>{
    res.json({message: 'mostrar todos los constructores'})
})

// MOSTRAR USUARIOS
router.get('/:id', (req,res)=>{
    res.json({message: 'mostrar el constructor '+ req.params.id})
})

// EDITAR USUARIO
router.put('/:id', (req,res)=>{
    res.json({message: 'editar constructor ok', id: req.params.id})
})

// ELIMINAR USUARIO
router.delete('/:id', (req,res)=>{
    res.json({message: 'eliminar constructor ok',id: 'el id a eliminar es '+req.params.id})
})

module.exports = router;
