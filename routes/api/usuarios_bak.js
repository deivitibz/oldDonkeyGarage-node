const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const moment = require("moment");
const {checkToken} = require("../middlewares");

//import { v4 as uuidv4 } from 'uuid';

const uuidv4 = require('uuid')

const Usuario = require("../../controller/usuario.controller");
const {User} = require("../../controller/usuario.sequelize");

// TODO: registrar usuario

router.post("/registro", async (req, res) => {
  let emailCheck = req.body.email;
  let getEmail = await Usuario.getByEmail(emailCheck);
  if (getEmail !== null) {
    res.json({error: "El email ya existe en la base de datos"});
  } else {
    req.body.password = bcrypt.hashSync(req.body.password, 10);
    const result = await Usuario.create(req.body);
    if (result["affectedRows"] === 1) {
      res.json({success: "Registro Correcto"});
    } else {
      res.json({error: "Error en el registro"});
    }
    res.json(req.body);
  }
});

// TODO: loguear usuario

router.post("/login", async (req, res) => {
  try {
    const usuario = await Usuario.getByEmail(req.body.email);
    const check = checkPassword(req.body.password, usuario.password);
    if (check) {
      res.json({
        success: "Login correcto",
        rol: usuario.rol,
        token: createToken(usuario.id, usuario.rol),
      });
    } else {
      res.status(400);
      res.json(value);
    }
  } catch (e) {
    res.status(400);
    res.json({message: e.message, stack: e.stack});
  }

  /*   if (usuario) {
    const iguales = bcrypt.compareSync(req.body.password, usuario.password);
    if (iguales) {
      res.json({
        success: "Login correcto",
        rol: usuario.rol,
        token: createToken(usuario.id, usuario.rol),
      });
    } else {
      res.json({error: "Error en email y/o password"});
    }
  } else {
    res.json({error: "Error en email y/o password"});
  } */
});

router.get("/getToken", (req, res) => {
  const token = createToken(1, "Admin");
  res.json(token);
  // console.log(req.headers['user-token']);
  // res.json(req.payload);
});

// function createToken(userId) {
//     const payload = {
//         userId: userId,
//         createdAt: moment().unix(),
//         expiredAt: moment().add(15, 'minutes').unix()
//     }
//     return jwt.sign(payload, process.env.SECRET_KEY)
// }

function checkPassword(bodyPass, dbPass) {
  return bcrypt.compareSync(bodyPass, dbPass);
}

function createToken(userId, role) {
  const payload = {
    userId: userId,
    role: role,
    createdAt: moment().unix(),
    expiredAt: moment().add(60, "minutes").unix(),
  };
  return jwt.sign(payload, process.env.SECRET_KEY);
}

// GET http://localhost:3000/api/usuarios
// obtener todos los usuarios
/* router.get('/', checkToken, async (req, res) => {
    const rows = await Usuario.getAllUsers();
    res.json(rows);
}); */

router.get("/", checkToken, async (req, res) => {
  try {
    const rows = await User.findAll();
    res.json(rows);
  } catch (error) {}
});

router.get("/:id", checkToken, async (req, res) => {
  /* const user = await Usuario.getByUser(req.params.id);
  res.json(user); */
  const id = parseInt(req.params.id);
  const user = await User.findByPk(id);
  res.json(user);
});

// POST http://localhost:3000/api/usuarios
// crear usuario
router.post("/", checkToken, async (req, res) => {
  try {
    req.body.password = bcrypt.hashSync(req.body.password, 10);
    req.body._id = uuidv4.v4();
    req.body.rol === "" || !req.body.rol
      ? (req.body.rol = "Usuario")
      : (req.body.rol = req.body.rol);

    req.body.rol === "Usuario" ||
    req.body.rol === "Admin" ||
    req.body.rol === "Constructor"
      ? (req.body.rol = req.body.rol)
      : errorHandler(req, res, "El rol especificado no existe");

    await User.create(req.body);
    res.status(201);
    responseHandler(req, res, "Usuario creado correctamente");
    //res.json(responseHandler(req, res, result));
  } catch (error) {
    res.json(error);
  }
});

// PUT http://localhost:3000/api/usuarios
// editar usuario
router.put("/:id", checkToken, async (req, res) => {
  req.body.password = bcrypt.hashSync(req.body.password, 10);
  const result = await Usuario.updateById(req.params.id, req.body);
  if (result["affectedRows"] === 1) {
    res.json({success: "Actualización de usuario", data: req.body});
  } else {
    res.json({error: "algo has liado", data: req.body});
  }
});

router.put("/update/:id", checkToken, async (req, res) => {
  const result = await Usuario.updatePerfil(req.params.id, req.body);
  if (result["affectedRows"] === 1) {
    res.json({success: "Actualización de usuario", data: req.body});
  } else {
    res.json({error: "algo has liado", data: req.body});
  }
});

// DELETE http://localhost:3000/api/usuarios
// borrar usuario
router.delete("/:id", checkToken, async (req, res) => {
  const result = await Usuario.deleteById(req.params.id);
  console.log(result);
  if (result["affectedRows"] === 1) {
    res.json({success: "Se ha eliminado el usuario"});
  } else {
    res.json({error: "algo has liado"});
  }
});

function responseHandler(req, res, message) {
  res.status(201);
  res.json({
    status: 201,
    data: {
      message: message,
      body: req.body,
      headers: req.headers,
    },
  });
}

function errorHandler(req, res, message) {
  res.status(404);

  const error = new Error(message);

  throw {
    status: 404,
    error: error,
    body: req.body,
    headers: req.headers,
  };
}

module.exports = router;
