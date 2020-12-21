const jwt = require("jsonwebtoken");
const moment = require("moment");
const Usuario = require("../controller/usuario.controller");
const {User} = require("../controller/usuario.sequelize");

const checkToken = (req, res, next) => {
  if (!req.headers["user-token"]) {
    res.status(401);
    return res.json({
      error: "Debes incluir el token",
      error_type: "noToken",
    });
  }

  const userToken = req.headers["user-token"];
  let payload = {};
  try {
    payload = jwt.verify(userToken, process.env.SECRET_KEY);
    //console.log(payload);
  } catch (err) {
    console.log(err.message);
    res.status(401);
    return res.json({
      error: "El token no es correcto",
      error_type: "errorToken",
      message: err.message,
    });
  }

  const fechaActual = moment().unix();
  if (fechaActual > payload.expiredAt) {
    console.log("token caducado");
    res.status(401);
    return res.json({
      error: "El token esta caducado",
      error_type: "caducadoToken",
    });
  }

  req.payload = payload;
  next();
};

const isAdmin = async (req, res, next) => {
  const usuario = await Usuario.getByUser(req.payload.userId);
  res.status(401);
  next();
};

const checkAdmin = async (req, res, next) => {
  try {
    const usuario = await User.findOne({
      where: {
        email: req.body.email,
      },
    });
    if(usuario.rol !== 'Admin'){
      res.status(400);
      throw {
        message: 'No autorizado'
      }
    } else {
      res.status(200);
      next();
    }
  } catch (error) {
     res.json(error);
  }

  

};

const saveUser = async (req, res, next) => {
  const usuario = await User.findOne({
    where: {
      email: req.body.email
    }
  })
  req.payload = usuario
  next();
}

const respnseHandler = (req, res) => {
  return {
    body: req.body,
    headers: req.headers,
  };
};

module.exports = {
  checkToken,
  checkAdmin,
  saveUser
};
