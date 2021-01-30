const mongoose = require('mongoose');

const TodoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },

    description: String,

    category: {
        type: String, 
        enum: ['WORK', 'SCHOOL', 'FAM-FRIENDS', 'SELF-CARE']
    }, 

    completed: {
        type: Boolean,
        required: true
    }
});

module.exports = mongoose.model('Todo', TodoSchema);