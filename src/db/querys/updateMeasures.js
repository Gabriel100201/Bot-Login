const { Measurement } = require("../models/mesurement");

const updateMeasures = async ({ imageId, newClients, newConnecteds, newBugs, newMessages, newCosts }) => {
  try {
    const measure = await Measurement.findOne({
      where: {
        imageId: imageId
      }
    });

    if (!measure) {
      throw new Error('Medición no encontrada');
    }

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

  } catch (error) {
    console.error('Error al actualizar medidas:', error);
    throw error;
  }
};

module.exports = { updateMeasures };
