const { uid } = require('uid');
const { User } = require('../references/usersXimages');

const createUser = async (userData) => {
  const id = uid(8);

  await User.create({
    id: id,
    ...userData
  }, { fields: ['id', 'userName', 'password', 'activeToken', 'botAccess'] });
}

module.exports = { createUser };