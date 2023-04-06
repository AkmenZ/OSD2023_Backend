//imports
const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    recipeId: String,
    commentAuthorId: String,
    commentAuthorName: String,
    commentContent: String
});

//exports
const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;