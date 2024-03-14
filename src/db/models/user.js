const { DataTypes } = require('sequelize');
const { sequalize } = require('../sequalize');

const User = sequalize.define('user', {
  id: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    primaryKey: true
  },
  userName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  activeToken: {
    type: DataTypes.STRING,
    allowNull: false
  },
  botAccess: {
    type: DataTypes.STRING,
    allowNull: false
  }
},
  {
    timestamps: false
  });

module.exports = { User }