const { User } = require('../models/user');

const createUser = async () => {
  await User.create({
    id: "dsasdasda2",
    userName: "Agustin",
    password: "43280743",
    activeToken: "dadadadada",
    botAccess: "patopato"
  })
  const usuarios = await User.findAll();
  console.log(usuarios);
}

module.exports = { createUser }