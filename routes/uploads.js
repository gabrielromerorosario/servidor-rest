const {Router} = require('express');
const { cargarArchivo, actualizarImagen } = require('../controllers/uploads');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares');
const { colleccionesPermitidas } = require('../helpers');


const router = Router();

router.post('/', cargarArchivo);
router.put('/:colleccion/:id', [
    validarArchivo,
    check('id','El id debe ser mongovalido').isMongoId(),
    check('colleccion').custom(c => colleccionesPermitidas(c,['usuarios','productos'])),
    validarCampos
],actualizarImagen);


module.exports = router;