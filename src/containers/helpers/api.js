const Docker = require('dockerode');
const docker = new Docker();
const { getImageByToken, setBotStatusByImageId, getImages } = require('../../db/index');

// Función auxiliar para manejar errores
const handleErrors = (res, errorMessage, statusCode = 500) => {
  res.status(statusCode).json({ error: errorMessage });
};

// Obtener la lista de todas las imagenes
const getAllImages = async (req, res) => {
  try {
    const images = await getImages();
    res.json(images);
  } catch (error) {
    handleErrors(res, 'Error al obtener la lista de contenedores');
  }
};

const getImageId = async (req, res) => {
  const { name } = req.body
  try {
    const imageId = await getImageByName({ name });
    res.json(imageId)
  }
  catch (err) {
    handleErrors(res, 'Error al encontrar la imagen');
  }
}

// Obtener información sobre un contenedor específico
const getContainerInfo = async (req, res) => {
  const token = req.headers['authorization'];
  const image = await getImageByToken({ token })
  const imageStatus = image.dataValues.status
  try {
    res.json(imageStatus);
  } catch (error) {
    handleErrors(res, 'Contenedor no encontrado', 404);
  }
};

// Iniciar un contenedor
const startContainer = async (req, res) => {
  const token = req.headers['authorization'];
  const image = await getImageByToken({ token })
  const imageId = image.dataValues.id
  try {
    const container = await docker.createContainer({
      Image: imageId,
      Tty: true,
      ExposedPorts: { "3000/tcp": {} },
      HostConfig: {
        PortBindings: {
          "3000/tcp": [{ "HostPort": image.dataValues.port.toString() }]
        }
      }
    });

    await container.start();
    const containerInfo = await container.inspect();
    const containerId = containerInfo.Id

    await setBotStatusByImageId({ imageId, newContainer: containerId, newStatus: true })

    res.json({ message: 'Contenedor iniciado con éxito' });
  } catch (error) {
    console.log(error)
    handleErrors(res, 'Error al iniciar el contenedor');
  }
};

// Detener un contenedor
const stopContainer = async (req, res) => {
  const token = req.headers['authorization'];
  const image = await getImageByToken({ token })
  const containerId = image.dataValues.containerId

  try {
    const container = docker.getContainer(containerId);
    await container.kill();

    // Simulación de busqueda en la base de datos
    await setBotStatusByImageId({ imageId: image.dataValues.id, newContainer: null, newStatus: false })

    res.json({ message: 'Contenedor detenido con éxito' });
  } catch (error) {
    console.log(error)
    handleErrors(res, 'Error al detener el contenedor');
  }
};

module.exports = { getContainerInfo, startContainer, stopContainer, getAllImages, getImageId }