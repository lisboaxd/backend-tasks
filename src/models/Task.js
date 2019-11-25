/**
 * Tasks model
 */
const mongoose = require('mongoose');

// Create the fillables using the mongoose schema
const TaskSchema = new mongoose.Schema({
    date: String,
    title: String,
    description: String,
    archived: Boolean,
    tags: [String],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
});

// Exports the model
module.exports = mongoose.model('Task', TaskSchema);