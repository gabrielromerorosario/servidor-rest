const { response, request} = require("express");


const esAminRole = (req = request, res = response,next) => {
    if (!req.usuario) {
        return res.status(501).json({
           msg: `Se quiere verificar el role sin validar token primero`
        })
        
    }

    const {rol,nombre} = req.usuario;

    if (rol !== `ADMIN_ROLE`) {
        return res.status(401).json({
            msg: `${nombre} no es user adminitrador`
         })
    }

    next();
}

const tieneRole = (...roles) => {
    return (req = request, res = response,next) => {
        if (!req.usuario) {
            return res.status(501).json({
               msg: `Se quiere verificar el role sin validar token primero`
            })
            
        }

        if (!roles.includes(req.usuario.rol)) {
            return res.status(403).json({
                msg: 'No tienes permisos para realizar esta accion'
            })
            
        }

        next();
    }

}

module.exports = {
    esAminRole,
    tieneRole
}