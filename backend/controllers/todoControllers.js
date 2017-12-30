const mongoose = require('mongoose');
const TodoModel = mongoose.model('Todo');

module.exports = {
    // Get all
    getAll: (req, res) => {
        TodoModel.find({}, (err, docs) => {
            if(err) { return console.error(err); }
            res.json(docs);
        });
    },

    // Count all
    count: (req, res) => {
        TodoModel.count((err, count) => {
            if(err) { return console.error(err); }
            res.json(count);
        });
    },

    // Get by id
    get: (req, res) => {
        TodoModel.findOne({ id: req.params.id }, (err, obj) => {
            if(err) { return console.error(err); }
            res.json(obj);
        });
    },

    // Insert
    insert: (req, res) => { console.log(req.body);
        var todoContent = req.body.content;
        TodoModel.create({ content: todoContent }, (err, item) => {
            if(err) { return console.log(err); }
            res.status(200).json(item);
        });
    },

    // Update by id
    update: (req, res) => {
        TodoModel.findOneAndUpdate({ _id: req.params.id }, { content: req.body }, (err) => {
            if(err) { return console.log(err); }
            res.sendStatus(200);
        });
    },
    // Delete by id
    delete: (req, res) => {
        TodoModel.findOneAndRemove({ _id: req.params.id }, { content: req.body }, (err) => {
            if(err) { return console.error(err); }
            res.sendStatus(200);
        });
    }
}