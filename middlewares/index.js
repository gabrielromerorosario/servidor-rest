const  validarCampos  = require("../middlewares/validar-campos");
const  validarJWT  = require("../middlewares/validar-jwt");
const  validarRoles  = require("../middlewares/validar-rols");
const validarArchivo = require('./validar-archivo-upload')



module.exports = {
    ...validarCampos,
    ...validarJWT,
    ...validarRoles,
    ...validarArchivo

}