const { User } = require('../references/usersXimages');

const getUsers = async () => {
  try {
    const users = await User.findAll({
      attributes: ['userName']
    });
    return users;
  } catch (error) {
    console.error('Error al obtener usuarios:', error);
    throw error;
  }
}

module.exports = { getUsers }