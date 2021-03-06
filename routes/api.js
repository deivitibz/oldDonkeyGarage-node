const router = require("express").Router();

const {checkToken} = require("./middlewares");

const apiUploadRouter = require("./api/upload");
const apiUsuariosRouter = require("./api/usuarios");
const apiAnunciosRouter = require("./api/anuncios");
const apiNoticiasRouter = require("./api/noticias");
const apiMotosRouter = require("./api/motocicletas");
const apiTutorialesRouter = require("./api/tutoriales");

router.use("/upload", apiUploadRouter);
router.use("/noticias", apiNoticiasRouter);
//router.use("/usuarios", apiUsuariosRouter);
router.use("/anuncios", apiAnunciosRouter);
router.use("/motos", checkToken, apiMotosRouter);
router.use("/tutoriales", apiTutorialesRouter);

module.exports = router;
