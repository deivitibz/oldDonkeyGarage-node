const router = require("express").Router();
const Usuarios = require("../../controller/usuario.controller");
const Anuncio = require('../../controller/anuncios.controller')
const {checkAdmin, saveUser} = require("../../routes/middlewares");


const { User } = require("../../controller/usuario.sequelize");

router.get("/", async (req, res) => {
  try {
      const result = await User.findAll()
      res
        .render("users", {usuarios: result});
    
  } catch (error) {
    res.json(error);
  }
});

router.get("/users", async (req, res) => {
  const result = await Usuarios.getAllUsers();
  res.render("users", {usuarios: result});
});

module.exports = router;
