const router = require('express').Router();

router.get('/', (req,res)=> {
     res.json({message: 'la api constructores funciona'});
});

router.get('/:id', (req,res)=> {
     res.json({message: 'la api constructores funciona, el id es ' + req.params.id});
});


module.exports = router 