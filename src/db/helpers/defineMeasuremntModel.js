const { DataTypes } = require("sequelize");
const { sequalize } = require("../sequalize");

const defineDynamicModel = (tableName) => {
  if (!sequalize.models[tableName]) {
    sequalize.define(tableName, {
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
    },
      {
        timestamps: false,
        freezeTableName: true
      });
  }
};
module.exports = { defineDynamicModel }