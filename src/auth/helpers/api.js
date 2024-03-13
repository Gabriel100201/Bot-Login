require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { users } = require('../../mock/users');

const SECRET_KEY = process.env.SECRET_KEY



const handleErrors = (res, errorMessage, statusCode = 500) => {
  res.status(statusCode).json({ error: errorMessage });
};

const loginUser = async (req, res) => {
  const { username, password } = req.body;

  const user = users.find((user) => user.username === username);

  if (!user) {
    console.log("USUARIO NO ENCONTRADO")
    return handleErrors(res, 'Usuario no encontrado', 401);
  }

  try {
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (passwordMatch) {
      // Se genera el token
      const token = jwt.sign({ userId: user.id, username: user.username }, SECRET_KEY, { expiresIn: '1h' });
      const dockerId = user.bot
      res.json({ message: 'Inicio de sesión exitoso', token, dockerId });
    } else {
      console.log("CONTRASEÑA INCORRECTA")
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
      console.log(err)
      return handleErrors(res, 'Token no válido', 401);
    }

    req.user = decoded;
    next();
  });
};

module.exports = { verifyToken, verifyTokenUser, loginUser }