require('dotenv').config();
const { setNewUser } = require('../../db');

const handleErrors = (res, errorMessage, statusCode = 500) => {
  console.log(errorMessage)
  res.status(statusCode).json({ error: errorMessage });
};

const createNewUser = async (req, res) => {
  const { userName, password, company, rol, imageId } = req.body
  try {
    setNewUser({ userName, password, company, rol, imageId })
    res.json("Usuario creado con éxito")
  }
  catch {
    handleErrors(res, "Error al crear un nuevo usuario", 401)
  }
}

module.exports = { createNewUser }