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


/* router.post('/',upload.single('imagen'), async function (req, res) {
    res.json(req.file);
  })
   */
router.post('/',upload.single('imagen'), (req, res) =>  {
    res.json(req.file);
  })
  

module.exports = router;