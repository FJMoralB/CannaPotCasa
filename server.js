const express = require('express');
const cors = require('cors'); // Añadir esto
const connection = require('./db');

const app = express();

app.use(cors()); // Añadir esto
app.use(express.json());

// Endpoint para obtener todas las semillas
app.get('/semillas', (req, res) => {
  connection.query('SELECT * FROM semillas', (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.send(results);
  });
});

const PORT = process.env.PORT || 3001; // Cambia el puerto a 3001
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
