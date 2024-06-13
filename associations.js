const Maceta = require('./models/Maceta');
const Semilla = require('./models/Semilla');
const DatoSensor = require('./models/DatoSensor');

const defineAssociations = () => {
  Maceta.belongsTo(Semilla, { foreignKey: 'semilla_id' });
  Semilla.hasMany(Maceta, { foreignKey: 'semilla_id' });

  DatoSensor.belongsTo(Maceta, { foreignKey: 'maceta_id' });
  Maceta.hasMany(DatoSensor, { foreignKey: 'maceta_id' });
};

module.exports = defineAssociations;
