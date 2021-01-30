const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },

    todos: [{
        type: mongoose.Schema.Types.ObjectID,
        ref: 'Todo'
    }]
});

module.exports = mongoose.model('User', UserSchema);