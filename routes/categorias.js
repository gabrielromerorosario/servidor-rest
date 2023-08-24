const { Router } = require(`express`);
const { check } = require("express-validator");

const { validarCampos, validarJWT, esAminRole } = require("../middlewares");
const { crearCategoria, obtenerCategorias, obtenerCategoria, actualizarCategoria, borrarCategoria } = require("../controllers/categoria");
const { existeCategoriaPorID } = require("../helpers/db-validator");


const router = Router()

//obtener todas la categoria
router.get('/', obtenerCategorias)


//obtener una la categoria
router.get('/:id', [
    check('id', 'No es un Id de Mongo').isMongoId(),
    check('id').custom(existeCategoriaPorID),
    validarCampos
], obtenerCategoria)

//Crear una categoria
router.post('/', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    validarCampos
], crearCategoria)


//actualizar una la categoria
router.put('/:id', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('id').custom(existeCategoriaPorID),
    validarCampos
], actualizarCategoria)

//borrar una la categoria
router.delete('/:id',[
    validarJWT,
    esAminRole,
    check('id', 'No es un Id de Mongo').isMongoId(),
    check('id').custom(existeCategoriaPorID),
    validarCampos
], borrarCategoria)



module.exports = router;
