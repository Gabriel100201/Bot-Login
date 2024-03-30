const { getImageByName } = require("./src/db/querys/getImageIdByName")

// Tests
const fn = async () => {
  const image = await getImageByName({ name: "gafunes/bot-test" })
  console.log(image)
}
fn()