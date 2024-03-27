const { setBotStatusByImageId, getImages } = require('../../db');

const initSyncContainer = async (docker) => {
  const containers = await docker.listContainers();
  const images = await getImages()
  images.forEach(async (image) => {
    let imageId = image.id
    try {
      await setBotStatusByImageId({ imageId, newContainer: null, newStatus: false })
    }
    catch (err) {
      console.log(`La imagen ${image.id} ya no se encontró en la base de datos`)
    }
  })
  containers.forEach(async (container) => {
    let imageId = container.ImageID.split(":")
    imageId = imageId[1]
    try {
      await setBotStatusByImageId({ imageId, newContainer: container.Id, newStatus: true })
    }
    catch (err) {
      console.log("No se encontro la imagen")
    }

  });
}

module.exports = { initSyncContainer }