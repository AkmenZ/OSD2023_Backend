//imports
const mongoose = require('mongoose');

//schemas
const ingredientSchema = new mongoose.Schema({
    name: String,
    amount: String
})

const likeSchema = new mongoose.Schema({
    likeAuthorId: String
})

const commentSchema = new mongoose.Schema({
    commentAuthorId: String,
    commentAuthorName: String,
    commentContent: String
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
    comments: [commentSchema],
    isFlagged: Boolean
})

//exports
const Recipe = mongoose.model('Recipe', recipesSchema);

module.exports = Recipe;