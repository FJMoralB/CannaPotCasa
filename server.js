const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
const multer = require('multer');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: 'http://localhost:5173', // Ajusta esto si tu frontend está en un puerto diferente
    methods: ['GET', 'POST']
  }
});

const port = 5000;

app.use(cors());
app.use(express.json());

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'CannaPot',
  password: 'root',
  port: 5432,
});

const storage = multer.memoryStorage();
const upload = multer({ storage });

// Insertar datos de ejemplo al iniciar el servidor
const insertInitialData = async () => {
  try {
    await pool.query(`
      INSERT INTO macetas (id, nombre, semilla_id, imagen)
      VALUES 
      (2, 'unos', 8, NULL),
      (3, 'dos', 3, NULL)
      ON CONFLICT (id) DO NOTHING;
    `);

    await pool.query(`
      INSERT INTO datos_sensores (maceta_id, temperatura, humedad, peso, dendometro, ph)
      VALUES
      (2, 22.5, 60.0, 5.0, 10.0, 5.8),
      (2, 23.1, 62.0, 5.5, 11.0, 5.9),
      (2, 21.8, 58.0, 4.8, 9.5, 5.7),
      (2, 24.3, 65.0, 6.0, 11.5, 6.0),
      (2, 25.0, 70.0, 6.2, 12.0, 5.6),
      (3, 22.0, 55.0, 4.5, 10.5, 5.8),
      (3, 23.5, 63.0, 5.8, 11.8, 5.9),
      (3, 24.0, 68.0, 6.1, 12.5, 5.6),
      (3, 21.5, 57.0, 4.7, 9.8, 5.7),
      (3, 25.5, 72.0, 6.3, 12.8, 5.9)
      ON CONFLICT DO NOTHING;
    `);
    console.log('Datos de ejemplo insertados correctamente');
  } catch (err) {
    console.error('Error al insertar datos de ejemplo:', err);
  }
};

app.get('/api/semillas', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM semillas');
    res.json(result.rows);
  } catch (err) {
    console.error('Error al obtener las semillas:', err);
    res.status(500).json({ error: 'Error al obtener las semillas' });
  }
});

app.get('/api/macetas', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT macetas.id, macetas.nombre, macetas.semilla_id, macetas.imagen, semillas.nombre AS nombre_semilla
      FROM macetas
      JOIN semillas ON macetas.semilla_id = semillas.id
    `);
    res.json(result.rows);
  } catch (err) {
    console.error('Error al obtener las macetas:', err);
    res.status(500).json({ error: 'Error al obtener las macetas' });
  }
});

app.post('/api/macetas', upload.single('imagen'), async (req, res) => {
  const { nombre, semilla_id } = req.body;
  const imagen = req.file ? req.file.buffer : null;

  try {
    const result = await pool.query(
      'INSERT INTO macetas (nombre, semilla_id, imagen) VALUES ($1, $2, $3) RETURNING *',
      [nombre, semilla_id, imagen]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error al crear la maceta:', err);
    res.status(500).json({ error: 'Error al crear la maceta' });
  }
});

app.put('/api/macetas/:id', upload.single('imagen'), async (req, res) => {
  const { id } = req.params;
  const { nombre, semilla_id } = req.body;
  const imagen = req.file ? req.file.buffer : null;

  try {
    const result = await pool.query(
      'UPDATE macetas SET nombre = $1, semilla_id = $2, imagen = $3 WHERE id = $4 RETURNING *',
      [nombre, semilla_id, imagen, id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error al actualizar la maceta:', err);
    res.status(500).json({ error: 'Error al actualizar la maceta' });
  }
});

const insertDatosSensores = async (datos) => {
  try {
    await pool.query(
      'INSERT INTO datos_sensores (maceta_id, temperatura, humedad, peso, dendometro, ph) VALUES ($1, $2, $3, $4, $5, $6)',
      [datos.maceta_id, datos.temperatura, datos.humedad, datos.peso, datos.dendometro, datos.ph]
    );
  } catch (err) {
    console.error('Error al insertar los datos en la tabla datos_sensores:', err);
  }
};

app.get('/api/datos-graficos', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM datos_sensores ORDER BY timestamp ASC');
    res.json(result.rows);
  } catch (err) {
    console.error('Error al obtener los datos de gráficos:', err);
    res.status(500).json({ error: 'Error al obtener los datos de gráficos' });
  }
});

// Inicializar los valores
let temperatura = 15;
let humedad = 40;
let peso = 4;
let dendometro = 0;
let ph = 5.6;

io.on('connection', (socket) => {
  console.log('Nuevo cliente conectado');

  setInterval(() => {
    // Aumentar los valores de manera controlada
    temperatura = Math.min(temperatura + Math.random(), 30);  // Aumenta hasta un máximo de 30
    humedad = Math.min(humedad + Math.random(), 80);          // Aumenta hasta un máximo de 80
    peso = Math.min(peso + Math.random(), 39);                // Aumenta hasta un máximo de 39
    dendometro = Math.min(dendometro + Math.random(), 100);   // Aumenta hasta un máximo de 100
    ph = Math.min(ph + (Math.random() * 0.01), 6);            // Aumenta hasta un máximo de 6.0

    const nuevoDato = {
      maceta_id: 2,
      timestamp: new Date().toISOString(),
      temperatura: temperatura.toFixed(2),
      humedad: humedad.toFixed(2),
      peso: peso.toFixed(2),
      dendometro: dendometro.toFixed(2),
      ph: ph.toFixed(2)
    };

    insertDatosSensores(nuevoDato); // Insertar datos en la tabla

    socket.emit('nuevo-dato', nuevoDato);
  }, 2000);

  socket.on('disconnect', () => {
    console.log('Cliente desconectado');
  });
});

server.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
  insertInitialData(); // Insertar datos de ejemplo al iniciar el servidor
});
