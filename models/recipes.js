//imports
const mongoose = require('mongoose');
//const Comment = require('./comments');

//schemas
const ingredientSchema = new mongoose.Schema({
    name: String,
    amount: String
})

const likeSchema = new mongoose.Schema({
    likeAuthorId: String
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
    dislikes: Number,
    likedBy: {
        type: [likeSchema],
        default: []
    },
    // comments: {
    //     type: [Comment],
    //     default: []
    // },
    isFlagged: Boolean
})

//exports
const Recipe = mongoose.model('Recipe', recipesSchema);

module.exports = Recipe;