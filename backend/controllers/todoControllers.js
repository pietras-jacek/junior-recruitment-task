const mongoose = require('mongoose');
const TodoModel = mongoose.model('Todo');

module.exports = {
    // Get all
    getAll: (req, res ) => {
        Todo.find({}, (err, docs) => {
            if(err) { return console.error(err); }
            res.json(docs);
        });
    },

    // Count all
    count: (req, res) => {
        Todo.count((err, count) => {
            if(err) { return console.error(err); }
            res.json(count);
        });
    },

    // Get by id
    get: (req, res) => {
        Todo.findOne({ id: req.params.id }, (err, obj) => {
            if(err) { return console.error(err); }
            res.json(obj);
        });
    },

    // Insert
    insert: (req, res) => {
        const todoContent = req.body.content;
        todoContent.save({ content: todoContent }, (err, item) => {
            if(err) { return console.log(err); }
            res.status(200).json(item);
        });
    },

    // Update by id
    update: (req, res) => {
        todoContent.findOneAndUpdate({ _id: req.params.id }, { content: req.body.content }, (err) => {
            if(err) { return console.log(err); }
            res.sendStatus(200);
        });
    },
    // Delete by id
    delete: (req, res) => {
        todoContent.findOneAndRemove({ _id: req.params.id }, { content: req.body.content }, (err) => {
            if(err) { return console.error(err); }
            res.sendStatus(200);
        });
    }
}