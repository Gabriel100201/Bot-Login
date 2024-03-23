const { User, Image } = require('../references/usersXimages');

const getUsers = async () => {
  try {
    const users = await User.findAll({
      attributes: ['id', 'userName', 'company', 'rol', 'status'],
      include: [{
        model: Image,
        as: 'image',
        attributes: ['name'],
      }]
    });
    return users;
  } catch (error) {
    console.error('Error al obtener usuarios:', error);
    throw error;
  }
}

module.exports = { getUsers }