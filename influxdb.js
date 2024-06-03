const { InfluxDB, Point } = require('@influxdata/influxdb-client');

const token = 'tu_token';  // Reemplaza con tu token
const org = 'tu_organizacion';  // Reemplaza con tu organización
const bucket = 'tu_bucket';  // Reemplaza con tu bucket

const client = new InfluxDB({ url: 'http://localhost:8086', token });

const writeApi = client.getWriteApi(org, bucket);
const queryApi = client.getQueryApi(org);

module.exports = {
  writeApi,
  queryApi,
  Point,
};
