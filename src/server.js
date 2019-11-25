/**
 * Main settings file of the application 
 */
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

// Socket io constants
const socketio = require('socket.io');
const http = require('http');

// Import the app routes
const routes = require('./routes');

// Create a instance of express
const app = express();

// Extracts the server from express
const server = http.Server(app);

// Listen the websocket
const io = socketio(server);

// Connect in the database
mongoose.connect('mongodb+srv://stack@stack-vieis.mongodb.net?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Start the variable to save the connected users
const connectedUsers = {};

// Send the user id
io.on('connection', socket => {
    const { user_id } = socket.handshake.query;

    connectedUsers[user_id] = socket.id;
});

// Middleware for socket works
app.use((req, res, next) => {
    req.io =  io;
    req.connectedUsers = connectedUsers;

    return next();
});

// Use the cors
app.use(cors());

// Use JSON method of return
app.use(express.json());

// Use the static files
app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads')));

// Use the router
app.use(routes);

// Create a listening instance to use the port
server.listen(3333);