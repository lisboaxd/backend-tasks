/**
 * Main router file of the application 
 */
const express = require('express');

// Import Controllers
const TaskController = require('./controllers/TaskController');

// Import the router
const routes = express.Router();

/**
 * Tasks routes
 */
routes.get('/tasks', TaksController.index);
routes.post('/tasks', TaksController.store);
routes.post('/tasks/:task_id', TaksController.update);

// Exports the routes
module.exports = routes;