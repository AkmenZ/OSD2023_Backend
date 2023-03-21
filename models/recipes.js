//imports
const mongoose = require('mongoose');

//schemas
const ingredientSchema = new mongoose.Schema({
    name: String,
    amount: String
})

const recipesSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    authorId: {
        type: String,
        required: true
    },
    authorName: String,
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