const { response, request } = require("express");
const { upload } = require("../helpers/");
const { Usuario, Producto } = require("../models");
const path = require('path');
const fs = require('fs')
const cloudinary = require('cloudinary').v2
cloudinary.config(process.env.CLOUDINARY_URL)


const cargarArchivo = async (req, res = response) => {


    if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo) {
        res.status(400).json({ msg: 'No files were uploaded.' });
        return;
    }

    try {

        // const pathCompleto = await upload(req.files,['txt','md'],'textos');
        const pathCompleto = await upload(req.files, undefined, 'imgs');
        res.status(200).json({
            path: pathCompleto
        })

    } catch (msg) {

        res.status(400).json({
            msg
        })

    }



}

const actualizarImagen = async (req = request, res = response) => {

    const { colleccion, id } = req.params;

    let modelo;

    switch (colleccion) {
        case 'usuarios':
            modelo = await Usuario.findById(id);
            if (!modelo) {
                return res.status(400).json({
                    msg: `No existe un usuario con el id ${id}`
                });
            }

            break;

        case 'productos':
            modelo = await Producto.findById(id);
            if (!modelo) {
                return res.status(400).json({
                    msg: `No existe un producto con el id ${id}`
                });
            }

            break;

        default:
            return res.status(500).json({ msg: 'Se me olvidó validar esto' });
    }


    // Limpiar imágenes previas
    if (modelo.img) {
        // Hay que borrar la imagen del servidor
        const pathImagen = path.join(__dirname, '../uploads', colleccion, modelo.img);
        if (fs.existsSync(pathImagen)) {
            fs.unlinkSync(pathImagen);
        }
    }


    const nombre = await upload(req.files, undefined, colleccion);
    modelo.img = nombre;

    await modelo.save();


    res.json(modelo);

}
const actualizarImagenCloudinary = async (req = request, res = response) => {

    const { colleccion, id } = req.params;

    let modelo;

    switch (colleccion) {
        case 'usuarios':
            modelo = await Usuario.findById(id);
            if (!modelo) {
                return res.status(400).json({
                    msg: `No existe un usuario con el id ${id}`
                });
            }

            break;

        case 'productos':
            modelo = await Producto.findById(id);
            if (!modelo) {
                return res.status(400).json({
                    msg: `No existe un producto con el id ${id}`
                });
            }

            break;

        default:
            return res.status(500).json({ msg: 'Se me olvidó validar esto' });
    }


    // Limpiar imágenes previas
    if (modelo.img) {
        const nombreArr = modelo.img.split('/');
        const nombre = nombreArr[nombreArr.length - 1];
        const { public_id } = nombre.split('.');
        cloudinary.uploader.destroy(public_id);
    }

    const { tempFilePath } = req.files.archivo;
    const { secure_url } = await cloudinary.uploader.upload(tempFilePath)
    modelo.img = secure_url

    await modelo.save();

    res.json(modelo);

    // const nombre = await upload(req.files, undefined, colleccion);
    // modelo.img = nombre;

    // await modelo.save();


    // res.json(modelo);

}

const mostrarImage = async (req, res = response) => {

    const { colleccion, id } = req.params;

    let modelo;

    switch (colleccion) {
        case 'usuarios':
            modelo = await Usuario.findById(id);
            if (!modelo) {
                return res.status(400).json({
                    msg: `No existe un usuario con el id ${id}`
                });
            }

            break;

        case 'productos':
            modelo = await Producto.findById(id);
            if (!modelo) {
                return res.status(400).json({
                    msg: `No existe un producto con el id ${id}`
                });
            }

            break;

        default:
            return res.status(500).json({ msg: 'Se me olvidó validar esto' });
    }


    // Limpiar imágenes previas
    if (modelo.img) {
        // Hay que borrar la imagen del servidor
        const pathImagen = path.join(__dirname, '../uploads', colleccion, modelo.img);
        if (fs.existsSync(pathImagen)) {
            return res.sendFile(pathImagen);
        }
    }

    const pathImagen = path.join(__dirname, '../assets/no-image.jpg');
    res.sendFile(pathImagen)
}





module.exports = {
    cargarArchivo,
    actualizarImagen,
    mostrarImage,
    actualizarImagenCloudinary
}