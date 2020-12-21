const router = require("express").Router();
const Anuncio = require("../../controller/anuncios.controller");
const {checkAdmin,saveUser} = require('../../routes/middlewares')

router.get("/",  async (req, res) => {
    try {
        const result = await Anuncio.getAllAnuncios();
        res.cookie("user-token", req.headers.user_token, { expires: new Date(Date.now() + 600000)}).render("anuncios", {anuncios: result});
      } catch (error) {
         res.json(error);
      }
  });

  
module.exports = router;