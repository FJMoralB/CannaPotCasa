const { Sequelize } = require('sequelize');

// Configura la conexión a PostgreSQL
const sequelize = new Sequelize('CannaPot', 'postgres', 'root', {
  host: 'localhost',
  dialect: 'postgres'
});

// Verifica la conexión
sequelize.authenticate()
  .then(() => console.log('Conexión a PostgreSQL exitosa'))
  .catch(err => console.error('No se pudo conectar a PostgreSQL:', err));

module.exports = sequelize;
