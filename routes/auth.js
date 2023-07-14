const { Router } = require(`express`);
const { check } = require("express-validator");
const { login, googleSignin } = require("../controllers/authcontroller");
const { validarCampos } = require("../middlewares/validar-campos");


const router = Router()

router.post('/login',[
    check('correo','El correo es obligatorio').isEmail(),
    check('password','La clave es obligatoria').not().isEmpty(),
    validarCampos
],login)

router.post('/google',[
    check('id_token','Token de Google obligatorio').not().isEmpty(),
    validarCampos
],googleSignin)

module.exports = router;
