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
    const diet = req.query.diet;
    let recipes;
    if(diet) {
        recipes = await Recipe.find({diet: diet});
    } else {
        recipes = await Recipe.find();
    }
    if(recipes.length === 0){
        res.status(400).send("Recipes not found!")
    }
    res.send(recipes);
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
        return res.status(400).send({ error: error.message });
    }

    try {
      //upload and return image to cloudinary
    const result = await cloudinary.v2.uploader.upload(req.file.path, { resource_type: "image" });
    const imageUrl = result.secure_url;
    const imageId = result.public_id;

    let recipe = new Recipe({
        title: req.body.title,
        image: imageUrl,
        imageId: imageId,
        diet: req.body.diet,
        ingredients: req.body.ingredients,
        instructions: req.body.instructions,
        cookTime: req.body.cookTime,
        likes: req.body.likes,
        rating: req.body.rating
    });

    recipe = await recipe.save()
    .then(() => {
        console.log(imageUrl);
        res.status(201).send("Recipe added successfully!")
    })
    .catch((error) => {
        res.status(500).json({
            error:error,
            message:"Failed to add recipe!"
        })
    });
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
        cookTime: req.body.cookTime
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
