const { setNewImage, deleteImageById, getAvaiblePorts } = require('../../db');

const syncImage = async (event, docker) => {

  if (event.status == 'pull') {
    const images = await docker.listImages()
    images.forEach(async (image) => {
      if (image.RepoTags == event.Actor.ID) {
        const imageId = image.Id
        const imageArray = imageId.split(':');
        const id = imageArray[1];
        const name = event.Actor.ID
        const port = await getAvaiblePorts()
        setNewImage({ id, name, containerId: null, status: 0, port })
      }
    })
  }

  else if (event.status == 'delete') {
    const imageId = event.id.split(':')
    const id = imageId[1]
    deleteImageById({ id })
  }
}

module.exports = { syncImage }