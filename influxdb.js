const { InfluxDB, Point } = require('@influxdata/influxdb-client');

// Configuración de la URL y el token de InfluxDB
const url = 'http://localhost:8086';
const token = 'tu-token-de-influxdb';
const org = 'tu-organizacion';
const bucket = 'tu-bucket';

// Crear una instancia del cliente de InfluxDB
const influxDB = new InfluxDB({ url, token });

module.exports = {
  influxDB,
  org,
  bucket,
  Point
};
