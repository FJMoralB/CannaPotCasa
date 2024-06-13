const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Semilla = sequelize.define('Semilla', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nombre_cientifico: {
    type: DataTypes.STRING,
    allowNull: false
  },
  especie: {
    type: DataTypes.STRING
  },
  ciclo_de_planta: {
    type: DataTypes.STRING
  },
  tiempo_de_crecimiento: {
    type: DataTypes.INTEGER
  },
  temperatura: {
    type: DataTypes.FLOAT
  },
  luz_rojo: {
    type: DataTypes.FLOAT
  },
  luz_blanca: {
    type: DataTypes.FLOAT
  },
  luz_rojo_lejano: {
    type: DataTypes.FLOAT
  },
  luz_azul: {
    type: DataTypes.FLOAT
  },
  humedad: {
    type: DataTypes.FLOAT
  },
  abono_a: {
    type: DataTypes.FLOAT
  },
  abono_b: {
    type: DataTypes.FLOAT
  },
  agua: {
    type: DataTypes.FLOAT
  }
}, {
  tableName: 'semillas',
  timestamps: true // Asegúrate de que los timestamps estén habilitados
});

module.exports = Semilla;
