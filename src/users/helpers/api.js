require('dotenv').config();
const { setNewUser } = require('../../db');

const handleErrors = (res, errorMessage, statusCode = 500) => {
  console.log(errorMessage)
  res.status(statusCode).json({ error: errorMessage });
};

const createNewUser = async (req, res) => {
  const { userName, password, company, rol, imageId } = req.body
  try {
    const userCreated = await setNewUser({ userName, password, company, rol, imageId });
    if (userCreated) {
      res.json("Usuario creado con éxito");
    } else {
      handleErrors(res, "Error al crear un nuevo usuario", 401);
    }
  }
  catch {
    handleErrors(res, "Error al crear un nuevo usuario", 401)
  }
}

module.exports = { createNewUser }