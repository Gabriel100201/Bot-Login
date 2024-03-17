const { setBotStatusByContainerId, setBotStatusByImageId } = require('../../db');

const syncContainer = (event, docker) => {
  if (event.status == 'die') setBotStatusByContainerId({ containerId: event.id, newContainer: null, newStatus: false })
  else if (event.status == 'start') setBotStatusByImageId({ imageId: event.Actor.Attributes.image, newContainer: event.id, newStatus: true })
}

module.exports = { syncContainer }