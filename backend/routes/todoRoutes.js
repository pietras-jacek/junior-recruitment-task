const express = require('express');

module.exports = (app) => {
    // Register route controllers
    const todo = require('../controllers/todoControllers');
    const todoRouter = express.Router();
    
    todoRouter.get('/', todo.getAll);
    todoRouter.get('/:id', todo.get);
    todoRouter.post('/create', todo.insert);
    todoRouter.put('/edit/:id', todo.update);
    todoRouter.delete('/delete/:id', todo.delete);
    todoRouter.get('/count', todo.count);

    app.use('/todos', todoRouter);
}