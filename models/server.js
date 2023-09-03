const express = require('express')
const cors = require('cors');
const { dbConnection } = require('../database/database');
const fileUpload = require('express-fileupload');

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        this.paths = {

            authPath: '/api/auth',
            buscar: '/api/buscar',
            categoria: '/api/categoria',
            producto: '/api/producto',
            userPath: '/api/user',
            uploads: '/api/uploads'
        }


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
    middlewares() {

        //Cors
        this.app.use(cors())
        //LEctura y parseo
        this.app.use(express.json());
        //Directorio publico
        this.app.use(express.static(`public`));

        this.app.use(fileUpload({
            useTempFiles: true,
            tempFileDir: '/tmp/',
            createParentPath: true
        }));



    }

    routes() {
        this.app.use(this.paths.authPath, require('../routes/auth'));
        this.app.use(this.paths.buscar, require('../routes/buscar'));
        this.app.use(this.paths.categoria, require('../routes/categorias'));
        this.app.use(this.paths.producto, require('../routes/productos'));
        this.app.use(this.paths.userPath, require('../routes/user'));
        this.app.use(this.paths.uploads, require('../routes/uploads'));

    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Servidor corriendo en puerto`, this.port)
        })
    }

}

module.exports = Server;