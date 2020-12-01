const router = require("express").Router();
const Anuncio = require("../controller/anuncios.controller");
const Usuarios = require("../controller/usuario.controller");

router.get("/", (req, res) => {
  res.render("index");
});

router.get("/anuncios", async (req, res) => {
  const result = await Anuncio.getAllAnuncios();
  res.render("anuncios", {anuncios: result});
});

router.get("/users", async (req, res) => {
  const result = await Usuarios.getAllUsers();
  res.render("users", {usuarios: result});
});


module.exports = router;
