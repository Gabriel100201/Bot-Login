require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const { users } = require('./src/db');

const app = express();
app.use(cors());

const PORT = process.env.PORT || 3000;
const SECRET_KEY = process.env.SECRET_KEY

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(403).json({ error: 'Token no proporcionado' });
  }

  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: 'Token inválido' });
    }

    req.user = decoded;
    next();
  });
};

app.use(bodyParser.json());

app.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Busca el usuario en la simulación de base de datos
  const user = users.find((user) => user.username === username);

  if (!user) {
    console.log("USUARIO NO ENCONTRADO")
    return res.status(401).json({ error: 'Usuario no encontrado' });
  }

  // Compara la contraseña proporcionada con la almacenada en la simulación de base de datos
  bcrypt.compare(password, user.password, (err, result) => {
    if (result) {
      // Genera un token JWT
      const token = jwt.sign({ userId: user.id, username: user.username }, SECRET_KEY, { expiresIn: '1h' });

      res.json({ message: 'Inicio de sesión exitoso', token });
    } else {
      console.log("CONTRASEÑA INCORRECTA")
      res.status(401).json({ error: 'Contraseña incorrecta' });
    }
  });
});

app.post('/verifyToken', verifyToken, (req, res) => {
  res.json({ valid: true, user: req.user });
});

app.listen(PORT, () => {
  console.log(`Servidor en funcionamiento en http://localhost:${PORT}`);
});
