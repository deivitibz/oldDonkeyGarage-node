const router = require("express").Router();
const bcrypt = require("bcryptjs");
const uuidv4 = require("uuid");

const { firebase, firebaseInit } = require('../../firebase')


const {checkToken,saveUser} = require("../middlewares");
const {errorHandler, responseHandler} = require("../utils");
const {checkPassword, createToken, hashPwd} = require("../auth");

const uuidv4 = require("uuid");

//const Usuario = require("../../controller/usuario.controller");
const { User } = require("../../controller/usuario.sequelize");

firebaseInit();
const database = firebase.database();

console.log();

router.get("/getToken", (req, res) => {
    const token = createToken(1, "Admin");
    res.json(token);
  });




// recibir todos los usuarios
  router.get("/",  async (req, res) => {
  try {
    const rows = await User.findAll();
    res.json(rows);
  } catch (error) {}
});

// Buscar usuario por id
router.get("/:id",  async (req, res) => {
  const id = parseInt(req.params.id);
  const user = await User.findByPk(id);
  res.json(user);
});

router.post('/create', async (req, res) => {
  try {
    req.body.password = hashPwd(req.body.password);
    const response = await User.create(req.body);
     res.json(response);
  } catch (error) {
     res.json(error);
  }
});


// login de usuario y renderizar vista en pug
router.post("/", async (req, res) => {

  try {
    req.body.password = bcrypt.hashSync(req.body.password, 10);
    req.body.rol === "" || !req.body.rol
      ? (req.body.rol = "Usuario")
      : (req.body.rol = req.body.rol);

    req.body.rol === "Usuario" ||
    req.body.rol === "Admin" ||
    req.body.rol === "Constructor"
      ? (req.body.rol = req.body.rol)
      : errorHandler(req, res, "El rol especificado no existe");

    const userFind = await User.findOne({
      where: {
        email: req.body.email,
      },
    });

    if (!userFind) {
      //await User.create(req.body);
      //res.status(201);
      //const response = responseHandler(req, res, "Usuario creado correctamente");
      res.render('index');
      //res.json(response);
    } else {
        res.status(400);
         res.json({
             message: 'Email incorrecto',
             body: req.body,
             headers: req.headers
         });
    }
  } catch (error) {
    res.status(400);
    const message = error ? error : (error = error.message);
    res.json(message);
  }
});

// añadir un nuevo usuario a la base de datos
router.post('/register', async (req, res) => {
  try {
    const userFind = await User.findOne({
      where: {
        email: req.body.email
      }
    })

    if(userFind){
       res.json({message: 'el usuario ya existe'});
    } else {
      req.body.password = bcrypt.hashSync(req.body.password, 10);
      req.body.role = req.body.role ? req.body.role : 'Usuario'
      const result = await User.create(req.body)
       res.json({message: 'usuario creado correctamente', data: result});
    }

  } catch (error) {

  }
});

router.post('/login', async (req, res) => {
  try {
    const userLogin = await User.findOne({
      where: { email: req.body.email }
    })
    if(!userLogin){
       res.json({message: 'Usuario o contraseña incorrecta',login: false});
    } else {
      const response = checkPassword(req.body.password, userLogin.password)
      if(!response){
         res.json({message: 'Usuario o contraseña incorrecta',login: false});
      } else {
         res.json({message: 'login correcto', login: true, token: createToken(userLogin.id, userLogin.rol)});
      }
    }

  } catch (error) {

  }
});

router.put('/:id', async (req,res)=> {
  const id = parseInt(req.params.id);
  try {
    const response = await User.update(req.body, {
      where: {
        id: id
      }
    });
    res.json(response)
  } catch (error) {
    res.json(error)
  }
});


module.exports = {router};
