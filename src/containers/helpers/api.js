const Docker = require('dockerode');
const docker = new Docker();

// Función auxiliar para manejar errores
const handleErrors = (res, errorMessage, statusCode = 500) => {
  res.status(statusCode).json({ error: errorMessage });
};

// Obtener la lista de todas las imagenes
const getAllImages = async (req, res) => {
  try {
    const images = await docker.listImages();
    res.json(images);
  } catch (error) {
    handleErrors(res, 'Error al obtener la lista de contenedores');
  }
};

// Obtener la lista de todos los contenedores
const getAllContainers = async (req, res) => {
  try {
    const containers = await docker.listContainers();
    res.json(containers);
  } catch (error) {
    handleErrors(res, 'Error al obtener la lista de contenedores');
  }
};

// Obtener información sobre un contenedor específico
const getContainerInfo = async (req, res) => {
  const containerId = req.params.id;
  try {
    const container = await docker.getContainer(containerId).inspect();
    res.json(container);
  } catch (error) {
    handleErrors(res, 'Contenedor no encontrado', 404);
  }
};

// Iniciar un contenedor
const startContainer = async (req, res) => {
  const imageId = req.params.id;
  try {
    const container = await docker.createContainer({
      Image: imageId,
      Tty: true,
    });

    await container.start();
    const containerInfo = await container.inspect();
    const containerId = containerInfo.Id

    res.json({ message: 'Contenedor iniciado con éxito' , containerId});
  } catch (error) {
    handleErrors(res, 'Error al iniciar el contenedor');
  }
};

// Detener un contenedor
const stopContainer = async (req, res) => {
  const containerId = req.params.id;
  try {
    const container = docker.getContainer(containerId);
    await container.kill();
    res.json({ message: 'Contenedor detenido con éxito' });
  } catch (error) {
    handleErrors(res, 'Error al detener el contenedor');
  }
};

module.exports = { getAllContainers, getContainerInfo, startContainer, stopContainer, getAllImages }