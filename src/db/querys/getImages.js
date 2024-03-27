const { Image } = require('../references/usersXimages');

const getImages = async () => {
  try {
    const images = await Image.findAll({
      attributes: ['id', 'name'],
    });
    return images;
  } catch (error) {
    console.error('Error al obtener usuarios:', error);
    throw error;
  }
}

module.exports = { getImages }