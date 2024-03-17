const { Image } = require('../references/usersXimages');

const setNewImage = async ({ id, name, containerId, status, port }) => {
  try {
    await Image.create({
      id,
      name,
      containerId,
      status,
      port
    });

  } catch (error) {
    console.error('Error al añadir una nueva imagen:', error);
  }
}

module.exports = { setNewImage };
