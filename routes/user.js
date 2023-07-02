const { Router } = require(`express`);
const { check } = require("express-validator");

const { validarCampos } = require("../middlewares/validar-campos");
const { validar_rol, validarEmail, validarId } = require("../helpers/db-validator");

const { getUsuario,
    putUsuario,
    postUsuario,
    deleUsuario,
    patchUsuario} = require("../controllers/usercontroller");



const router = Router();

router.get('/', getUsuario);

router.put('/:id',[
    check('id', `No es un id valido`).isMongoId(),
    check('id').custom(validarId),
    check('rol').custom(validar_rol),
    validarCampos
], putUsuario);

router.post('/',[
    check('nombre',`El nombre no es obligatorio`).not().isEmpty(),
    check('password',`El password no es valido`).isLength({min:6}),
    check('correo',`El correo no es valido`).isEmail(),
    check('correo').custom(validarEmail),
    //check('rol',`El correo no es valido`).isIn([`ADMIN_ROLE`,`USER_ROLE`]),
    check('rol').custom(validar_rol),
    validarCampos
], postUsuario);

router.delete('/', deleUsuario);

router.patch('/', patchUsuario);



module.exports = router;