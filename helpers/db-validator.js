
const { Usuario, Categoria, Role, Producto } = require(`../models`);

const validar_rol = async (rol = "") => {
  const existeRole = await Role.findOne({ rol });
  if (!existeRole) {
    throw new Error(`El rol no existe`);
  }
};

const validarEmail = async (correo = '') => {

  const existEmail = await Usuario.findOne({ correo });

  if (existEmail) {

    throw new Error(`El correo ya esta registrado`)
  }
};

const validarId = async (id = '') => {

  const existusuariobyid = await Usuario.findById(id);

  if (!existusuariobyid) {

    throw new Error(`El id no esta registrado ${id}`)
  }
};


const existeCategoriaPorID = async (id = '') => {

  const existeCategoribyid = await Categoria.findById(id);

  if (!existeCategoribyid) {

    throw new Error(`El id de la categoria no esta registrado ${id}`)
  }
};

const existeProductoPorID = async (id = '') => {

  const existeProductobyid = await Producto.findById(id);
  
  if (!existeProductobyid) {

    throw new Error(`El id del producto no esta registrado ${id}`)
  }
};

const colleccionesPermitidas =  (coleccion = '',colecciones = []) => {
  const incluida = colecciones.includes(coleccion);
  if (!incluida) {
    throw new Error('La coleccion no esta permitida')
  }
  return true;
}


module.exports = {
  validar_rol,
  validarEmail,
  validarId,
  existeCategoriaPorID,
  existeProductoPorID,
  colleccionesPermitidas

};
