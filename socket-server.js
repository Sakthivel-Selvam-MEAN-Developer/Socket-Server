const express = require('express');
const socketio = require('socket.io');
const server = require('http').createServer(express());
const port = 3400;

// Configure Socket.IO with CORS settings
const io = socketio(server, {
  cors: {
    origin: "http://localhost:4200",
    methods: ["GET", "POST"]
  }
});

// Handle connections and messages
io.on('connection', (socket) => {
  console.log('Client connected');

  // Listen for 'draw' events and broadcast them to other clients
  socket.on('draw', (data) => {
    try {
      // Validate data or perform any necessary checks
      if (!data || typeof data !== 'object') {
        throw new Error('Invalid data type');
      }

      // Broadcast the 'draw' event to other clients
      socket.broadcast.emit('draw', data);
      console.log('Draw event received :', data);
    } catch (error) {
      // Handle the error and emit an 'error' event
      console.error('I got some Error :', error);
    }
  });
});

// Start the server
server.listen(port, () => {
  console.log('Server is running on Port :', port);
});
