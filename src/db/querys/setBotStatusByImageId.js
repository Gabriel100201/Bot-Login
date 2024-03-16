const { Image } = require('../references/usersXimages');

const setBotStatusByImageId = async ({ imageId, newContainer, newStatus }) => {
  try {
    const image = await Image.findOne({
      where: {
        id: imageId
      }
    });

    if (!image) {
      throw new Error('Imagen no encontrada');
    }

    await image.update({
      containerId: newContainer,
      status: newStatus
    });

  } catch (error) {
    console.error('Error al actualizar los datos de la imagen:', error);
    throw error;
  }
}

module.exports = { setBotStatusByImageId };
