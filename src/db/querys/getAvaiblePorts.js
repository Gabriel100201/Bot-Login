const { Image } = require('../references/usersXimages');

const getAvaiblePorts = async () => {
  try {
    const imagenes = await Image.findAll({ attributes: ['port'] });
    const puertosOcupados = new Set(imagenes.map(imagen => imagen.port));

    let puertoDisponible = 5000;
    while (puertosOcupados.has(puertoDisponible)) {
      puertoDisponible++;
    }
    return puertoDisponible;
  } catch (error) {
    console.error('Error al encontrar un puerto disponible:', error);
  }
}

module.exports = { getAvaiblePorts };
