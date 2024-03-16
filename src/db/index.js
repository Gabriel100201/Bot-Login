const { createUser } = require('./querys/createUser');
const { getUserByName } = require('./querys/getUserByName');
const { getUsers } = require('./querys/getUsers');
const { userExist } = require('./querys/userExist');
const { updateUserToken } = require('./querys/updateUserToken');
const { getImageByToken } = require('./querys/getImageByToken');
const { setBotStatusByImageId } = require('./querys/setBotStatusByImageId');

/* const fn = async () => {
  const image = await getImageByToken({ token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJkc2FzZGFzZGEiLCJpYXQiOjE3MTA2MjY4MjcsImV4cCI6MTcxMDYzMDQyN30.FRpjMmvbKkVYBqr7wDhzYHKqnbsO08ejQ4FQSPSdkdw" })
  console.log(image)
}
fn() */

module.exports = {
  createUser,
  getUsers,
  userExist,
  getUserByName,
  updateUserToken,
  getImageByToken,
  setBotStatusByImageId
}