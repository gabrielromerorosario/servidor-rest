const express = require('express')

class Server{
    constructor(){

        this.app =  express();
        this.port = process.env.PORT;

        this.middlewares();

        this.routes();
    }
    //middlewares
    middlewares(){
        this.app.use(express.static(`public`));

    }

    routes(){
        this.app.get('/api', (req, res) => {
            res.json({
                msg: `get api`
            });
            
        });

        this.app.put('/api', (req, res) => {
            res.json({
                msg: `put api`
            });
            
        });

        this.app.post('/api', (req, res) => {
            res.json({
                msg: `post api`
            });
            
        });

        this.app.delete('/api', (req, res) => {
            res.json({
                msg: `delete api`
            });
            
        });

        this.app.patch('/api', (req, res) => {
            res.json({
                msg: `patch api`
            });
            
        });
    }

    listen(){
        this.app.listen(this.port, ()=>{
            console.log(`Servidor corriendo en puerto`, this.port)
        })
    }

}

module.exports = Server;