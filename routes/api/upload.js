const express = require('express');
const router = express.Router();
var multer  = require('multer')
//var upload = multer({ dest: 'public/uploads/' })

const Upload = require('../../controller/upload.controller');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/uploads/')
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
  })
  const upload = multer({storage: storage})


router.post('/',upload.single('imagen'), function (req, res) {
    // req.file is the `avatar` file
    // req.body will hold the text fields, if there were any
    const nuevaImagen = req.file;
    nuevaImagen.userId = req.body.userId;
    const result = Upload.uploadFileUser(nuevaImagen)
    if (result['affectedRows'] === 1) {
      res.json({
          success: 'Registro Correcto',
      });
  } else {
      res.json({
          error: 'Error en el registro'
      })
  }
     

     
  })
  

module.exports = router;