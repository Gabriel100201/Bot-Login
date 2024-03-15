const { createUser } = require('./querys/createUser');
const { getUserByName } = require('./querys/getUserByName');
const { getUsers } = require('./querys/getUsers');
const { userExist } = require('./querys/userExist');

/* createUser({ userName: "Pato", password: "1231231123", activeToken: "ae2321w1231sada", botAccess: "patopato" }) */
/* const users = getUsers() */

/* const getUser = async () => {
  const name = await getUserByName({ userName: "Pato" })
  console.log(name.dataValues)
}

getUser() */

module.exports = {
  createUser,
  getUsers,
  userExist,
  getUserByName
}