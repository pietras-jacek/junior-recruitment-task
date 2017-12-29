const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//todo model
const todoSchema = new Schema({
    content: String,
    completed: { type: Boolean, default: false },
    updated_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Todo', todoSchema);