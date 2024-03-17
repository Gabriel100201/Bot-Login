const Docker = require('dockerode');
const { syncContainer } = require('./containers');
const { syncImage } = require('./images');

const docker = new Docker();

const syncDocker = () => {
  console.log("[SYNC DATABASE WIRH DOCKER]")

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
          syncContainer(event, docker)
          break;
        case 'image':
          syncImage(event, docker)
          break;
      }
    });

    stream.on('error', err => {
      console.error('Error en el flujo de eventos de Docker:', err);
    });

    stream.on('end', () => {
      console.log('No hay eventos disponibles en el flujo de eventos de Docker.');
      setTimeout(syncDocker, 5000);
    });

  });
}

module.exports = { syncDocker }
