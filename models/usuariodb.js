const {Schema,model} = require(`mongoose`);

const UsuarioSchema = Schema({
    nombre:{
        type:String,
        required:[true,'El campo es obligatorio']
    },
    correo:{
        type: String,
        required: [true,`El campo es obligatorio`],
        unique: true,

    },
    password:{
        type:String,
        required:[true,`El campo es obligatorio`]
    },
    img:{
        type:String
    },
    rol:{
        type: String,
        required: true,
        enum : ['ADMIN_ROLE','USER_ROLE'],
    },
    estado:{
        type:Boolean,
        default:true
    },
    google:{
        type:Boolean,
        default: false
    }

});

UsuarioSchema.methods.toJSON = function(){
    const {__v, password, ...user_} = this.toObject();
    return user_
}

module.exports = model(`Usuario`,UsuarioSchema)