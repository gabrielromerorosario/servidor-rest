const { Router } = require('express');
const { cargarArchivo, actualizarImagen, mostrarImage, actualizarImagenCloudinary } = require('../controllers/uploads');
const { check } = require('express-validator');
const { validarCampos, validarArchivo } = require('../middlewares');
const { colleccionesPermitidas } = require('../helpers');


const router = Router();

router.post('/', cargarArchivo);


router.put('/:colleccion/:id', [
    validarArchivo,
    check('id', 'El id debe ser mongovalido').isMongoId(),
    check('colleccion').custom(c => colleccionesPermitidas(c, ['usuarios', 'productos'])),
    validarCampos
    ],actualizarImagenCloudinary)
// ], actualizarImagen);

router.get('/:colleccion/:id', [
    check('id', 'El id debe ser mongovalido').isMongoId(),
    check('colleccion').custom(c => colleccionesPermitidas(c, ['usuarios', 'productos'])),
    validarCampos
],mostrarImage)


module.exports = router;