const { getImages, deleteImageById, setNewImage, getAvaiblePorts } = require('../../db');
const { initSyncContainer } = require('../containers');

const initSyncImage = async (docker) => {
  const images = await getImages();
  const imagesDocker = await docker.listImages();

  const imagesIds = images.map((image) => image.dataValues.id);
  const imagesDockerInfo = imagesDocker.map((image) => {
    return {
      imageId: image.Id.split(":")[1],
      name: image.RepoTags[0].split("amazonaws.com/")[1] ? image.RepoTags[0].split("amazonaws.com/")[1] : image.RepoTags
    };
  });
  try {
    imagesIds.forEach((imageId) => {
      if (!imagesDockerInfo.some((dockerImage) => dockerImage.imageId === imageId)) {
        deleteImageById({ id: imageId });
      }
    });

    imagesDockerInfo.forEach(async (dockerImage) => {
      if (!imagesIds.includes(dockerImage.imageId)) {
        const port = await getAvaiblePorts()
        console.log(dockerImage.imageId, dockerImage.name, port)
        setNewImage({ id: dockerImage.imageId, name: dockerImage.name, status: false, port, containerId: null });
      }
    });
  }
  catch {
    console.log("Error al sincronizar las imagenes con docker")
  }
  finally {
    initSyncContainer(docker)
  }
};

module.exports = { initSyncImage };
