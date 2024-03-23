const { User } = require('../references/usersXimages');
const { Image } = require('../references/usersXimages');

const getImageByToken = async ({ token }) => {
  try {
    const user = await User.findOne({
      where: {
        activeToken: token
      },
      include: [{
        model: Image,
        attributes: ['status', 'id', 'containerId', 'port'],
        as: 'image'
      }]
    });
    return user ? user.image : null;
  } catch (error) {
    console.error('Error al obtener el usuario por token:', error);
    throw error;
  }
}

module.exports = { getImageByToken };