const { DataTypes } = require('sequelize');
const sequelize = require('../db');
const Maceta = require('./Maceta');

const DatoSensor = sequelize.define('DatoSensor', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  maceta_id: {
    type: DataTypes.INTEGER,
    references: {
      model: 'macetas',
      key: 'id'
    }
  },
  timestamp: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  temperatura: {
    type: DataTypes.FLOAT
  },
  humedad: {
    type: DataTypes.FLOAT
  },
  peso: {
    type: DataTypes.FLOAT
  },
  dendometro: {
    type: DataTypes.FLOAT
  },
  ph: {
    type: DataTypes.FLOAT
  }
}, {
  tableName: 'datos_sensores'
});

DatoSensor.belongsTo(Maceta, { foreignKey: 'maceta_id' });

module.exports = DatoSensor;
