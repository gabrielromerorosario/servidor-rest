const dbValidator = require('./db-validator');
const generarJWT = require('./generar-jwt');
const googleVerify = require('./google-verify');
const upload = require('./upload');


module.exports ={
    ...dbValidator,
    ...generarJWT,
    ...googleVerify,
    ...upload
}