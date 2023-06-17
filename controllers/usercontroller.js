const {response } = require(`express`)

 

const getUsuario = (req, res = response ) => {
    res.json({
        msg: `get api`
    });
}

const putUsuario = (req, res = response ) => {
    res.json({
        msg: `put api`
    });
}

const postUsuario = (req, res = response ) => {
    res.json({
        msg: `post api`
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