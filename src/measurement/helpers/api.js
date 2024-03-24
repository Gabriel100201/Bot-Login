require('dotenv').config();
const { getMeasurementByToken } = require('../../db');

const handleErrors = (res, errorMessage, statusCode = 500) => {
  console.log(errorMessage)
  res.status(statusCode).json({ error: errorMessage });
};

const getMeasures = async (req, res) => {
  try {
    const { token } = req.body;
    const measueres = await getMeasurementByToken({ token })
    const measueresParsed = measueres.dataValues
    res.json(measueresParsed)
  }
  catch (err) {
    console.log(err)
    handleErrors(res, 'Error al obtener measures', 500);
  }
}

module.exports = { getMeasures }