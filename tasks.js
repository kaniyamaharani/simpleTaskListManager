const express = require('express');
const router = express.Router(); // Express.js function that returns an instance of a router object
const moment = require('moment'); // JS library for formatting dates and time

// Array to store tasks (temporary storage, not persistent)
let tasks = [];
let taskIdCounter = 1;

module.exports = function (logger) {
  // Middleware for logging
  router.use((req, res, next) => {
    logger.info(`Request received: ${req.method} ${req.originalUrl}`);
    next();
  });

// Route to create a new task
router.post('/', (req, res) => {
  const newTask = {
    id: taskIdCounter++, //generate and assign a unique task ID 
    title: req.body.title, 
    dueDate: req.body.dueDate 
  };
  tasks.push(newTask);
  // logger.info(`New task created - ID: ${newTask.id}, Title: ${newTask.title}`);
  logger.info(`New task created - ID: ${newTask.id}, Title: ${newTask.title}`);
  res.status(201).json(newTask);
});

// Route to update an existing task
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { title, dueDate } = req.body;
  const task = tasks.find((task) => task.id === parseInt(id));
  if (task) {
    task.title = title || task.title;
    task.dueDate = dueDate || task.dueDate;
    logger.info(`Task updated: ${task.title}`);
    res.json(task);
  } else {
    res.status(404).json({ error: 'Task not found' });
  }
});

// Route to delete a task
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const taskIndex = tasks.findIndex((task) => task.id === parseInt(req.params.id));
  if (taskIndex !== -1) {
    const deletedTask = tasks.splice(taskIndex, 1)[0];
    logger.info(`Task deleted: ${deletedTask.title}`);
    res.json(deletedTask);
  } else {
    res.status(404).json({ error: 'Task not found' });
  }
});

// Route to retrieve all tasks
router.get('/', (req, res) => {
  const tasksToRetrieve = tasks.map(task =>{
    return {
      id: task.id,
      title: task.title,
      dueDate: task.dueDate
    };
  })
  res.json(tasksToRetrieve);
});

// Route to retrieve tasks expiring today
router.get('/expiring-today', (req, res) => {
  const today = moment().format('DD/MM/YYYY');
  const expiringTodayTasks = tasks.filter((task) => task.dueDate === today);
  res.json(expiringTodayTasks);
});

// Route to mark a task as done
router.patch('/:id/done', (req, res) => {
  const { id } = req.params;

  // Find the task by its ID and mark it as done
  const task = tasks.find(task => task.id === parseInt(req.params.id));
  if (!task) {
    return res.status(404).json({ error: 'Task not found' });
  }
  
  task.done = true;
  
  // Log the task operation
  logger.info(`Task marked as done: ${task.title}`);
  
  res.json(task);
});
 return router;
};