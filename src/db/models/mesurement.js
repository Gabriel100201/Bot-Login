const { DataTypes } = require('sequelize');
const { sequalize } = require('../sequalize');

const Measurement = sequalize.define('measurement', {
  id: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    primaryKey: true
  },
  imageId: {
    type: DataTypes.STRING,
    allowNull: true
  },
  countClients: {
    type: DataTypes.NUMBER,
    allowNull: true
  },
  countConnected: {
    type: DataTypes.BOOLEAN,
    allowNull: true
  },
  countBugs: {
    type: DataTypes.NUMBER,
    allowNull: true
  },
  countMessages: {
    type: DataTypes.NUMBER,
    allowNull: true
  },
  countCosts: {
    type: DataTypes.NUMBER,
    allowNull: true
  }
},
  {
    timestamps: false
  });

module.exports = { Measurement }