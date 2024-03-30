require('dotenv').config();
const { getMeasurementByToken } = require('../../db');
const { updateMeasures } = require('../../db/querys/updateMeasures');

const handleErrors = (res, errorMessage, statusCode = 500) => {
  console.log(errorMessage)
  res.status(statusCode).json({ error: errorMessage });
};

const getMeasures = async (req, res) => {
  try {
    const token = req.headers['authorization'];
    const measueres = await getMeasurementByToken({ token })
    const measueresParsed = measueres.dataValues
    res.json(measueresParsed)
  }
  catch (err) {
    console.log(err)
    handleErrors(res, 'Error al obtener measures', 500);
  }
}

const setMeasures = async (req, res) => {
  try {
    const { imageName, newClients, newConnecteds, newBugs, newMessages, newCosts } = req.body
    updateMeasures({ imageName, newClients, newConnecteds, newBugs, newMessages, newCosts })
  }
  catch (err) {
    console.log(err)
    handleErrors(res, 'Error al obtener measures', 500);
  }
}

module.exports = { getMeasures, setMeasures }