const { Router } = require(`express`);
const { getUsuario,
    putUsuario,
    postUsuario,
    deleUsuario,
    patchUsuario} = require("../controllers/usercontroller");

const router = Router();

router.get('/', getUsuario);

router.put('/:id', putUsuario);

router.post('/', postUsuario);

router.delete('/', deleUsuario);

router.patch('/', patchUsuario);



module.exports = router;