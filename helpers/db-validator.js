const Role = require(`../models/rol`);
const Usuario = require(`../models/usuariodb`);

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

  const existusuariobyid= await Usuario.findById(id );

  if (!existusuariobyid) {

    throw new Error(`El id no esta registrado ${id}`)
  }
};

module.exports = {
  validar_rol,
  validarEmail,
  validarId,
};
