const { User } = require('../references/usersXimages');

const updateUserToken = async ({ userId, newActiveToken }) => {
  try {
    const user = await User.findOne({
      where: {
        id: userId
      }
    });

    if (!user) {
      throw new Error('Usuario no encontrado');
    }

    await user.update({
      activeToken: newActiveToken
    });

  } catch (error) {
    console.error('Error al actualizar activeToken del usuario:', error);
    throw error;
  }
}

module.exports = { updateUserToken }
