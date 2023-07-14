const { response } = require("express")
const jwt = require(`jsonwebtoken`)
const Usuario = require("../models/usuariodb")


const validarJWT = async (req = response, res = response,next) => {

    const token = req.header(`x-token`)

    if (!token) {
        return res.status(401).json({
            msg: `No hay Token en la peticion`
        })
    }
    try {

        const {uid} = jwt.verify(token,process.env.SECRET_KEY_TOKEN);
        const usuario = await Usuario.findById(uid);
        

        if (!usuario) {
            return res.status(401).json({
                msg: `Token no valido-user`
            });
            
        }
        if (!usuario.estado) {
            return res.status(401).json({
                msg: `Token no valido-status`
            });            
            
        }
        req.usuario = usuario
        next();

        
    } catch (error) {
        res.status(401).json({
            msg: `Token no vlaido`
        });
        
    }

    
}

module.exports = {
    validarJWT
}