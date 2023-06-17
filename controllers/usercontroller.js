const {response,request } = require(`express`)

 

const getUsuario = (req = request, res = response ) => {

    const query = req.query;   
    res.json({
        msg: `get api`,
        query
    });
}


const postUsuario = (req, res = response ) => {
    const body = req.body;
    res.json({
        msg: `post api`,
        body
    });
}

const putUsuario = (req, res = response ) => {
    const {id} = req.params;
    res.json({
        msg: `put api`,
        id
    });
}

const patchUsuario = (req, res = response ) => {
    res.json({
        msg: `patch api`
    });
}

const deleUsuario = (req, res = response ) => {
    res.json({
        msg: `delete api`
    });
}


module.exports = { 
    getUsuario,
    putUsuario,
    postUsuario,
    patchUsuario,
    deleUsuario,
}