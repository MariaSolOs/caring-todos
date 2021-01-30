const mongoose = require('mongoose');

const RecipeSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },

    ingredients: String,

    steps: String
});

module.exports = mongoose.model('Recipe', RecipeSchema);