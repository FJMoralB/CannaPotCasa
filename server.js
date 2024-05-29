const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const cors = require('cors');
const connection = require('./db');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Crear la carpeta 'uploads' si no existe
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// Configuración de Multer para manejar archivos
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage });

app.get('/', (req, res) => {
  res.send('Servidor funcionando');
});

// Endpoint para obtener todas las semillas
app.get('/semillas', (req, res) => {
  connection.query('SELECT * FROM semillas', (err, results) => {
    if (err) {
      console.error('Error al obtener las semillas:', err);
      return res.status(500).send(err);
    }
    res.send(results);
  });
});

app.post('/macetas', upload.single('imagen'), (req, res) => {
  const { nombre, semilla_id } = req.body;
  const imagen_url = req.file ? `/uploads/${req.file.filename}` : null;

  console.log('Datos recibidos:', { nombre, semilla_id, imagen_url });

  if (!nombre || !semilla_id) {
    return res.status(400).send('Faltan campos requeridos: nombre o semilla_id');
  }

  const sql = 'INSERT INTO macetas (nombre, semilla_id, imagen_url) VALUES (?, ?, ?)';
  connection.query(sql, [nombre, semilla_id, imagen_url], (err, results) => {
    if (err) {
      console.error('Error al insertar la maceta:', err);
      return res.status(500).send(err);
    }
    res.send({ id: results.insertId, nombre, semilla_id, imagen_url });
  });
});

app.get('/macetas', (req, res) => {
  connection.query('SELECT * FROM macetas', (err, results) => {
    if (err) {
      console.error('Error al obtener las macetas:', err);
      return res.status(500).send(err);
    }
    res.send(results);
  });
});

// Endpoint para actualizar una maceta
app.put('/macetas/:id', upload.single('imagen'), (req, res) => {
  const { id } = req.params;
  const { nombre, semilla_id } = req.body;
  const imagen_url = req.file ? `/uploads/${req.file.filename}` : null;

  let sql = 'UPDATE macetas SET nombre = ?, semilla_id = ?';
  const params = [nombre, semilla_id];

  if (imagen_url) {
    sql += ', imagen_url = ?';
    params.push(imagen_url);
  }
  sql += ' WHERE id = ?';
  params.push(id);

  connection.query(sql, params, (err, results) => {
    if (err) {
      console.error('Error al actualizar la maceta:', err);
      return res.status(500).send(err);
    }
    res.send({ id, nombre, semilla_id, imagen_url });
  });
});

// Endpoint para eliminar una maceta
app.delete('/macetas/:id', (req, res) => {
  const { id } = req.params;

  const sql = 'DELETE FROM macetas WHERE id = ?';
  connection.query(sql, [id], (err, results) => {
    if (err) {
      console.error('Error al eliminar la maceta:', err);
      return res.status(500).send(err);
    }
    res.send({ message: 'Maceta eliminada con éxito' });
  });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
