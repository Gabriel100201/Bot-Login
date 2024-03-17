const { DataTypes } = require('sequelize');
const { sequalize } = require('../sequalize');

const Image = sequalize.define('image', {
  id: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  containerId: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  status: {
    type: DataTypes.BOOLEAN,
    allowNull: false
  },
  port: {
    type: DataTypes.NUMBER,
    allowNull: false
  }
},
  {
    timestamps: false
  });

module.exports = { Image }