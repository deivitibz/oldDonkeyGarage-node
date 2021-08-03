const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const app = express();
const { checkAdmin, saveUser } = require("./routes/middlewares");

const cors = require("cors");

// Cargamos las variables de entorno
require("dotenv").config();

// RUTAS APP
//const apiRouter = require("./routes/api");

// const apiV1Router = require('./routes/apiV1')

// const adminRouter = require("./routes/admin");

//require("./sequelize").connect();

//require('./mongoose').mongooseInit()

app.get("/", (req, res) => {
  console.log("asdf");
  res.json({ message: "ola k ase" });
});

// Creamos la conexión con la BD
//require("./db").connect();

// middlewares

app.use(cors());

// motor de vistas
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(logger("dev"));
app.use(express.json());
app.use(
  express.urlencoded({
    extended: false,
  })
);
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// INICIALIZACION DE MODULOS DE RUTAS
// app.use("/api", apiRouter);
// app.use("/api/v1", apiV1Router);
// app.use("/admin", adminRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  res.status(err.status || 500);
});

module.exports = app;
