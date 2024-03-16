const { Sequelize } = require('sequelize');

const sequalize = new Sequelize('admin_bot', 'root', 'Gabi43280743', {
  host: 'localhost',
  dialect: 'mysql',
  logging: false
});

module.exports = { sequalize }