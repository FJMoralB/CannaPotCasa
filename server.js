const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
const multer = require('multer');
const path = require('path');

const app = express();
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

app.get('/api/semillas', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM semillas');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
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
    console.error(err);
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
    console.error(err);
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
    console.error(err);
    res.status(500).json({ error: 'Error al actualizar la maceta' });
  }
});

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
