const express = require('express');
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

    socket.emit('nuevo-dato', {
      temperatura: temperatura.toFixed(2),
      humedad: humedad.toFixed(2),
      peso: peso.toFixed(2),
      dendometro: dendometro.toFixed(2),
      ph: ph.toFixed(2)
    });
  }, 2000);

  socket.on('disconnect', () => {
    console.log('Cliente desconectado');
  });
});

const PORT = 3001;
server.listen(PORT, () => {
  console.log(`Servidor de Socket.io corriendo en http://localhost:${PORT}`);
});
