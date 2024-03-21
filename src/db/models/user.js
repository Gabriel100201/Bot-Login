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
    allowNull: true
  },
  botAccess: {
    type: DataTypes.STRING,
    allowNull: false
  },
  company: {
    type: DataTypes.STRING,
    allowNull: true
  },
  rol: {
    type: DataTypes.STRING,
    allowNull: true
  }
},
  {
    timestamps: false
  });

module.exports = { User }