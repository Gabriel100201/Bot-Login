const { Sequelize } = require('sequelize');

// Configuración de la conexión a la base de datos
const sequelize = new Sequelize('admin_bot', 'root', 'Gabi43280743', {
  host: 'localhost',
  dialect: 'mysql'
});

// Probar la conexión
async function probarConexion() {
  try {
    await sequelize.authenticate();
    console.log('Conexión establecida correctamente.');
  } catch (error) {
    console.error('Error al conectar a la base de datos:', error);
  }
}

probarConexion()
// Exportar el objeto Sequelize y la función de prueba de conexión para su uso en otros archivos
module.exports = {
  sequelize,
  probarConexion
};
