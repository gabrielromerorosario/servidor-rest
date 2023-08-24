const { Router } = require(`express`);
const { check } = require("express-validator");

const { validarCampos, validarJWT, esAminRole } = require("../middlewares");0
const {  existeProductoPorID } = require("../helpers/db-validator");
const { crearProducto, obtenerProductos, obtenerProducto, actualizarProducto, borrarProducto } = require("../controllers/producto");


const router = Router()


//obtener una la categoria

router.get('/:id', [
    check('id', 'No es un Id de Mongo').isMongoId(),
    check('id').custom(existeProductoPorID),
    validarCampos
], obtenerProducto)


//obtener todas la categoria
router.get('/', obtenerProductos)




//Crear una categoria
router.post('/', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('categoria', 'No es id de Mongo').isMongoId(),
    check('categoria').custom(existeProductoPorID),
    validarCampos
], crearProducto)


// //actualizar una la categoria
router.put('/:id', [
    validarJWT,
    check('categoria', 'No es id de Mongo').isMongoId(),
    check('id').custom(existeProductoPorID),
    validarCampos
], actualizarProducto)

// //borrar una la categoria
router.delete('/:id',[
    validarJWT,
    esAminRole,
    check('id', 'No es un Id de Mongo').isMongoId(),
    check('id').custom(existeProductoPorID),
    validarCampos
], borrarProducto)



module.exports = router;