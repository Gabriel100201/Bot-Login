require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { userExist, getUserByName, updateUserToken } = require('../../db');
const SECRET_KEY = process.env.SECRET_KEY

const handleErrors = (res, errorMessage, statusCode = 500) => {
  console.log(errorMessage)
  res.status(statusCode).json({ error: errorMessage });
};

const loginUser = async (req, res) => {
  const { username, password } = req.body;

  if (!userExist({ userName: username })) return handleErrors(res, 'Usuario no encontrado', 401);
  let userInfo = await getUserByName({ userName: username })
  userInfo = userInfo.dataValues
  
  try {
    const passwordMatch = await bcrypt.compare(password, userInfo.password);

    if (passwordMatch) {
      const token = jwt.sign({ userId: userInfo.id, username: userInfo.username }, SECRET_KEY, { expiresIn: '1h' });
      updateUserToken({ userId: userInfo.id, newActiveToken: token })

      res.json({ message: 'Inicio de sesión exitoso', token, userInfo: { userName: userInfo.userName } });
    } else {
      handleErrors(res, 'Contraseña incorrecta', 401);
    }
  } catch (error) {
    console.log(error)
    handleErrors(res, 'Error al comparar contraseñas', 500);
  }
};

const verifyTokenUser = (req, res) => {
  res.json({ valid: true, user: req.user });
};

// Middleware para verificar el token
const verifyToken = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) {
    return handleErrors(res, 'Token no proporcionado', 401);
  }

  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) {
      return handleErrors(res, 'Token no válido', 401);
    }

    req.user = decoded;
    next();
  });
};

module.exports = { verifyToken, verifyTokenUser, loginUser }