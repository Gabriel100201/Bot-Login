const { User } = require('../references/usersXimages');

const getUserByName = async ({ userName }) => {
  try {
    const user = await User.findOne({
      where: {
        userName: userName
      },
      attributes: ['id', 'userName', 'password']
    });
    return user;
  } catch (error) {
    console.error('Error al obtener el usuario:', error);
    throw error;
  }
}

module.exports = { getUserByName }
