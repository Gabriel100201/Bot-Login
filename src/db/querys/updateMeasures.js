const { Measurement } = require("../models/mesurement");
const { getImageByName } = require("./getImageIdByName");
const { sequalize } = require("../sequalize");
const { defineDynamicModel } = require("../helpers/defineMeasuremntModel");
const { measureTableData } = require("../helpers/createTableDynamic");

const updateMeasures = async ({ imageName, newClients, newConnecteds, newBugs, newMessages, newCosts }) => {
  try {
    const imageId = await getImageByName({ name: imageName });

    const tableName = `m_${imageName}`;
    defineDynamicModel(tableName)
    const tableExists = await sequalize.getQueryInterface().showAllTables().then(tables => tables.includes(tableName));

    if (!tableExists) {
      await sequalize.getQueryInterface().createTable(tableName, measureTableData);
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    let measure = await Measurement.findOne({
      where: {
        imageId: imageId
      }
    });

    if (!measure) {
      measure = await Measurement.create({
        imageId: imageId,
        countClients: newClients || 0,
        countConnecteds: newConnecteds || 0,
        countBugs: newBugs || 0,
        countMessages: newMessages || 0,
        countCosts: newCosts || 0
      });
    } else {
      const updatedClients = measure.countClients + (newClients || 0);
      const updatedConnecteds = measure.countConnecteds + (newConnecteds || 0);
      const updatedBugs = measure.countBugs + (newBugs || 0);
      const updatedMessages = measure.countMessages + (newMessages || 0);
      const updatedCosts = measure.countCosts + (newCosts || 0);

      await measure.update({
        countClients: updatedClients,
        countConnecteds: updatedConnecteds,
        countBugs: updatedBugs,
        countMessages: updatedMessages,
        countCosts: updatedCosts
      });
    }

    let dailyMeasure = await sequalize.models[tableName].findOne({
      where: {
        date: today
      }
    });

    if (!dailyMeasure) {
      dailyMeasure = await sequalize.models[tableName].create({
        date: today,
        countClients: newClients || 0,
        countConnecteds: newConnecteds || 0,
        countBugs: newBugs || 0,
        countMessages: newMessages || 0,
        countCosts: newCosts || 0
      });
    } else {
      const updatedClients = dailyMeasure.countClients + (newClients || 0);
      const updatedConnecteds = dailyMeasure.countConnecteds + (newConnecteds || 0);
      const updatedBugs = dailyMeasure.countBugs + (newBugs || 0);
      const updatedMessages = dailyMeasure.countMessages + (newMessages || 0);
      const updatedCosts = dailyMeasure.countCosts + (newCosts || 0);

      await dailyMeasure.update({
        countClients: updatedClients,
        countConnecteds: updatedConnecteds,
        countBugs: updatedBugs,
        countMessages: updatedMessages,
        countCosts: updatedCosts
      });
    }

  } catch (error) {
    console.error('Error al actualizar medidas:', error);
    throw error;
  }
};

module.exports = { updateMeasures };
