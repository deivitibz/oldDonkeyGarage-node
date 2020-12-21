const express = require("express");
const router = express.Router();
const Anuncio = require("../../controller/anuncios.controller");
const {checkToken} = require("../middlewares");

const {User} = require("../../controller/usuario.sequelize");

const multer = require("multer");
const {response} = require("../../app");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
const options = {
  storage: storage,
};

const upload = multer(options);

const responseData = {
  status: 200,
  data: {},
};

// GET http://localhost:3000/api/anuncios
// obtener todos los anuncios
router.get("/", (req, res) => {
  Anuncio.getAllAnuncios()
    .then((rows) => {
      res.json(rows);
    })
    .catch((err) => {
      res.json({
        error: err.message,
      });
    });
});

// GET http://localhost:3000/api/anuncios/:id
// obtener un anuncio
router.get("/:id", async (req, res) => {
  const anuncio = await Anuncio.getById(req.params.id);
  res.json(anuncio[0]);
});

// Obtiene todos los anuncios de un unico usuario
router.get("/getbyuser/:id", checkToken, async (req, res) => {
  const anuncio = await Anuncio.getByUserId(req.params.id);
  res.json(anuncio);
});

// Obtiene los anuncios por categoria
router.get("/getbycategoria/:categoria", async (req, res) => {
  const resultado = await Anuncio.getByCategory(req.params.categoria);
  res.json(resultado);
});

// POST http://localhost:3000/api/anuncios
// crear usuario
router.post("/", async (req, res) => {
  try {
    const result = await Anuncio.create(req.body);
    responseData.data = result;
    if (result["affectedRows"] === 1) {
      //res.json({success: "Se a creado un anuncio"});
      res.redirect("/admin/anuncios");
    }
  } catch (e) {
    responseData.status = "";

    res.redirect("back");
    //res.json({error: e});
  }
});

// PUT http://localhost:3000/api/anuncios/:id
// editar anuncio
router.put("/:id", checkToken, async (req, res) => {
  const result = await Anuncio.updateById(req.params.id, req.body);
  console.log(req.body);

  if (result["affectedRows"] === 1) {
    res.json({success: "Anuncio actualizado correctamente"});
  } else {
    res.json({error: "algo has liado"});
  }
});

// DELETE http://localhost:3000/api/anuncios
// borrar anuncio
router.delete("/:id", checkToken, async (req, res) => {
  const anuncio = await Anuncio.getById(req.params.id);
  console.log(anuncio);
  const result = await Anuncio.deleteById(req.params.id, req.body);
  if (result["affectedRows"] === 1) {
    res.json({success: "Se ha eliminado el anuncio"});
  } else {
    res.json({error: "algo has liado"});
  }
});

router.post("/upload", upload.single("imagen_id"), (req, res) => {
  console.log(req.body);
  res.json({message: "ok"});
});

router.get("/api", (req, res) => {});

module.exports = router;
