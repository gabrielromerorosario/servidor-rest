const express = require('express')
const cors = require('cors');
const { dbConnection } = require('../database/database');

class Server{
    constructor(){
        this.app =  express();
        this.port = process.env.PORT;
        this.userPath = '/api/user';
        this.authPath = '/api/auth';
        
        //ConectionBD
        this.conectarDB();
        //middlewares
        this.middlewares();

        //Routes
        this.routes();
    }
    //Conexion a Base de Datos
    async conectarDB() {
        await dbConnection();
    }
    //middlewares
    middlewares(){

        //Cors
        this.app.use(cors())
        //LEctura y parseo
        this.app.use(express.json());
        //Directorio publico
        this.app.use(express.static(`public`));



    }

    routes(){
        this.app.use(this.authPath, require('../routes/auth'))
        this.app.use(this.userPath, require('../routes/user'))
        
    }

    listen(){
        this.app.listen(this.port, ()=>{
            console.log(`Servidor corriendo en puerto`, this.port)
        })
    }

}

module.exports = Server;