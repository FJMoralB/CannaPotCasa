const Influx = require('influx');

const influx = new Influx.InfluxDB({
  host: 'localhost',
  database: 'maceta_inteligente',
  schema: [
    {
      measurement: 'semilla',
      fields: {
        nombre: Influx.FieldType.STRING,
        tipo: Influx.FieldType.STRING,
        ciclo: Influx.FieldType.INTEGER,
        temperatura: Influx.FieldType.FLOAT,
        humedad: Influx.FieldType.FLOAT,
        cantidad_abono_a: Influx.FieldType.STRING,
        cantidad_abono_b: Influx.FieldType.STRING,
        cantidad_liquido: Influx.FieldType.FLOAT,
        agua: Influx.FieldType.FLOAT,
      },
      tags: ['id'],
    },
    {
      measurement: 'macetas',
      fields: {
        nombre: Influx.FieldType.STRING,
        semilla_id: Influx.FieldType.INTEGER,
        imagen_url: Influx.FieldType.STRING,
      },
      tags: ['id'],
    },
    {
      measurement: 'datos_sensores',
      fields: {
        sensor_id: Influx.FieldType.INTEGER,
        nombre: Influx.FieldType.STRING,
        descripcion: Influx.FieldType.STRING,
        ciclo: Influx.FieldType.STRING,
        clima: Influx.FieldType.STRING,
        temperatura: Influx.FieldType.FLOAT,
        luz_blanca: Influx.FieldType.FLOAT,
        luz_roja: Influx.FieldType.FLOAT,
        luz_rojo_lejano: Influx.FieldType.FLOAT,
        luz_azul: Influx.FieldType.FLOAT,
        humedad: Influx.FieldType.FLOAT,
        abono_a: Influx.FieldType.STRING,
        abono_b: Influx.FieldType.STRING,
        ph: Influx.FieldType.FLOAT,
        agua: Influx.FieldType.FLOAT,
      },
      tags: ['id'],
    },
  ],
});

module.exports = influx;
