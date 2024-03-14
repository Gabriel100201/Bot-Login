const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const {  getContainerInfo, startContainer, stopContainer, getAllImages } = require('./src/containers/helpers/api');
const { verifyToken, verifyTokenUser, loginUser } = require('./src/auth/helpers/api');

const app = express();
app.use(cors());
app.use(bodyParser.json())

const PORT = process.env.PORT || 3000

// Auth
app.post('/login', loginUser);
app.post('/verifyToken', verifyToken, verifyTokenUser);

// Para todas estas consultas se hace uso del midleware
app.use(verifyToken);

// Containers
app.get('/images', getAllImages);

app.post('/containers/getInfo', getContainerInfo);
app.post('/containers/start', startContainer);
app.post('/containers/stop', stopContainer);

app.listen(PORT, () => {
  console.log(`Servidor en funcionamiento en http://localhost:${PORT}`);
});
