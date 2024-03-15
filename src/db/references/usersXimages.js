const { User } = require('../models/user');
const { Image } = require('../models/image');
const { sequalize } = require('../sequalize');

User.hasOne(Image, { foreignKey: 'id', sourceKey: 'botAccess', as: 'image' });

sequalize.sync();

module.exports = { User, Image };