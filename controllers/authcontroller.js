const { response, request, json } = require("express");
const bcryptjs = require(`bcryptjs`)
const Usuario = require("../models/usuariodb");
const { generarJWT } = require("../helpers/generar-jwt");
const { googleVerify } = require("../helpers/google-verify");



const login = async (req,res = response) => {

    
    const {correo,password} = req.body;

    try {

        const usuario = await Usuario.findOne({correo})
        if (!usuario) {
            return res.status(400).json({
                message:"Usuario no existe / Password incorrecto - correo"
            })
            
        }
        if (!usuario.estado) {
            return res.status(400).json({
                message:"Usuario no existe / Password incorrecto - estatus"
            })
            
        }

        const validPassword = bcryptjs.compareSync(password,usuario.password);

        if (!validPassword) {
            return res.status(400).json({
                message:"Usuario no existe / Password incorrecto - pass"
            })
            
        }

        const token = await generarJWT(usuario.id);
        res.json({
            usuario,
            token
        })
        
    } catch (error) {
        return res.status(500).json({
            error:'something went wrong',
        })
        
    }

   
}

const googleSignin = async(req ,res = response,next) => {
    const {id_token } = req.body;

    try {

        const { correo,nombre,img } = await googleVerify(id_token);
        
        let usuario = await Usuario.findOne({correo});
                

        if(!usuario){

            const data = {
                nombre,
                correo,
                password : ':p',
                img,
                rol: 'ADMIN_ROLE',
                google: true
            };

            usuario = new Usuario(data)
                      
            usuario.save();
            
          

        }

        if(!usuario.estado){
            return res.status(401).json({
                msg: 'Usuario bloqueado'
            });
        }

        

        const token = await generarJWT(usuario.id);
        

        res.status(200).json({
            usuario,
            token
        });

        
    } catch (error) {
        res.status(400).json({
            ok: false,
            msg: 'El token no se pudo verficar'
        })
        
    }

    

}


module.exports = {
    login,
    googleSignin
}