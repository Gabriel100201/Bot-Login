require('dotenv').config();
const { setNewUser, getUsers } = require('../../db');

const handleErrors = (res, errorMessage, statusCode = 500) => {
  console.log(errorMessage)
  res.status(statusCode).json({ error: errorMessage });
};

const createNewUser = async (req, res) => {
  const { userName, password, company, rol, imageId } = req.body

  if (!userName || !password || !company || !rol || !imageId) {
    return handleErrors(res, "Faltan datos obligatorios para crear un nuevo usuario", 400);
  }
  if (userName.length < 4) {
    return handleErrors(res, "El nombre de usuario debe tener al menos 4 caracteres", 400);
  }
  if (rol !== 'admin' && rol !== 'user') {
    return handleErrors(res, "El rol solo puede ser 'admin' o 'user'", 400);
  }

  try {
    const userCreated = await setNewUser({ userName, password, company, rol, imageId });
    if (userCreated) {
      res.json("Usuario creado con éxito");
    } else {
      handleErrors(res, "Error al crear un nuevo usuario", 401);
    }
  }
  catch (error) {
    if (error.type === 'not_unique') {
      handleErrors(res, "El nombre de usuario ya está en uso", 400);
    }
    else if (error.type === 'not_valid') {
      handleErrors(res, "Imagen no válida", 400)
    }
    else {
      console.log('Error al crear un nuevo usuario:', error);
      handleErrors(res, "Error al crear un nuevo usuario", 400);
    }
  }
}

const getAllUsers = async (req, res) => {
  try {
    let users = await getUsers();
    if (users) {
      users = users.map((user) => {
        return (
          user.dataValues
        )
      })
      res.json(users)
    }
    else {
      handleErrors(res, "Error al obtener todos los usuarios", 401)
    }
  }
  catch {
    handleErrors(res, "Error al obtener todos los usuarios", 401)
  }
}

module.exports = { createNewUser, getAllUsers }