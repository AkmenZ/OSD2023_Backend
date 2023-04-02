//imports
const Recipe = require('../models/recipes');
const express = require('express');
const router = new express.Router();
const multer = require('multer');
const storage = multer.diskStorage({});
const upload = multer({ storage: storage });
const cloudinary = require('cloudinary');

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_KEY, 
    api_secret: process.env.CLOUD_SECRET 
});

//routes
//get all recipes
router.get('/', async(req, res) => {
    try {
    const diet = req.query.diet;
    const flagged = req.query.isFlagged;
    let recipes;
    if(diet) {
        //get recipes by diet type for filtering
        recipes = await Recipe.find({diet: diet});
    } else if(flagged) {
        //get recipes that are flagged for admin
        recipes = await Recipe.find({isFlagged: flagged});
    } else {
        recipes = await Recipe.find();
    }
    if(recipes.length === 0){
        return res.status(400).send("Recipes not found!")
    }
    res.send(recipes);
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal server error");
    }
});

//get recipe by id
router.get('/:id', async(req, res) => {
    try {
        const recipe = await Recipe.findById(req.params.id);
    
        if(!recipe) {
            return res.status(400).send("Invalid recipe id!");
        }
        res.send(recipe);
    } catch (error) {
        return res.status(500).json({
            error: error,
            message: "Error during recipe retrieval!"
        });
    }
});

//add a new recipe
router.post('/', upload.single('image'), async(req, res) => {

    if (!req.file) {
        return res.status(400).send({ error: {
            message: 'File not uploaded!',
            field: 'image'
        }
        });
    }

    try {
      //upload and return image to cloudinary
    const result = await cloudinary.v2.uploader.upload(req.file.path, { resource_type: "image" });
    const imageUrl = result.secure_url;
    const imageId = result.public_id;

    let recipe = new Recipe({
        title: req.body.title,
        authorId: req.body.authorId,
        authorName: req.body.authorName,
        image: imageUrl,
        imageId: imageId,
        diet: req.body.diet,
        ingredients: req.body.ingredients,
        instructions: req.body.instructions,
        cookTime: req.body.cookTime,
        likes: 0,
        rating: 0,
        isFlagged: false
    });

    recipe = await recipe.save();
    console.log(imageUrl);
    res.status(201).send("Recipe added successfully!");

    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

//edit recipe
router.put('/:id', async(req, res) => {
    const recipe = await Recipe.findByIdAndUpdate(req.params.id, {
        title: req.body.title,
        image: req.body.imageUrl,
        diet: req.body.diet,
        ingredients: req.body.ingredients,
        instructions: req.body.instructions,
        cookTime: req.body.cookTime,
        isFlagged: req.body.isFlagged
    },{new: true});
    if(!recipe) {
        return res.status(400).send("Invalid recipe id!");
    }
    res.send(recipe);
});

//delete recipe
router.delete('/:id', async(req, res) => {
    
    const recipe = await Recipe.findByIdAndRemove(req.params.id)
    .then((recipe => {
        if(recipe) {
            //delete image from cloudinary
            const imageId = cloudinary.v2.uploader.destroy(recipe.imageId, function (error, result) {
            console.log(result, error)
            })
            return res.status(200).send("Recipe deleted successfully!")
        }
        else {
            return res.status(400).send("Invalid recipe id!");
        }
    }))
    .catch((error => {
        return res.status(500).json({
            error: error,
            message: "Error during recipe deletion!"
        })
    }))
});

//exports
module.exports = router;
