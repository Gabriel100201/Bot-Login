const { DataTypes } = require("sequelize");

const measureTableData = {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false
  },
  countClients: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  countConnecteds: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  countBugs: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  countMessages: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  countCosts: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
}
module.exports = { measureTableData }