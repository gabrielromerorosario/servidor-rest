const {response,request, json } = require(`express`);
const bcryptjs = require(`bcryptjs`);
const Usuario = require(`../models/usuariodb`);


const getUsuario = (req = request, res = response ) => {

    const query = req.query;   
    res.json({
        msg: `get api`,
        query
    });
}


const postUsuario = async (req, res = response ) => {
    const {nombre , correo , password , rol} = req.body;
    const usuario = new Usuario({nombre , correo , password , rol})

    //Verificar correo
   

    //Encriptar la password
    const salt = bcryptjs.genSaltSync()
    usuario.password = bcryptjs.hashSync(password)
    
    //Guardar DB
    await usuario.save()
    res.json({
        msg: `post api`,
        usuario
    });
}

const putUsuario = async(req, res = response ) => {
    const {id} = req.params;
    const {password,google, ...resto} = req.body;
    if (password) {
        const salt = bcryptjs.genSaltSync()
        resto.password = bcryptjs.hashSync(password)
        
    }

    const usuario = await Usuario.findByIdAndUpdate(id,resto)

    res.json({
        msg: `put api`,
        usuario
    });
}

const patchUsuario = (req, res = response ) => {
    res.json({
        msg: `patch api`
    });
}

const deleUsuario = (req, res = response ) => {
    res.json({
        msg: `delete api`
    });
}


module.exports = { 
    getUsuario,
    putUsuario,
    postUsuario,
    patchUsuario,
    deleUsuario,
}