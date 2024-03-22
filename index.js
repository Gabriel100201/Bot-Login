const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const {  getContainerInfo, startContainer, stopContainer, getAllImages } = require('./src/containers/helpers/api');
const { verifyToken, verifyTokenUser, loginUser } = require('./src/auth/helpers/api');
const { createNewUser, getAllUsers } = require('./src/users/helpers/api');
const { syncDocker } = require('./src/sync');

const app = express();
app.use(bodyParser.json())

const corsOptions = {
  origin: '*'
}
app.use(cors(corsOptions))


const PORT = process.env.PORT || 3000

// Auth
app.post('/login', loginUser);
app.post('/verifyToken', verifyToken, verifyTokenUser);

// Para todas estas consultas se hace uso del midleware
app.use(verifyToken);

// Users
app.post('/createUser', createNewUser);
app.post('/getUsers', getAllUsers)

// Containers
app.post('/images', getAllImages);

app.post('/containers/getInfo', getContainerInfo);
app.post('/containers/start', startContainer);
app.post('/containers/stop', stopContainer);

app.listen(PORT, () => {
  syncDocker()
  console.log(`Servidor en funcionamiento en http://localhost:${PORT}`);
});
