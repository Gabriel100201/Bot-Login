const { Measurement } = require("../models/mesurement");
const { getImageByName } = require("./getImageIdByName");

const updateMeasures = async ({ imageName, newClients, newConnecteds, newBugs, newMessages, newCosts }) => {
  try {
    const imageId = await getImageByName({ name: imageName })
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

  } catch (error) {
    console.error('Error al actualizar medidas:', error);
    throw error;
  }
};

module.exports = { updateMeasures };
