const bcrypt = require('bcrypt');
const { uid } = require('uid');
const { User } = require('../references/usersXimages');

const setNewUser = async ({ userName, password, imageId, company, rol }) => {
  const id = uid(8);
  const hash = bcrypt.hashSync(password, 1);
  try {
    await User.create({
      id,
      userName,
      password: hash,
      activeToken: null,
      botAccess: imageId,
      company,
      rol,
      status: 'active'
    });
    return true
  } catch (error) {
    console.error('Error al añadir un nuevo usuario:');
    return false
  }
}

module.exports = { setNewUser };
