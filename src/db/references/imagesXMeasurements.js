const { Image } = require('../models/image');
const { Measurement } = require('../models/mesurement');
const { sequalize } = require('../sequalize');

Measurement.hasOne(Image, { foreignKey: 'id', sourceKey: 'imageId', as: 'measurement' });

sequalize.sync();

module.exports = { Measurement, Image };