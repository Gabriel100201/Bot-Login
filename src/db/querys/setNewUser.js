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
    if (error.errors && error.errors[0]) {
      throw { type: error.errors[0].validatorKey, value: "user" };
    }
    else if (error.name.toString() == "SequelizeForeignKeyConstraintError") {
      throw { type: 'not_valid', value: 'image' }
    }
    else {
      throw { type: 'generic_error', message: 'Error al añadir un nuevo usuario' };
    }
  }
}

module.exports = { setNewUser };
