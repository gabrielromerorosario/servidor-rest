const { response } = require("express");
const { Producto } = require('../models')


const actualizarProducto = async (req, res = response) => {

    try {

        const { id } = req.params;
        const { estado, usuario, ...data } = req.body;

        if (data.nombre) {
            data.nombre = data.nombre.toUpperCase();
            
        }

        data.usuario = req.usuario._id;

        const producto = await Producto.findByIdAndUpdate(id, data, { new: true });

        res.status(201).json(producto);



    } catch (error) {

        res.status(400).json({
            msg: `La categoria existe`
        })

    }
}

const borrarProducto = async (req, res = response) => {

    try {

        const { id } = req.params;

        const productoBorrado = await Producto.findByIdAndUpdate(id, { estado: false }, { new: true });

        res.status(201).json(productoBorrado);



    } catch (error) {

        res.status(400).json({
            msg: `La categoria existe`
        })

    }
}

const crearProducto = async (req, res = response) => {
    try {

        const {estado,usuario, ...body} = req.body;


        const productoDB = await Producto.findOne({ nombre: body.nombre });

        if (productoDB) {
            return res.status(400).json({
                msg: `El producto ${productoDB.nombre}, ya existe`
            });
        }

        const data = {
            ...body,
            nombre:body.nombre.toUpperCase(),
            usuario: req.usuario._id
        }

        const producto = new Producto(data);

        await producto.save();

        res.status(201).json(producto);

    } catch (error) {

        res.status(400).json({
            msg: `El producto existe`            
        })

        console.log(error)

    }
}

const obtenerProductos = async (req, res = response) => {

    const { limite = 5, desde = 0 } = req.query;
    const query = { estado: true }


    const [total, productos] = await Promise.all([
        Producto.countDocuments(query),
        Producto.find(query)
            .populate('usuario', 'nombre')
            .populate('categoria', 'nombre')
            .skip(Number(desde))
            .limit(Number(limite))
    ])
    res.json({
        total,
        productos
    });

}
const obtenerProducto = async (req, res = response) => {

    console.log(req.params)
    const { id } = req.params;
    const producto = await Producto.findById(id)
                            .populate('usuario', 'nombre')
                            .populate('categoria','nombre');

    res.json({

        producto
    });

}







module.exports = {
    actualizarProducto,
    borrarProducto,
    crearProducto,
    obtenerProductos,
    obtenerProducto
    
    
}