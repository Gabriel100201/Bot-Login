const { Image } = require('../references/usersXimages');

const deleteImageById = async ({id}) => {
  try {
    await Image.destroy({
      where: {
        id: id
      }
    });

  } catch (error) {
    console.error('Error al eliminar la imagen:', error);
  }
}

module.exports = { deleteImageById };
