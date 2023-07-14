const  validarCampos  = require("../middlewares/validar-campos");
const  validarJWT  = require("../middlewares/validar-jwt");
const  validarRoles  = require("../middlewares/validar-rols");



module.exports = {
    ...validarCampos,
    ...validarJWT,
    ...validarRoles

}