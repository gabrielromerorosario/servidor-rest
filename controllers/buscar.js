const { response, request } = require("express");
const { ObjectId } = require('mongoose').Types;

const { Usuario, Categoria, Producto } = require('../models')
const collecionespermitida = [
    'usuarios',
    'categorias',
    'productos',
    "rol"
]

const buscarUsuario = async (termino = '', res = response) => {
    const mongoID = ObjectId.isValid(termino);
    if (mongoID) {
        const usuario = await Usuario.findById(termino)

        res.json({
            results: (usuario) ? [usuario] : []
        })

    }

    const regex = new RegExp(termino, 'i');

    const usuarios = await Usuario.find({
        $or: [{ nombre: regex }, { correo: regex }],
        $and: [{ estado: true }]
    })

    res.json({
        results: usuarios
    })
}



const buscarCategoria = async (termino = '', res = response) => {

    const mongoID = ObjectId.isValid(termino);

    if (mongoID) {
        const categoriaDB = await Categoria.findById(termino)

        res.json({
            results: (categoriaDB) ? [categoriaDB] : []
        })

    }

    const regex = new RegExp(termino, 'i');

    const categoriaDB = await Categoria.find({ nombre: regex,estado: true })

    res.json({
        results: categoriaDB
    })
}


const buscarProducto = async (termino = '', res = response) => {
    const mongoID = ObjectId.isValid(termino);
    if (mongoID) {
        const producto = await Producto.findById(termino)
                            .populate('categoria','nombre')

        res.json({
            results: (producto) ? [producto] : []
        })

    }

    const regex = new RegExp(termino, 'i');

    const producto = await Producto.find({ nombre: regex ,estado: true })
                                .populate('categoria','nombre')

    res.json({
        results: producto
    })
}


const buscar = (req = request, res = response) => {

    const { coleccion, termino } = req.params;

    if (!collecionespermitida.includes(coleccion)) {
        return res.status(400).json({
            msg: `${coleccion} no es una de la coleciones permitida`
        })

    }

    switch (coleccion) {
        case 'usuarios':
            buscarUsuario(termino, res);

        break;

        case 'categorias':

            buscarCategoria(termino, res);

        break;

        case 'productos':

            buscarProducto(termino, res);

        break;


        default:
            res.status(500).json({
                msg: 'Se le olvido hacer esta busqueda'
            })
        break;
    }


}

module.exports = {
    buscar
}