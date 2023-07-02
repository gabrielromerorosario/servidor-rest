const {Schema,model} = require(`mongoose`)

const RoleSchema = Schema({
    rol:{
        type:String,
        required:[true,'El campo Rol es requerido']
    }
});


module.exports = model('rols', RoleSchema)