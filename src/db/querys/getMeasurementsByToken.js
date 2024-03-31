const { Image } = require('../references/imagesXMeasurements');
const { Measurement } = require('../references/imagesXMeasurements');
const { User } = require('../models/user');
const { sequalize } = require('../sequalize');
const { defineDynamicModel } = require('../helpers/defineMeasuremntModel');

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

    let imageName = await Image.findOne({
      where: {
        id: imageId
      },
      attributes: ['name']
    })
    imageName = `m_${imageName.dataValues.name.split(':')[0]}`
    defineDynamicModel(imageName)
    let measueresPerDay = await sequalize.models[imageName].findAll({
      order: [['date', 'DESC']],
      limit: 5
    })
    measueresPerDay = measueresPerDay.map((measure) => measure.dataValues)

    let measueres = await Measurement.findOne({
      where: {
        imageId: imageId
      },
      attributes: ['id', 'imageId', 'countClients', 'countConnecteds', 'countBugs', 'countMessages', 'countCosts']
    })
    measueres = measueres.dataValues

    const measeuresObject = { global: measueres, measueresPerDay }
    return measeuresObject
  } catch (error) {
    console.error('Error al obtener las medidas por imageId:', error);
    throw error;
  }
}

module.exports = { getMeasurementByToken };