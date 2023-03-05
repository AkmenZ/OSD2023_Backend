//imports
const mongoose = require('mongoose');

//schemas
const ingredientSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    amount: {
        type: String,
        required: true
    }
})

const recipesSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    image: String,
    imageId: String,
    diet: String,
    ingredients: [ingredientSchema],
    instructions: String,
    cookTime: String,
    likes: Number,
    dislikes: Number
})

//exports
const Recipe = mongoose.model('Recipe', recipesSchema);

module.exports = Recipe;