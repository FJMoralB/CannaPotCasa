const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
const multer = require('multer');
const http = require('http');
const socketIo = require('socket.io');
const admin = require('firebase-admin');
const path = require('path');

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

// Inicializar Firebase Admin SDK
const serviceAccount = require(path.resolve(__dirname, 'serviceAccountKey.json'));

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

// Middleware de autenticación
const authenticateToken = async (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.sendStatus(401);

  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    req.user = decodedToken;
    next();
  } catch (error) {
    console.error('Error al verificar el token:', error);
    res.sendStatus(403);
  }
};

// Registro de usuarios (manejado por Firebase)
app.post('/api/register', (req, res) => {
  res.sendStatus(501); // No implementado ya que Firebase maneja el registro
});

// Inicio de sesión de usuarios (manejado por Firebase)
app.post('/api/login', (req, res) => {
  res.sendStatus(501); // No implementado ya que Firebase maneja el inicio de sesión
});

// Insertar datos de ejemplo al iniciar el servidor
const insertInitialData = async () => {
  try {
    await pool.query(`
      INSERT INTO macetas (id, nombre, usuario_uid, semilla_id, imagen)
      VALUES 
      (2, 'unos', 'some-uid-1', 8, NULL),
      (3, 'dos', 'some-uid-2', 3, NULL)
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

// Ruta para obtener macetas del usuario autenticado
app.get('/api/macetas', authenticateToken, async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT macetas.id, macetas.nombre, macetas.semilla_id, macetas.imagen, semillas.nombre AS nombre_semilla
      FROM macetas
      JOIN semillas ON macetas.semilla_id = semillas.id
      WHERE macetas.usuario_uid = $1
    `, [req.user.uid]); // Usamos req.user.uid para obtener el ID del usuario de Firebase
    res.json(result.rows);
  } catch (err) {
    console.error('Error al obtener las macetas:', err);
    res.status(500).json({ error: 'Error al obtener las macetas' });
  }
});

app.post('/api/macetas', upload.single('imagen'), authenticateToken, async (req, res) => {
  const { nombre, semilla_id } = req.body;
  const imagen = req.file ? req.file.buffer : null;
  try {
    const result = await pool.query(
      'INSERT INTO macetas (nombre, usuario_uid, semilla_id, imagen) VALUES ($1, $2, $3, $4) RETURNING *',
      [nombre, req.user.uid, semilla_id, imagen]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error al crear la maceta:', err);
    res.status(500).json({ error: 'Error al crear la maceta' });
  }
});

app.put('/api/macetas/:id', upload.single('imagen'), authenticateToken, async (req, res) => {
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

app.get('/api/semillas', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM semillas');
    res.json(result.rows);
  } catch (err) {
    console.error('Error al obtener las semillas:', err);
    res.status(500).json({ error: 'Error al obtener las semillas' });
  }
});

// Ruta para obtener los datos de gráficos
app.get('/api/datos-graficos', authenticateToken, async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM datos_sensores ORDER BY timestamp ASC');
    res.json(result.rows);
  } catch (err) {
    console.error('Error al obtener los datos de gráficos:', err);
    res.status(500).json({ error: 'Error al obtener los datos de gráficos' });
  }
});

server.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
  insertInitialData();
});
