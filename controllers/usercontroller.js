const {response,request, json } = require(`express`);
const bcryptjs = require(`bcryptjs`);
const Usuario = require(`../models/usuariodb`);


const getUsuario = async(req = request, res = response ) => {

    const {limite = 5,desde = 0} = req.query;  
    const query = {estado: true}

    // const usuarios = await Usuario.find()
    //     .skip(Number(desde))
    //     .limit(Number(limite));
    // const total = await Usuario.countDocuments();

    const [total,usuarios] = await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query)
        .skip(Number(desde))
        .limit(Number(limite))
    ])
    res.json({
        total,
        usuarios
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

const deleUsuario = async(req, res = response ) => {

    const {id} = req.params;
    //const usuarioo = await Usuario.findByIdAndDelete(id)
    const usuario = await Usuario.findByIdAndUpdate(id,{estado:false})
    const userverificado = req.usuario;
    res.json({usuario,userverificado});
}


module.exports = { 
    getUsuario,
    putUsuario,
    postUsuario,
    patchUsuario,
    deleUsuario,
}