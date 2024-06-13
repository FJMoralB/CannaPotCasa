const { DataTypes } = require('sequelize');
const sequelize = require('../db');
const Semilla = require('./Semilla');

const Maceta = sequelize.define('Maceta', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  },
  usuario_uid: {
    type: DataTypes.STRING,
    allowNull: false
  },
  semilla_id: {
    type: DataTypes.INTEGER,
    references: {
      model: 'semillas',
      key: 'id'
    }
  },
  imagen_url: {
    type: DataTypes.STRING
  }
}, {
  tableName: 'macetas',
  timestamps: true, // Asegúrate de que los timestamps estén habilitados
  indexes: [
    {
      unique: true,
      fields: ['nombre', 'usuario_uid']
    }
  ]
});

Maceta.belongsTo(Semilla, { foreignKey: 'semilla_id' });

module.exports = Maceta;
