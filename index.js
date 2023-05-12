const express = require('express'); //Web app framework Module for Node.js
const winston = require('winston'); // Logging library
const tasks = require('./tasks');

// initialize a variable called app with express
const app = express();

// Set up logger using Winston
const logger = winston.createLogger({
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: 'logs.log'})
    ]
});

// Middleware for parsing JSON data
app.use(express.json());

// Tasks api route
app.use('/api/tasks', tasks(logger));

// checking the environtment port number if it's available otherwise the server listens to port 5000
const PORT = process.env.PORT || 4000;

// Start the server
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
  });