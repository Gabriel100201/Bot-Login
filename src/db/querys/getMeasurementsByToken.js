const { Image } = require('../references/imagesXMeasurements');
const { Measurement } = require('../references/imagesXMeasurements');
const { User } = require('../models/user');

const getMeasurementByToken = async ({ token }) => {
  try {
    const user = await User.findOne({
      where: {
        activeToken: token
      },
      include: [{
        model: Image,
        attributes: ['status', 'id', 'containerId', 'port'],
        as: 'image'
      }]
    });
    const imageId = user.image.dataValues.id
    console.log(imageId)

    const measueres = await Measurement.findOne({
      where: {
        imageId: imageId
      },
      attributes: ['id', 'imageId', 'countClients', 'countConnected', 'countBugs', 'countMessages', 'countCosts']
    })
    return measueres
  } catch (error) {
    console.error('Error al obtener las medidas por imageId:', error);
    throw error;
  }
}

module.exports = { getMeasurementByToken };