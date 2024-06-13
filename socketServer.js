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

io.on('connection', (socket) => {
  console.log('Nuevo cliente conectado');

  // Envía datos de prueba cada 2 segundos
  setInterval(() => {
    socket.emit('nuevo-dato', {
      temperatura: Math.random() * 100,
      humedad: Math.random() * 100,
      peso: Math.random() * 100,
      dendometro: Math.random() * 100,
      ph: Math.random() * 100
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
