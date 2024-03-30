const { Image } = require('../references/usersXimages');
const { Op } = require('sequelize');

const getImageByName = async ({ name }) => {
  try {
    const image = await Image.findOne({
      where: {
        name: {
          [Op.like]: `%${name}:%`
        }
      },
      attributes: ['id']
    })
    return image ? image.dataValues.id : null;
  } catch (error) {
    console.error('Error al obtener la imagen por nombre:', error);
    throw error;
  }
}

module.exports = { getImageByName };