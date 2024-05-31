const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const cors = require('cors');
const influx = require('./db');

const app = express();
const server = http.createServer(app);

// Configuración de CORS para Socket.io
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:5173",
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

app.get('/semillas', async (req, res) => {
  try {
    const results = await influx.query('SELECT * FROM semilla');
    res.send(results);
  } catch (error) {
    console.error('Error al obtener las semillas:', error);
    res.status(500).send(error);
  }
});

app.post('/macetas', upload.single('imagen'), async (req, res) => {
  const { nombre, semilla_id } = req.body;
  const imagen_url = req.file ? `/uploads/${req.file.filename}` : null;

  if (!nombre || !semilla_id) {
    return res.status(400).send('Faltan campos requeridos: nombre o semilla_id');
  }

  try {
    await influx.writePoints([
      {
        measurement: 'macetas',
        tags: { id: Date.now().toString() },
        fields: { nombre, semilla_id: parseInt(semilla_id), imagen_url }
      }
    ]);
    res.send({ nombre, semilla_id, imagen_url });
  } catch (error) {
    console.error('Error al insertar la maceta:', error);
    res.status(500).send(error);
  }
});

app.get('/macetas', async (req, res) => {
  try {
    const results = await influx.query('SELECT * FROM macetas');
    res.send(results);
  } catch (error) {
    console.error('Error al obtener las macetas:', error);
    res.status(500).send(error);
  }
});

app.get('/datos-graficos', async (req, res) => {
  try {
    const results = await influx.query('SELECT * FROM datos_sensores');
    res.send(results);
  } catch (error) {
    console.error('Error al obtener los datos de gráficos:', error);
    res.status(500).send(error);
  }
});

app.post('/datos-tiempo-real', async (req, res) => {
  const {
    sensor_id, nombre, descripcion, ciclo, clima, temperatura, luz_blanca,
    luz_roja, luz_rojo_lejano, luz_azul, humedad, abono_a, abono_b, ph, agua
  } = req.body;

  try {
    await influx.writePoints([
      {
        measurement: 'datos_sensores',
        tags: { id: Date.now().toString() },
        fields: {
          sensor_id, nombre, descripcion, ciclo, clima, temperatura, luz_blanca,
          luz_roja, luz_rojo_lejano, luz_azul, humedad, abono_a, abono_b, ph, agua
        },
        timestamp: new Date(),
      }
    ]);

    io.emit('nuevo-dato', {
      sensor_id, nombre, descripcion, ciclo, clima, temperatura, luz_blanca,
      luz_roja, luz_rojo_lejano, luz_azul, humedad, abono_a, abono_b, ph, agua,
      timestamp: new Date()
    });
    res.send({ message: 'Datos insertados correctamente' });
  } catch (error) {
    console.error('Error al insertar datos del sensor:', error);
    res.status(500).send(error);
  }
});

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
