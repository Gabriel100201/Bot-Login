const { User } = require('../models/user');

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

    console.log(`Valor de activeToken actualizado para el usuario con ID ${userId}`);
  } catch (error) {
    console.error('Error al actualizar activeToken del usuario:', error);
    throw error;
  }
}

module.exports = { updateUserToken }
