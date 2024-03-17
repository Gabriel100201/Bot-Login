const Docker = require('dockerode');
const { setBotStatusByContainerId, setNewImage, deleteImageById, getAvaiblePorts, setBotStatusByImageId } = require('./src/db');

const docker = new Docker();

const syncContainer = (event) => {
  if (event.status == 'die') setBotStatusByContainerId({ containerId: event.id, newContainer: null, newStatus: false })
  else if (event.status == 'start') setBotStatusByImageId({ imageId: event.Actor.Attributes.image, newContainer: event.id, newStatus: true })
}

const syncImage = async (event) => {

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

function syncDocker() {
  docker.getEvents((err, stream) => {
    if (err) {
      console.error('Error al obtener eventos de Docker:', err);
      return;
    }

    stream.setEncoding('utf8');

    stream.on('data', data => {
      const event = JSON.parse(data);

      switch (event.Type) {
        case 'container':
          syncContainer(event)
          break;
        case 'image':
          syncImage(event)
          break;
      }
    });

    stream.on('error', err => {
      console.error('Error en el flujo de eventos de Docker:', err);
    });

  });
}

syncDocker()
/* module.exports = { syncDocker }
 */