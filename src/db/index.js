const { createUser } = require('./querys/createUser');
const { getUserByName } = require('./querys/getUserByName');
const { getUsers } = require('./querys/getUsers');
const { userExist } = require('./querys/userExist');
const { updateUserToken } = require('./querys/updateUserToken');
const { getImageByToken } = require('./querys/getImageByToken');

const fn = async () => {
  const image = await getImageByToken({ token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJkc2FzZGFzZGEiLCJpYXQiOjE3MTA1Mzc5NjksImV4cCI6MTcxMDU0MTU2OX0.Tl4yryM2aQ7sxTogjhLjimE6jiD75GyjeVC7ilDoyvM" })
  console.log(image)
}
fn()
module.exports = {
  createUser,
  getUsers,
  userExist,
  getUserByName,
  updateUserToken,
  getImageByToken
}