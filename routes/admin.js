const router = require("express").Router();
const Anuncio = require("../controller/anuncios.controller");
const Usuarios = require("../controller/usuario.controller");
const { checkAdmin, saveUser } = require("../routes/middlewares");
const { checkPassword, createToken } = require("../routes/auth");
const { errorHandler, responseHandler } = require("./utils");

const axios = require('axios').default;

const qs = require('querystring');

const { User } = require("../controller/usuario.sequelize");

const usuariosRouter = require("./admin/usuariosRouter");
const anunciosRouter = require("./admin/anunciosRouter");
const app = require("../app");

router.use('/users', usuariosRouter);
router.use('/anuncios', anunciosRouter);

// Muestra la vista de login

router.get("/", async (req, res) => {

  res.clearCookie("user-token").render("login");
});


// Gestiona el Login

router.post('/check', async (req, res) => {
  const data = req.body
  const options = {
    method: 'POST',
    headers: { 'user-token': req.headers.authorization },
    data: {
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      rol: req.body.rol
    }
  }
  const response = await axios.post('http://localhost:3000/admin/login', options)
  //res.send('ok');
  //res.render('index');
  res.set({ 'user-token': req.headers['user-token'] }).send(response.data);
  //console.log(response);
});

router.post("/login", async (req, res) => {
if (!req.body.email || !req.body.password) {
    res.status(400).json({
      status: 400,
      message: 'No headers',
    })
    }
})



router.post("/adminLogin", async (req, res) => {

  try {
    const usuario = await User.findOne({
      where: {
        email: req.body.email,
      },
    });
    if (usuario) {
      const check = checkPassword(req.body.password, usuario.password);

      if (check) {
        res.status(200);
        req.headers.user_token = createToken(usuario.id, usuario.rol);
        req.headers.rol = usuario.rol;
        const response = responseHandler(req, res, "Login Correcto");
        usuario.rol === "Admin"
          ? res
            .cookie( 'Authorization', req.headers.user_token )
            .render("index", { user: usuario, token: req.headers.user_token })
          : res.json(response);
      } else {
        res.render("404");
        res.status(400);
        throw {
          message: "Usuario o email incorrecto",
        };
      }
    } else {
      res.status(404).render("404");
      throw {
        message: "Usuario o email incorrecto",
      };
    }
  } catch (error) {
    res.render("404");
    res.status(400);
    const message = error ? error : (error = error.message);
    res.json(errorHandler(req, res, message));
  }
});

router.post('/login', async (req, res) => {
  try {

    const usuario = await User.findOne({
      where: {
        email: req.body.email,
      },
    });

    if (usuario) {
      const check = checkPassword(req.body.password, usuario.password);

      if (check) {
         res.json({message: 'ok'});
      }
    }

  } catch (error) {
    res.status(400);
    const message = error ? error : (error = error.message);
    res.json(errorHandler(req, res, message));
  }
});

module.exports = router;
