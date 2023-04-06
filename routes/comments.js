const Comment = require("../models/comments");
const express = require("express");
const router = new express.Router();

router.post("/", async (req, res) => {
  const { recipeId, commentAuthorId, commentAuthorName, commentContent } =
    req.body;

  try {
    let newComment = new Comment({
      recipeId,
      commentAuthorId,
      commentAuthorName,
      commentContent,
    });

    newComment = await newComment.save();

    res
      .status(201)
      .json({ message: "Comment added successfully", comment: newComment });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

//get comments
router.get("/", async (req, res) => {
  try {
    const recipeId = req.query.recipeId;

    let comments;
    if (recipeId) {
      // Filter comments by recipeId if it's provided in the query string
      comments = await Comment.find({ recipeId: recipeId });
    } else {
      // Return all comments if no recipeId is provided
      comments = await Comment.find();
    }

    if (comments.length === 0) {
      return res.status(404).json({ message: "Comments not found" });
    }

    res.json(comments);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
