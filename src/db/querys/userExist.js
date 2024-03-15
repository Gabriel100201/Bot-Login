const { User } = require('../models/user');

const userExist = async ({ userName }) => {
  try {
    const user = await User.findOne({
      where: {
        userName: userName
      }
    });
    return user !== null;
  } catch (error) {
    console.error('Error al verificar si el usuario existe:', error);
    throw error;
  }
}

module.exports = { userExist };
