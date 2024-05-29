const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const cors = require('cors'); // Importar cors
const connection = require('./db');

const app = express();
const server = http.createServer(app);

// Configuración de CORS para Socket.io
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:5173", // Permitir solicitudes desde este origen
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"]
  }
});

// Configuración de CORS para Express
app.use(cors({ 
  origin: "http://localhost:5173",
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type"]
})); 

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

// Endpoint para obtener datos de gráficos desde la base de datos
app.get('/datos-graficos', (req, res) => {
  const sql = 'SELECT * FROM datos_sensores';
  connection.query(sql, (err, results) => {
    if (err) {
      console.error('Error al obtener los datos de gráficos:', err);
      return res.status(500).send(err);
    }
    res.send(results);
  });
});

// Endpoint para recibir datos en tiempo real desde los sensores y emitir a través de socket.io
app.post('/datos-tiempo-real', (req, res) => {
  const {
    sensor_id, nombre, descripcion, ciclo, clima, temperatura, luz_blanca,
    luz_roja, luz_rojo_lejano, luz_azul, humedad, abono_a, abono_b, ph, agua
  } = req.body;

  const sql = `
    INSERT INTO datos_sensores (sensor_id, nombre, descripcion, ciclo, clima, temperatura, luz_blanca,
    luz_roja, luz_rojo_lejano, luz_azul, humedad, abono_a, abono_b, ph, agua)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  const params = [sensor_id, nombre, descripcion, ciclo, clima, temperatura, luz_blanca,
    luz_roja, luz_rojo_lejano, luz_azul, humedad, abono_a, abono_b, ph, agua];

  connection.query(sql, params, (err, results) => {
    if (err) {
      console.error('Error al insertar datos del sensor:', err);
      return res.status(500).send(err);
    }
    io.emit('nuevo-dato', {
      sensor_id, nombre, descripcion, ciclo, clima, temperatura, luz_blanca,
      luz_roja, luz_rojo_lejano, luz_azul, humedad, abono_a, abono_b, ph, agua,
      timestamp: new Date()
    });
    res.send({ message: 'Datos insertados correctamente' });
  });
});

// Socket.io para tiempo real
io.on('connection', (socket) => {
  console.log('Cliente conectado');

  socket.on('disconnect', () => {
    console.log('Cliente desconectado');
  });
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
