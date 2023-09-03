const path = require('path');
const {v4: uuid} = require('uuid')


const upload = (files, extValida = ['png', 'jpg', 'jpeg', 'gif'],carpeta='') => {

    return new Promise((resolve, reject) => {
        const { archivo } = files;

        const nombrecort = archivo.name.split('.');
        const extension = nombrecort[nombrecort.length - 1];


        if (!extValida.includes(extension)) {
            return reject('Extension no permitida')

        }


        const nombreTemp = uuid() + '.' + extension

        const uploadPath = path.join(__dirname, '../uploads/',carpeta, nombreTemp);

        archivo.mv(uploadPath, (err) => {
            if (err) {
                return reject(err)
            }

           resolve(nombreTemp );
        });
    })
}

module.exports = {
    upload
}