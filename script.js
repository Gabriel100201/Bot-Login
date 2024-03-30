const { getImageByName } = require("./src/db/querys/getImageIdByName")
const { updateMeasures } = require("./src/db/querys/updateMeasures")

// Tests
const fn = async () => {
  updateMeasures({ imageName: "gafunes/technodevs", newClients: 1, newConnecteds: 1, newBugs: 1, newMessages: 1, newCosts: 2 })
}
fn()